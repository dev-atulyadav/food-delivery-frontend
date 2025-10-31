import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StatusCode from "../../utils/StatusCode";
// import api from "../../services/api"; // Disabled: real API client

//async thunk for registering a user
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    // Mocked response replacing network call
    // Previously: axios.post('/user/register', userData)
    try {
        await new Promise(r => setTimeout(r, 600));
        const mock = {
            token: 'mock-jwt-token',
            user: { email: userData.email, userName: userData.fullName, role: userData.role || 'ROLE_CUSTOMER' },
            message: 'Registered successfully (mock)'
        }
        return mock;
    } catch (error) {
        return rejectWithValue({ error: 'Mock register failed' })
    }
})

//async thunk for logging in a user
export const loginUser = createAsyncThunk('auth/loginuser', async (credentials, { rejectWithValue }) => {
    // Mocked response replacing network call
    // Previously: axios.post('/user/login', credentials)
    try {
        await new Promise(r => setTimeout(r, 600));
        const mock = {
            token: 'mock-jwt-token',
            user: { email: credentials.email, userName: 'Mock User', role: 'ROLE_CUSTOMER' },
            message: 'Logged in successfully (mock)'
        }
        localStorage.setItem('jwtToken', mock.token);
        return mock;
    } catch (error) {
        return rejectWithValue({ error: 'Mock login failed' })
    }
})
//async thunk for fetching user profile
export const userProfile = createAsyncThunk('auth/userProfile', async () => {
    // Mocked response replacing network call
    // Previously: api.get('/user/profile')
    await new Promise(r => setTimeout(r, 400));
    return { payload: { email: 'mock@example.com', userName: 'Mock User', role: 'ROLE_CUSTOMER', favorites: [] } }
})

//async thunk for add to favorite
export const addToFavorite = createAsyncThunk('restaurants/addToFavorite', async (restaurantId) => {
    // Mock optimistic toggle favorite
    await new Promise(r => setTimeout(r, 200));
    return { message: 'Toggled favorite (mock)', payload: { id: restaurantId } }
})

const initialState = {
    message: null,
    user: null,
    favorites: [],
    token: localStorage.getItem('jwtToken'),
    loading: false,
    error: null,
    status: StatusCode.IDEL
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('jwtToken');
        }
    },
    extraReducers: (builder) => {
        builder
            //regsiter user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.message = action.payload.message;
                state.token = action.payload.token;
                state.status = StatusCode.SUCCESS;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = StatusCode.SUCCESS;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //fetch user profile
            .addCase(userProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.payload;
                state.favorites = [...action.payload.payload.favorites]
                state.status = StatusCode.SUCCESS;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })

            //add to favorite
            .addCase(addToFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.status = StatusCode.LOADING;
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.message =  action.payload.message;

                const favorite = action.payload.payload;

                if (state.favorites.some(item => item.id === favorite.id)) {
                    // If the favorite is already in the list, remove it
                    state.favorites = state.favorites.filter(item => item.id !== favorite?.id);
                } else {
                    // If the favorite is not in the list, add it
                    state.favorites = [...state.favorites, favorite];
                }
                state.status = StatusCode.SUCCESS;
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.status = StatusCode.ERROR;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;