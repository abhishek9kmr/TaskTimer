import { combineReducers } from 'redux';
import AddTaskSlice from './slices/addTaskSlice';

export default combineReducers({
  task: AddTaskSlice,
});
