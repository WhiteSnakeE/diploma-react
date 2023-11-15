import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {MotherBoard} from "./types/motherboard/MotherBoard";
export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({baseUrl: `${process.env.REACT_APP_BACKEND_CUSTOMER_URL}/api`}),
    endpoints: (builder) => ({
        getCustomerById: builder.query<MotherBoard, number>({
            query: (id) => `customer/${id}`,
        }),
    }),
})

export const {useGetCustomerByIdQuery} = customerApi;