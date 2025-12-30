import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const getStoredUser = (): User | null => {
    try {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        return null;
    }
};

const initialState: AuthState = {
    user: getStoredUser(),
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token') && !!localStorage.getItem('user'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: User; token: string }>
        ) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        }
    },
});

export const { setCredentials, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
