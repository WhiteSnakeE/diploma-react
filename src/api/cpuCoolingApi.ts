import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {CpuCooling} from "./types/cooling/CpuCooling";

export const CpuCoolingApi = createApi({
    reducerPath: 'cpuCoolingApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllCpuCooling: builder.query<CpuCooling[], void>({
            query: (id) => `/cpu-cooling`,
        }),
    }),
})

export const {useGetAllCpuCoolingQuery} = CpuCoolingApi;