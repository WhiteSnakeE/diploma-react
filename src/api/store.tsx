import {configureStore} from '@reduxjs/toolkit'
import {useDispatch} from "react-redux";
import {ProcessorsApi} from "./proccessorsApi";
import {MotherboardApi} from "./motherboardApi";
import {RamApi} from "./ramApi";
import {configurationCompatibilitySlice} from "./slices/componentsSlice";
import {VideocardApi} from "./videocardApi";
import {SsdApi} from "./SsdApi";

export const store = configureStore({
    reducer: {
        [ProcessorsApi.reducerPath]: ProcessorsApi.reducer,
        [MotherboardApi.reducerPath]: MotherboardApi.reducer,
        [RamApi.reducerPath]: RamApi.reducer,
        [VideocardApi.reducerPath]: VideocardApi.reducer,
        [SsdApi.reducerPath]: SsdApi.reducer,
        [configurationCompatibilitySlice.name]: configurationCompatibilitySlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(ProcessorsApi.middleware)
            .concat(MotherboardApi.middleware)
            .concat(RamApi.middleware)
            .concat(VideocardApi.middleware)
            .concat(SsdApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch