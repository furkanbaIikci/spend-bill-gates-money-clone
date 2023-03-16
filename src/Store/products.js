import { createSlice } from "@reduxjs/toolkit";
import  items  from "./items";

const initialState = {
    items: items
    
};

const cartSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        buyItem(state, action) {
            const item = state.items.find((item) => item.id === action.payload);
            item.qtd++;
        },
        removeItem(state, action) {
            const item = state.items.find((item) => item.id === action.payload);
            item.qtd--;
        },
        buyWithInput(state, action) {
            const item = state.items.find((item) => item.id === action.payload.id);
            item.qtd = action.payload.count;
        }
        
    }
});

export const {buyItem, removeItem, buyWithInput} = cartSlice.actions;
export default cartSlice.reducer;






