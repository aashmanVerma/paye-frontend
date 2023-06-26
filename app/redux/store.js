"use client"
import { createSlice, configureStore } from "@reduxjs/toolkit"

const state = {
    popup : false,
}
const idState = {
    id : null,
}
const paystate = {
    
}
const popupMode = createSlice({
    name : "popup",
    initialState : state,
    reducers : {
        toggle : (initialState, e)=>{
            return {...initialState, popup : e.payload}
        }
    }
})
const id = createSlice({
    name : "id",
    initialState : idState,
    reducers : {
        save : (initialState, e)=>{
            return {...initialState, id:e.payload}
        }
    }
})
export const {toggle} = popupMode.actions;
export const {save} = id.actions;
const store = configureStore({
    reducer : {
        popupMode : popupMode.reducer,
        id : id.reducer
    }
})
export default store;
