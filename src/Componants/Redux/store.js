import { configureStore } from "@reduxjs/toolkit";  
import jobReducer from "./jobSlice"   


const store = configureStore({
    reducer:{
        jobs:jobReducer
    }
});

export default store;  