import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsernameProps{
  username:string,
  password:string,
}

export const loginByUsername = createAsyncThunk<User, LoginByUsernameProps, {rejectValue:string}>(
    'login/fetchByIdStatus',
    async ({ username, password }, thunkAPI) => {
        try {
            const responce = await axios.post<User>('http://localhost:8000/login', {
                username, password,
            });
            if (!responce.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(responce.data));
            thunkAPI.dispatch(userActions.setAuthData(responce.data));

            return responce.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue('Вы ввели неверный логин или пароль');
        }
    },
);
