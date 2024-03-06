import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Motherboard} from "../types/motherboard/Motherboard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";
import {Videocard} from "../types/videocard/Videocard";
import {Ssd} from "../types/ssd/Ssd";
import {Hdd} from "../types/hdd/Hdd";


export const updateConfiguration = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, {
    dispatch: AppDispatch
}>(
    'check/configuration',
    async (configuration, {dispatch}) => {
        try {
            const response = await axios.post<ComputerConfiguration>(
                `${process.env.REACT_APP_BACKEND}/check/compatibility`,
                configuration
            );
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error while checking configuration:', error);
            throw error;
        }
    }
);

interface ComputerConfiguration {
    motherboard: Motherboard | null;
    processor: Processor | null;
    ram: Ram | null;
    videocard: Videocard | null;
    ssd: (Ssd | null) [];
    hdd: (Hdd | null) [];
    advices: string[] | null;
}

const initialState: ComputerConfiguration = {
    motherboard: null,
    processor: null,
    ram: null,
    videocard: null,
    ssd: [],
    hdd: [],
    advices: null
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
        setVideocard: (state, action: PayloadAction<Videocard>) => {
            state.videocard = action.payload;
            return state;
        },
        setSsd: (state, action: PayloadAction<(Ssd | null)[]>) => {
            state.ssd = action.payload;
            return state;
        },
        setHdd: (state, action: PayloadAction<(Hdd | null)[]>) => {
            state.hdd = action.payload;
            return state;
        },
        setAdvices: (state, action) => {
            state.advices = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateConfiguration.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
            const data = action.payload;
            state.motherboard = data.motherboard;
            state.processor = data.processor;
            state.ram = data.ram;
            state.videocard = data.videocard;
            state.ssd = data.ssd;
            state.hdd = data.hdd;
            state.advices = data.advices;
        });
    },
});