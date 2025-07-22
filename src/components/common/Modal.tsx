// src/components/common/Modal.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../../redux/store';
import TaskForm from '../task/TaskForm';
import { closeModal } from '../../redux/slices/taskSlice';

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, mode, task } = useSelector((state: RootState) => state.tasks.modal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === 'add' ? 'Add Task' : 'Edit Task'}
        </h2>
        <TaskForm task={task} mode={mode} />
        <button
          onClick={() => dispatch(closeModal())}
          className="mt-4 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
