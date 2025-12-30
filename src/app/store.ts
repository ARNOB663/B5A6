import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../features/auth/authApi'
import { ridesApi } from '../features/rides/ridesApi'
import { driverApi } from '../features/driver/driverApi'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [ridesApi.reducerPath]: ridesApi.reducer,
        [driverApi.reducerPath]: driverApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            ridesApi.middleware,
            driverApi.middleware
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
