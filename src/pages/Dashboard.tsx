// src/pages/Dashboard.tsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../redux/slices/taskSlice";
import Button from "../components/common/Button";
import { type RootState } from "../redux/store";
import { STATUSES } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const taskCounts = STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status).length;
    return acc;
  }, {} as Record<string, number>);

  const totalTasks = tasks.length;
  const completedTasks = taskCounts["Completed"] || 0;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Button
          onClick={() => dispatch(openModal({ mode: "add", task: null }))}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Add Task
        </Button>
      </div>

      {/* Total tasks + Progress */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
        <p className="text-2xl font-bold">{totalTasks}</p>
        {totalTasks > 0 && (
          <>
            <p className="text-sm text-gray-500">
              {completedTasks} completed ({completionRate}%)
            </p>
            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </>
        )}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUSES.map((status) => (
          <div
            key={status}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer transition"
            onClick={() => navigate(`/tasks/${status.toLowerCase()}`)}
          >
            <h3 className="text-lg font-semibold">{status}</h3>
            <p className="text-2xl">{taskCounts[status] || 0} Tasks</p>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {totalTasks === 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p>No tasks yet. Start by adding a new one 🚀</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
