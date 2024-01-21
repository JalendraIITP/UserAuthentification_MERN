import { configureStore, createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { isLoggedIn: false },
    initialStatebg: { isBlur: false },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        },
        blur(state) {
            state.isBlur = true
        },
        nblur(state) {
            state.isBlur = false
        }
    }
});
export const authActions = authSlice.actions;
export const store = configureStore({
    reducer: authSlice.reducer
})