import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '@/app/store/slices/authSlice';
import tasksReducer from '@/app/store/slices/tasksSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
