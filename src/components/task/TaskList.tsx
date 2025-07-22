// src/components/task/TaskList.tsx
import React from 'react';
import TaskCard from './TaskCard';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks</p>
      ) : (
        tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)
      )}
    </div>
  );
};

export default TaskList;