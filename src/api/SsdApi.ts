import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Ssd} from "./types/ssd/Ssd";
export const SsdApi = createApi({
    reducerPath: 'ssdApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllSsd: builder.query<Ssd[], void>({
            query: (id) => `/ssd`,
        }),
    }),
})

export const {useGetAllSsdQuery} = SsdApi;