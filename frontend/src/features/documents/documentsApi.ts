/* src/features/documents/documentsApi.ts */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Document } from "../../schemas/documentSchema";

export const documentsApi = createApi({
  reducerPath: "documentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], void>({
      query: () => "/documents",
    }),
    addDocument: builder.mutation<Document, Partial<Document>>({
      query: (body) => ({
        url: "/documents",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetDocumentsQuery, useAddDocumentMutation } = documentsApi;
