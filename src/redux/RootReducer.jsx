import { combineReducers } from "@reduxjs/toolkit";
import  userReducer  from "./Features/Userslice.jsx";

const rootreducer = combineReducers({
    user : userReducer ,
})

export default rootreducer;