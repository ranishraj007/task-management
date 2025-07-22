// src/pages/Dashboard.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/taskSlice';
import Button from '../components/common/Button';
import { type RootState } from '../redux/store';
import { STATUSES } from '../utils/constants';


const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const taskCounts = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Button
          onClick={() => dispatch(openModal({ mode: 'add', task: null }))}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add Task
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map((status) => (
          <div key={status} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{status}</h3>
            <p className="text-2xl">{taskCounts[status] || 0} Tasks</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;