import { createSlice } from '@reduxjs/toolkit';

const addTaskSlice = createSlice({
  name: 'task',
  initialState: { value: [] },
  reducers: {
    addTask: (state,action) => {
        state.value=[...state.value,action.payload]
    },
    changeRunning:(state, action)=> {
      state.value=action.payload
    },
    decrementTime: (state, action) => {
      state.value = state.value.map(task =>
        task.name === action.payload && task.running && task.timeLeft > 0
          ? { ...task, timeLeft: task.timeLeft - 1 }
          : task
      );
    },
    reset:(state, action)=> {
      state.value=action.payload
    },
  },
});

export const { addTask, changeRunning, decrementTime, reset } = addTaskSlice.actions;
export default addTaskSlice.reducer;
