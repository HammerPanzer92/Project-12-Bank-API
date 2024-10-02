import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, login } from "../services/api";

const initialState = {
  firstname: "",
  lastname: "",
  auth: "",
};

//Création du Thunk pour la récupération du profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (token, thunkAPI) => {
    try {
      const response = await getProfile(token);
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

//Création du Thunk (asynchrone) pour le login
export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (userData, thunkAPI) => {
    try {
      const response = await login(userData);
      if (response.status === 200) {
        await thunkAPI.dispatch(fetchUserProfile(response.body.token));
        return response;
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    changeAuth: (state, action) => {
      state.auth = action.payload.token;
    },
    cleanState: (state, action) => {
      state.firstname = initialState.firstname;
      state.lastname = initialState.lastname;
      state.auth = initialState.auth;
    },
  },
  extraReducers: (builder) => {
    builder
      //Cas pour le login
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        console.log("Response login thunk :");
        console.log(action.payload);
        state.auth = action.payload.body.token
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        console.error("Erreur lors du login");
        console.log(action.payload);
      })
      //Cas pour la récupération du profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("Thunk profil result :");
        console.log(action.payload);
        state.firstname = action.payload.body.firstName;
        state.lastname = action.payload.body.lastName;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.error("Erreur thunk profile :");
        console.log(action.payload);
      });
  },
});

export const { changeName, cleanState, changeAuth } = userSlice.actions;

export default userSlice.reducer;
