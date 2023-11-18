import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Ram} from "./types/ram/Ram";
export const RamApi = createApi({
    reducerPath: 'ramApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllRams: builder.query<Ram[], void>({
            query: (id) => `/rams`,
        }),
    }),
})

export const {useGetAllRamsQuery} = RamApi;