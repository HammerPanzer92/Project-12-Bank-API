import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    firstname: '',
    lastname: '',
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        changeName: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
        },
    },
});

export const { changeName } = userSlice.actions;

export default userSlice.reducer;