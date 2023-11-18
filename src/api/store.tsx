import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {ProcessorsApi} from "./proccessorsApi";
import {MotherboardApi} from "./motherboardApi";
import {RamApi} from "./ramApi";

export const store = configureStore({
    reducer: {
        [ProcessorsApi.reducerPath]: ProcessorsApi.reducer,
        [MotherboardApi.reducerPath]: MotherboardApi.reducer,
        [RamApi.reducerPath]: RamApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ProcessorsApi.middleware).concat(MotherboardApi.middleware).concat(RamApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch