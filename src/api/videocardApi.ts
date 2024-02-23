import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Videocard} from "./types/videocard/Videocard";

export const VideocardApi = createApi({
    reducerPath: 'videocardApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllVideocards: builder.query<Videocard[], void>({
            query: (id) => `/videocards`,
        }),
    }),
})

export const {useGetAllVideocardsQuery} = VideocardApi;