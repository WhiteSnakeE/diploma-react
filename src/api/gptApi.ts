import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {FrameApi} from "./frameApi";

interface ServerResponse {
    message: string;
}

export const GptApi = createApi({
    reducerPath: 'gptApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    endpoints: (builder) => ({
        callGpt: builder.query<ServerResponse, void>({
            query: () => 'api/call/gpt-3',
        }),
    }),
});

export const {useCallGptQuery} = GptApi;