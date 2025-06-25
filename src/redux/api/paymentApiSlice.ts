import { PAYMENT_URL } from "../redux-constants";
import { apiSlice } from "./apiSlice";

export interface IPaymentSecret {
  clientSecret: string;
}

export interface IPaymentObject {
  _id: string;
  user: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payment: builder.mutation<IPaymentSecret, number>({
      query: (amount) => ({
        url: `${PAYMENT_URL}/create-payment-intent`,
        method: "POST",
        body: {
          amount: amount,
        },
      }),
    }),
    savePayment: builder.mutation<{ message: string }, number>({
      query: (amount) => ({
        url: `${PAYMENT_URL}/save-payment`,
        method: "POST",
        body: {
          amount: amount,
        },
      }),
      invalidatesTags: ["Donations"],
    }),
    getAllPayments: builder.query<IPaymentObject[], void>({
      query: () => ({
        url: `${PAYMENT_URL}/all`,
      }),
      providesTags: ["Donations"],
    }),
  }),
});

export const {
  usePaymentMutation,
  useSavePaymentMutation,
  useGetAllPaymentsQuery,
} = paymentApiSlice;
