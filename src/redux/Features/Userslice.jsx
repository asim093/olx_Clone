import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    isLogin: false,
    name : "",
};

const Userslice = createSlice({
    name: "UserLogin",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.data = action.payload;
            state.isLogin = true;
        },

        addUsername : (state , action) => {
            state.name = action.payload; 
        },

        removeUser: (state) => {
            state.data = {};
            state.isLogin = false;  
        },
    },
});

export default Userslice.reducer;
export const { addUser, removeUser , addUsername } = Userslice.actions;
