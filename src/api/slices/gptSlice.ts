import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import axios from "axios";

interface ServerResponse {
    message: string;
}

export const gptCall = createAsyncThunk<ServerResponse, string, {
    dispatch: AppDispatch;
}>("call/gpt-3", async (prompt, { dispatch }) => {
    console.log(prompt);
    try {
        const response = await axios.post<ServerResponse>(
            `http://localhost:5000/api/call/gpt-3`,
            { prompt }
        );
        console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error while checking configuration:", error);
        throw error;
    }
});

const initialState: ServerResponse = {
    message: "",
};

export const gptCallSlice = createSlice({
    name: "gptCall",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(gptCall.fulfilled, (state, action: PayloadAction<ServerResponse>) => {
            state.message = action.payload.message;
        });
    },
});