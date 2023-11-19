import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MotherBoard} from "../types/motherboard/MotherBoard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";
import {MotherBoardStatus} from "../status/MotherBoardStatus";
import {ProcessorStatus} from "../status/ProcessorStatus";
import {RamStatus} from "../status/RamStatus";


export const chooseMotherboard  = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, {dispatch: AppDispatch}>(
    'check/motherboards',
        async (computerConfiguration, {dispatch}) =>{
        try {

        const response = await axios.post<ComputerConfiguration>(
                    `${process.env.REACT_APP_BACKEND}/check/motherboards`,
                        computerConfiguration
        );
            return response.data;
        } catch (error) {
            console.error('Error while checking motherboards:', error);
            throw error; // Пробрасываем ошибку дальше
        }
        }
);

export const chooseProcessor  = createAsyncThunk<ComputerConfiguration, Processor, {dispatch: AppDispatch}>(
    'check/processors',
    async (processor, {dispatch}) =>{
        try {

            const response = await axios.post<ComputerConfiguration>(
                `${process.env.REACT_APP_BACKEND}/check/processors`,
                processor
            );
            return response.data;
        } catch (error) {
            console.error('Error while checking processors:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
);

export const chooseRam  = createAsyncThunk<ComputerConfiguration, Ram, {dispatch: AppDispatch}>(
    'check/rams',
    async (ram, {dispatch}) =>{
        try {

            const response = await axios.post<ComputerConfiguration>(
                `${process.env.REACT_APP_BACKEND}/check/rams`,
                ram
            );
            return response.data;
        } catch (error) {
            console.error('Error while checking rams:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
);

interface ComputerConfiguration{
    motherboardStatus: MotherBoardStatus | null ;
    processorStatus: ProcessorStatus |  null;
    ramStatus: RamStatus | null;
}
const initialState: ComputerConfiguration = {
    motherboardStatus: null,
    processorStatus: null,
    ramStatus: null,
};

export const motherBoardCompatibilitySlice = createSlice({
    name: 'motherBoardCompatibility',
    initialState,
    reducers: {
        addMotherboardStatus: (state, action: PayloadAction<MotherBoardStatus>) => {
            return { ...state, motherboardStatus: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(chooseMotherboard.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.motherboardStatus = data.motherboardStatus;
        })
            .addCase(chooseProcessor.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.processorStatus = data.processorStatus;
            })
            .addCase(chooseRam.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.ramStatus = data.ramStatus;
            });
    },
});