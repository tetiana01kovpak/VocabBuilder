import { createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthHeader, clearAuthHeader, getErrorMessage } from '@/lib/api';
import type { AuthResponse } from '@/lib/types';
import type { RootState } from '../store';

interface Credentials {
  name?: string;
  email: string;
  password: string;
}

export const register = createAsyncThunk<AuthResponse, Credentials>(
  'auth/register',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>('/users/signup', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logIn = createAsyncThunk<AuthResponse, Credentials>(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post<AuthResponse>('/users/signin', body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logOut = createAsyncThunk<void, void>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await api.post('/users/signout');
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const refreshUser = createAsyncThunk<AuthResponse, void>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const token = (thunkAPI.getState() as RootState).auth.token;
    if (!token) return thunkAPI.rejectWithValue('No token');
    try {
      setAuthHeader(token);
      const { data } = await api.get<AuthResponse>('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);
