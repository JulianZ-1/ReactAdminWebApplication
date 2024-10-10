import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface TabInterface {
    isCollapse: boolean;
}

// Initial state with properly typed tabList
const initialState: TabInterface = {
    isCollapse: false,
};

export const tabSlice = createSlice({
    name: 'tab',
    initialState,
    reducers: {
        setIsCollapse: (state) => {
            state.isCollapse = !state.isCollapse;
        },
    },
});

export default tabSlice.reducer;
export const { setIsCollapse } = tabSlice.actions;