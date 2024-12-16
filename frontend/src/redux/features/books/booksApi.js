import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),
    getBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id: id }],
    }),
    addBook: builder.mutation({
      query: (newBook) => ({
        url: `/create-book`,
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: (id, ...rest) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
export default booksApi;