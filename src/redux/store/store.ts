import { homePageApis } from '@/redux/services/homePageApis'
import  { configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../services/auth/authApi'
import authSlice from '../services/auth/authSlice'
export const store = configureStore({
    reducer: {
        [homePageApis.reducerPath]: homePageApis.reducer,
       
        [authApi.reducerPath]: authApi.reducer,
        auth: authSlice.reducer 
    },

    middleware: (GetDefaultMiddleware) => 
        GetDefaultMiddleware().concat(homePageApis.middleware,authApi.middleware)
    
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;