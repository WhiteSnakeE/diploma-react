import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Motherboard} from "../types/motherboard/Motherboard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";


export const chooseMotherboard = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, {
    dispatch: AppDispatch
}>(
    'check/motherboards',
    async (motherboard, {dispatch}) => {
        try {
            const response = await axios.post<ComputerConfiguration>(
                `${process.env.REACT_APP_BACKEND}/check/motherboards`,
                motherboard
            );
            return response.data;
        } catch (error) {
            console.error('Error while checking motherboards:', error);
            throw error; // Пробрасываем ошибку дальше
        }
    }
);

export const chooseProcessor = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, {
    dispatch: AppDispatch
}>(
    'check/processors',
    async (processor, {dispatch}) => {
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

export const chooseRam = createAsyncThunk<ComputerConfiguration, ComputerConfiguration, { dispatch: AppDispatch }>(
    'check/rams',
    async (ram, {dispatch}) => {
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

export const motherBoardCompatibilitySlice = createSlice({
    name: 'motherBoardCompatibility',
    initialState,
    reducers: {
        addMotherboardStatus: (state, action: PayloadAction<Motherboard>) => {
            // Обновляем информацию о материнской плате в состоянии
            state.motherboard = action.payload;
            return state; // Возвращаем обновленное состояние
        },
        addProcessorStatus: (state, action: PayloadAction<Processor>) => {
            // Обновляем информацию о материнской плате в состоянии
            state.processor = action.payload;
            return state; // Возвращаем обновленное состояние
        },
        addRamStatus: (state, action: PayloadAction<Ram>) => {
            // Обновляем информацию о материнской плате в состоянии
            state.ram = action.payload;
            return state; // Возвращаем обновленное состояние
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