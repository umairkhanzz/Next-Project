"use client"
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { useAppDispatch } from '../store';
import { addTask, deleteTask, updateTask } from '../store/slices/tasksSlice';
import { logout } from '../store/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DashboardPage = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [taskTitle, setTaskTitle] = useState('');
  const [editingTask, setEditingTask] = useState<{ id: number; title: string } | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleAddTask = () => {
    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle('');
    }
  };

  const handleUpdateTask = () => {
    if (editingTask && editingTask.title.trim()) {
      dispatch(updateTask(editingTask));
      setEditingTask(null);
    }
  };

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <div className="p-4 bg-white h-[100vh]">
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl">Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="border p-2 mr-2"
          placeholder="New task"
        />
        <button onClick={handleAddTask} className="px-4 py-2 bg-green-500 text-white rounded">
          Add Task
        </button>
      </div>
      <div>
        {tasks.map(task => (
          <div key={task.id} className="flex items-center mb-2">
            <input
              type="text"
              value={editingTask?.id === task.id ? editingTask.title : task.title}
              onChange={(e) =>
                setEditingTask(editingTask?.id === task.id ? { ...editingTask, title: e.target.value } : { id: task.id, title: e.target.value })
              }
              className="border p-2 mr-2 flex-grow"
              disabled={editingTask?.id !== task.id}
            />
            {editingTask?.id === task.id ? (
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditingTask({ id: task.id, title: task.title })}
                className="px-4 py-2 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
