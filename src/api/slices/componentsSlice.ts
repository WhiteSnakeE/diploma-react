import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MotherBoard} from "../types/motherboard/MotherBoard";
import {AppDispatch} from "../store";
import axios from "axios";
import {Processor} from "../types/processor/Processor";
import {Ram} from "../types/ram/Ram";


export const chooseMotherboard  = createAsyncThunk<string, MotherBoard, {dispatch: AppDispatch}>(
    'check/motherboards',
        async (motherboard, {dispatch}) =>{
        try {

        const response = await axios.post<string>(
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

export const chooseProcessor  = createAsyncThunk<string, Processor, {dispatch: AppDispatch}>(
    'check/processors',
    async (processor, {dispatch}) =>{
        try {

            const response = await axios.post<string>(
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

export const chooseRam  = createAsyncThunk<string, Ram, {dispatch: AppDispatch}>(
    'check/rams',
    async (ram, {dispatch}) =>{
        try {

            const response = await axios.post<string>(
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


const initialState: string = "Everything is okay";

export const motherBoardCompatibilitySlice = createSlice({
    name: 'motherBoardCompatibility',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(chooseMotherboard.fulfilled, (state, action: PayloadAction<string>) => {
            return action.payload;
        })
            .addCase(chooseProcessor.fulfilled, (state, action: PayloadAction<string>) => {
                return action.payload;
            })
            .addCase(chooseRam.fulfilled, (state, action: PayloadAction<string>) => {
                return action.payload;
            });
    },
});