import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Hdd} from "./types/hdd/Hdd";

export const HddApi = createApi({
    reducerPath: 'hddApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllHdd: builder.query<Hdd[], void>({
            query: (id) => `/hdd`,
        }),
    }),
})

export const {useGetAllHddQuery} = HddApi;