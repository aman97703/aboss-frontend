import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const TeaGift = () => {
  return (
    <section className="flex justify-center items-center h-[calc(100vh-48px)]">
      <div className="max-w-[600px] bg-black/10 p-10 w-full rounded-2xl flex flex-col gap-4 text-black shadow-2xl border-white border">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

export default TeaGift;
