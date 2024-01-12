import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Motherboard} from "../types/motherboard/Motherboard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";


export const updateConfiguration = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, { dispatch: AppDispatch }>(
    'check/configuration',
    async (configuration, { dispatch }) => {
        try {
            const response = await axios.post<ComputerConfiguration>(
                `${process.env.REACT_APP_BACKEND}/check/compatibility`,
                configuration
            );
            return response.data;
        } catch (error) {
            console.error('Error while checking configuration:', error);
            throw error;
        }
    }
);

interface ComputerConfiguration {
    motherboard: Motherboard | null | undefined;
    processor: Processor | null | undefined;
    ram: Ram | null | undefined;
}

const initialState: ComputerConfiguration = {
    motherboard: null,
    processor: null,
    ram: null,
};

export const configurationCompatibilitySlice = createSlice({
    name: 'configurationCompatibility',
    initialState,
    reducers: {
        setMotherboard: (state, action: PayloadAction<Motherboard>) => {
            state.motherboard = action.payload;
            return state;
        },
        setProcessor: (state, action: PayloadAction<Processor>) => {
            state.processor = action.payload;
            return state;
        },
        setRam: (state, action: PayloadAction<Ram>) => {
            state.ram = action.payload;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateConfiguration.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
            // Update the state with the fulfilled action payload
            const data = action.payload;
            state.motherboard = data.motherboard;
            state.processor = data.processor;
            state.ram = data.ram;
        });
    },
});