import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {Motherboard} from "./types/motherboard/Motherboard";
export const MotherboardApi = createApi({
    reducerPath: 'motherBoardApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllMotherBoards: builder.query<Motherboard[], void>({
            query: () => `/motherboards`,
        }),
    }),
})

export const {useGetAllMotherBoardsQuery} = MotherboardApi;