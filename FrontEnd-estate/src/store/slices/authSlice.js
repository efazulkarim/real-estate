import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/supabaseClient';

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user, error } = await supabase.auth.signIn({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, firstName, lastName }, { rejectWithValue }) => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      // Optionally, you can update the user's profile with additional data
      await supabase
        .from('profiles')
        .insert([{ id: user.id, firstName, lastName }]);

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Existing signIn and signOut reducers...

    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;