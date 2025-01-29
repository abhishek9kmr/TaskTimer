import { createSlice } from '@reduxjs/toolkit';

const addTaskSlice = createSlice({
  name: 'task',
  initialState: { value: [] },
  reducers: {
    addTask: (state,action) => {
        state.value=[...state.value,action.payload]
    }
  },
});

export const { addTask } = addTaskSlice.actions;
export default addTaskSlice.reducer;
