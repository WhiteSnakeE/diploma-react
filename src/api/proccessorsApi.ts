import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Processor} from "./types/processor/Processor";
export const ProcessorsApi = createApi({
    reducerPath: 'processorApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllProcessors: builder.query<Processor[], void>({
            query: (id) => `/processors`,
        }),
    }),
})

export const {useGetAllProcessorsQuery} = ProcessorsApi;