import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MotherBoard} from "../types/motherboard/MotherBoard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";


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
    motherboard: MotherBoard | null ;
    processor: Processor|  null;
    ram: Ram | null;
}
const initialState: ComputerConfiguration = {
    motherboard: null,
    processor: null,
    ram: null,
};

export const motherBoardCompatibilitySlice = createSlice({
    name: 'motherBoardCompatibility',
    initialState,
    reducers: {
        addMotherboardStatus: (state, action: PayloadAction<MotherBoard>) => {
            return { ...state, motherboard: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(chooseMotherboard.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.motherboard = data.motherboard;
        })
            .addCase(chooseProcessor.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.processor = data.processor;
            })
            .addCase(chooseRam.fulfilled, (state, action: PayloadAction<ComputerConfiguration>) => {
                const data = action.payload;
                state.ram = data.ram;
            });
    },
});