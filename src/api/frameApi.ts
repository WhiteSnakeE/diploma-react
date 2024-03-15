import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Videocard} from "./types/videocard/Videocard";
import {Frame} from "./types/frame/Frame";

export const FrameApi = createApi({
    reducerPath: 'frameApi',
    baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BACKEND}),
    endpoints: (builder) => ({
        getAllFrames: builder.query<Frame[], void>({
            query: (id) => `/frames`,
        }),
    }),
})

export const {useGetAllFramesQuery} = FrameApi;