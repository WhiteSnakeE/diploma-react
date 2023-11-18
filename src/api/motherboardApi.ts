import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {MotherBoard} from "./types/motherboard/MotherBoard";
export const MotherboardApi = createApi({
    reducerPath: 'motherBoardApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllMotherBoards: builder.query<MotherBoard[], void>({
            query: () => `/motherboards`,
        }),
    }),
})

export const {useGetAllMotherBoardsQuery} = MotherboardApi;