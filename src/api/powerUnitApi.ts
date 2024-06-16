import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Processor} from "./types/processor/Processor";
import {PowerUnit} from "./types/powerUnit/PowerUnit";

export const PowerUnitApi = createApi({
    reducerPath: 'powerUnitApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllPowerUnits: builder.query<PowerUnit[], void>({
            query: (id) => `/powerUnits`,
        }),
    }),
})

export const {useGetAllPowerUnitsQuery} = PowerUnitApi;