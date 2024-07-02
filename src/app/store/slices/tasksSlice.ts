import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: number;
  title: string;
}

interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const newTask: Task = {
        id: Date.now(),
        title: action.payload,
      };
      state.tasks.push(newTask);
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<{ id: number; title: string }>) {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
