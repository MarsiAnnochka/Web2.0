import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchData} from '../../utils/API';

export interface Form {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
}

export interface SignUpFormState {
    login: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    isSignUp: boolean;
}

export interface Response {
    type: string;
    message: {
        token: string;
    }
}

const initialState: SignUpFormState = {
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    loading: 'idle',
    isSignUp: false
}

export const signUpUser = createAsyncThunk(
    'signup/auth',
    async (data: Form, thunkAPI) => {
        const postOptions = {
            body: JSON.stringify({
                username: data.login, password: data.password,
                first_name: data.firstName, last_name: data.lastName, email: data.email, city: data.city
            }),
            method: 'POST',
        };
        try {
            const response = await fetchData('/api/signup/', postOptions);
            if (response.ok === true) {
                console.log('Successful registration')
            } else {
                return await (response.json()) as Response;
            }
        } catch (err) {
            alert('Something went wrong.. Try it again')
            console.log("Error: ", err.message);
        }
    })

export const SignUpFormSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        enterLogin: (state, action: PayloadAction<string>) => {
            state.login = action.payload
        },
        enterPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        enterFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload
        },
        enterLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload
        },
        enterEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload
        },
        enterCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload
        },
        isSignUp: (state) => {
            state.isSignUp = true;
        }
    },
    //"builder callback API", для асинхронных операций
    extraReducers: builder => {
        builder.addCase(signUpUser.pending, (state, action) => {
            state.loading = 'pending'
        })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.login = '';
                state.password = '';
                state.firstName = '';
                state.lastName = '';
                state.email = '';
                state.city = '';
                state.isSignUp = true;
                localStorage.setItem('token', action.payload.message.token); //сохраняем в браузере ответ
            })
    }
})

export const {
    enterLogin,
    enterPassword,
    enterFirstName,
    enterLastName,
    enterEmail,
    enterCity
} = SignUpFormSlice.actions;
export default SignUpFormSlice.reducer