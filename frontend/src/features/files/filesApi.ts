// ...existing code...
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Document {
  id: string;
  filename?: string;
  filepath?: string;
  upload_time?: string;
  status?: "uploaded" | "processing" | "completed" | "failed";
}

export interface ProcessedData {
  id: number;
  document_id: string;
  row_data: Record<string, any>;
  inserted_at: string;
}

export const filesApi = createApi({
  reducerPath: 'filesApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Documents', 'ProcessedData'],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<{ id: string }, FormData>({
      query: (formData) => ({
        url: '/documents/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Documents', id: 'LIST' }],
    }),
    getDocuments: builder.query<Document[], void>({
      query: () => '/documents',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Documents' as const, id })),
              { type: 'Documents' as const, id: 'LIST' },
            ]
          : [{ type: 'Documents' as const, id: 'LIST' }],
    }),
    getDocumentStatus: builder.query<Document, string>({
      query: (id) => `/documents/status/${id}`,
      providesTags: (result, error, id) => [{ type: 'Documents' as const, id }],
    }),
    getProcessedData: builder.query<ProcessedData[], string>({
      query: (documentId) => `/documents/${documentId}/data`,
      // backend returns { document_id, data: [...] } — normalize to the data array
      transformResponse: (response: any) => {
        if (!response) return [];
        if (Array.isArray(response)) return response as ProcessedData[];
        return response.data ?? [];
      },
      providesTags: (result, error, id) => [{ type: 'ProcessedData', id }],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetDocumentsQuery,
  useGetDocumentStatusQuery,
  useGetProcessedDataQuery,
} = filesApi;
// ...existing code...