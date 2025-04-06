import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";

export const Apiwithoutheaders = createApi({
  reducerPath: "Apiwithoutheaders",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
    },
  }),

  endpoints: (builder) => ({
    Registration: builder.mutation({
      query: ({
        email,
        password,
        password_confirmation,
        first_name,
        last_name,
      }) => ({
        url: "/users",
        method: "POST",
        body: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          first_name: first_name,
          last_name: last_name,
        },
      }),
    }),
    SendOTP: builder.mutation({
      query: ({ email }) => ({
        url: "/users/confirmation",
        method: "POST",
        body: {
          email: email,
        },
      }),
    }),
    OTPverification: builder.query({
      query: ({ otp, email }) => ({
        url: `users/confirmation?confirmation_otp=${otp}&email=${email}`,
        method: "GET",
      }),
    }),
    ForgotPasswordEmail: builder.mutation({
      query: (params) => {
        return {
          url: `/users/password`,
          method: "POST",
          body: params,
        };
      },
    }),
    ForgotPasswordOTP: builder.query({
      query: ({ email, otp }) => {
        return {
          url: `users/password/edit?confirmation_otp=${otp}&email=${email}&redirect_url=""`,
          method: "GET",
        };
      },
    }),
    ForgotPasswordUpdate: builder.mutation({
      query: (params) => {
        return {
          url: `users/password`,
          method: "PATCH",
          body: params,
        };
      },
    }),
    Feedback: builder.mutation({
      query: ({ values, token }) => {
        return {
          url: `/feedbacks`,
          method: "POST",
          body: {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            description: values.description,
            job_title: values.job_title,
            recaptchaToken: token,
          },
        };
      },
    }),
    cookiesData: builder.mutation({
      query: ({ functional, guid }) => {
        const body = {
          cookie_data: {functional: functional}
        };

        if (guid) {
          body.guid = guid;
        }
        return {
          url: `/cookie/sync`,
          method: "POST",
          body: body,
        };
      },
    }),
    getShareInvoiceData: builder.query({
      query: ({ uuid }) => {
        return {
          url: `/invoices/${uuid}/share`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useRegistrationMutation,
  useSendOTPMutation,
  useLazyOTPverificationQuery,
  useForgotPasswordEmailMutation,
  useLazyForgotPasswordOTPQuery,
  useForgotPasswordUpdateMutation,
  useLazyGetShareInvoiceDataQuery,
  useFeedbackMutation,
  useCookiesDataMutation,
} = Apiwithoutheaders;
