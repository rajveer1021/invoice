import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constant";
import { getHeaderDataFromLocalStorage } from "./Utils";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const { authorization } = getHeaderDataFromLocalStorage();
      if (authorization) {
        headers.set("Authorization", authorization);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getDashboard: builder.query({
      query: () => {
        return {
          url: "/dashboard",
          method: "GET",
        };
      },
    }),
    getInvoice: builder.query({
      query: () => {
        return {
          url: "/invoices/page_data",
          method: "GET",
        };
      },
    }),
    getInvoiceForCurrentClient: builder.query({
      query: ({ invoice_id }) => {
        return {
          url: `/invoices/${invoice_id}`,
          method: "GET",
        };
      },
    }),
    getAllreports: builder.query({
      query: () => {
        return {
          url: "/reports/page_data",
          method: "GET",
        };
      },
    }),
    getClientInfo: builder.query({
      query: () => {
        return {
          url: "/clients/page_data",
          method: "GET",
        };
      },
    }),
    getClient: builder.query({
      query: () => {
        return {
          url: "/clients",
          method: "GET",
        };
      },
    }),
    createClient: builder.mutation({
      query: (params) => ({
        url: `/clients`,
        method: "POST",
        body: params,
      }),
    }),
    getClientDeatils: builder.query({
      query: ({ client_id }) => {
        return {
          url: `/clients/${client_id}`,
          method: "GET",
        };
      },
    }),
    getUserDataInvoice: builder.query({
      query: () => {
        return {
          url: `invoices/initial_data`,
          method: "GET",
        };
      },
    }),
    getInvoiceBarGrapyData: builder.query({
      query: ({ month, year }) => {
        return {
          url: `graph?month=${month}&year=${year}`,
          method: "GET",
        };
      },
    }),
    getFilteredInvoice: builder.query({
      query: ({ client_id, status }) => ({
        url: `invoices?client_id=${client_id}&status=${status}`,
        method: "GET",
      }),
    }),
    getFilteredClients: builder.query({
      query: ({ client_id }) => ({
        url: `/clients/filter_clients?client_id=${client_id}`,
        method: "GET",
      }),
    }),
    getFilteredReportofClient: builder.query({
      query: ({ client_id, invoice_id, bill_number }) => ({
        url: `/clients/${client_id}?invoice_number=${invoice_id}&bill_number=${bill_number}`,
        method: "GET",
      }),
    }),
    getPreviewInvoice: builder.query({
      query: ({ invoice_id }) => ({
        url: `/invoices/${invoice_id}`,
        method: "GET",
      }),
    }),
    getDuplicateInvoice: builder.query({
      query: ({ invoice_id }) => ({
        url: `/invoices/${invoice_id}/duplicate`,
        method: "GET",
      }),
    }),
    getFilteredAllreports: builder.query({
      query: ({ client_id, start_date, end_date, status, invoice_id }) => ({
        url: `reports?status=${status}&client_id=${client_id}&invoice_id=${invoice_id}&start_date=${start_date}&end_date=${end_date}`,
        method: "GET",
      }),
    }),
    getUserCompleteData: builder.query({
      query: () => ({
        url: `/users/show`,
        method: "GET",
      }),
    }),
    createInvoice: builder.mutation({
      query: ({ item, invoice }) => ({
        url: `/invoices`,
        method: "POST",
        body: {
          item: item,
          invoice: invoice,
        },
      }),
    }),
    updateInvoice: builder.mutation({
      query: ({ item, invoice, invoice_id }) => ({
        url: `/invoices/${invoice_id}`,
        method: "PATCH",
        body: {
          item: item,
          invoice: invoice,
        },
      }),
    }),
    ChangePassword: builder.mutation({
      query: (params) => {
        return {
          url: `/users/update_password`,
          method: "POST",
          body: params,
        };
      },
    }),
    updateUserData: builder.mutation({
      query: ({ values, userLogo }) => {
        const formData = new FormData();
        formData.append("user[first_name]", values.first_name);
        formData.append("user[last_name]", values.last_name);
        formData.append("user[email]", values.email);
        formData.append("business_info[company_name]", values.company_name);
        formData.append("business_info[website_url]", values.website_url);
        formData.append("business_info[phone_no]", values.phone_no);
        formData.append(
          "business_info[company_email_address]",
          values.company_email_address
        );
        formData.append("business_info[address]", values.address);
        formData.append("business_info[address_1]", values.address_1);
        formData.append("business_info[city]", values.city);
        formData.append("business_info[state]", values.state);
        formData.append("business_info[country]", values.country);
        if (userLogo !== null) {
          formData.append("business_info[company_logo]", userLogo);
        }
        formData.append("business_info[postal_code]", values.postal_code);
        values.customFields.map((field, index) => {
          field.id &&
            formData.append(
              `business_info[custom_fields_attributes][][id]`,
              field.id
            );
          formData.append(
            `business_info[custom_fields_attributes][][name]`,
            field.name
          );
          formData.append(
            `business_info[custom_fields_attributes][][value]`,
            field.value
          );
        });
        return {
          url: `/users/update_profile_details`,
          method: "PATCH",
          body: formData,
        };
      },
    }),
    Logout: builder.query({
      query: () => {
        return {
          url: "/users/sign_out",
          method: "DELETE",
        };
      },
    }),

    deleteInvoice: builder.query({
      query: ({ id }) => {
        return {
          url: `/invoices/${id}`,
          method: "DELETE",
        };
      },
    }),
    deleteClient: builder.query({
      query: ({ id }) => {
        return {
          url: `/clients/${id}`,
          method: "DELETE",
        };
      },
    }),
    introTourCompleted: builder.mutation({
      query: () => ({
        url: `users/intro_tour_completed`,
        method: "PATCH",
      }),
    }),
    DeleteAccount: builder.mutation({
      query: (params) => {
        return {
          url: `/users`,
          method: "DELETE",
          body: params,
        };
      },
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useLazyLogoutQuery,
  useLazyDeleteInvoiceQuery,
  useLazyDeleteClientQuery,
  useLazyGetUserDataInvoiceQuery,
  useLazyGetInvoiceQuery,
  useLazyGetDuplicateInvoiceQuery,
  useLazyGetInvoiceForCurrentClientQuery,
  useLazyGetAllreportsQuery,
  useLazyGetClientQuery,
  useLazyGetUserCompleteDataQuery,
  useLazyGetInvoiceBarGrapyDataQuery,
  useLazyGetClientInfoQuery,
  useLazyGetClientDeatilsQuery,
  useLazyGetDashboardQuery,
  useLazyGetPreviewInvoiceQuery,
  useLazyGetFilteredInvoiceQuery,
  useLazyGetFilteredClientsQuery,
  useLazyGetFilteredReportofClientQuery,
  useLazyGetFilteredAllreportsQuery,
  useCreateInvoiceMutation,
  useUpdateUserDataMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUpdateInvoiceMutation,
  useCreateClientMutation,
  useIntroTourCompletedMutation,
} = Api;
