import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BackendUrl = "http://localhost:3001/api/v1/user";

const initialState = {
  firstname: "",
  lastname: "",
};

//Création du Thunk (asynchrone) pour le login
export const fetchUserLogin = createAsyncThunk(
  "user/fetchUserLogin",
  async (userData, thunkAPI) => {
    const response = await fetch(BackendUrl + "/login",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    return data;
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
  },
  extraReducers: builder => {
    //Cas pour le login
    builder.addCase(fetchUserLogin.fulfilled, (state, action) =>{
        console.log("Response");
        console.log(action.payload);
    })
    .addCase(fetchUserLogin.rejected, (state, action) =>{
        console.error("Erreur lors du login");
        console.log(action.payload);
    })
  }
});

export const { changeName } = userSlice.actions;

export default userSlice.reducer;
