import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  usePaymentMutation,
  useSavePaymentMutation,
} from "../redux/api/paymentApiSlice";

const CheckoutForm: React.FC = () => {
  const [paymentApi] = usePaymentMutation();
  const [handleSave] = useSavePaymentMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(100);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (amount < 100) {
      alert("Please donate min 100rs");
    }
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      //   const { data } = await axios.post("/api/payment/create-payment-intent", {
      //     amount: amount,
      //   });

      const { data } = await paymentApi(amount);

      if (!data || !data.clientSecret) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        alert("Card element not found");
        setLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement as StripeCardElement,
        },
      });

      if (result.error) {
        alert("Payment failed: " + result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        await handleSave(amount);
        setAmount(100);
        alert("Payment successful!");
        setIsPaymentSuccess(true);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="text-white">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#fff",
              letterSpacing: "0.025em",
              fontFamily: "Arial, sans-serif",
              "::placeholder": {
                color: "#fff",
              },
            },
            invalid: {
              color: "#fa755a",
              iconColor: "#fa755a",
            },
          },
          hidePostalCode: true, // optional
        }}
      />
      <Input
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="100.00"
        className="mt-5"
      />
      <Button
        type="submit"
        className="mt-5 cursor-pointer"
        size="lg"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay."}
      </Button>
      {isPaymentSuccess && <p className="text-green-600">Thanks for payment</p>}
    </form>
  );
};

export default CheckoutForm;
