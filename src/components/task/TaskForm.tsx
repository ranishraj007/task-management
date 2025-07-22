// src/components/task/TaskForm.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { addTask, updateTask, closeModal } from '../../';
import Input from '../common/Input';
import Button from '../common/Button';
import { type Task } from '../../types';
import { STATUSES } from '../../utils/constants';
import { addTask, closeModal, updateTaskStatus } from '../../redux/slices/taskSlice';

interface TaskFormProps {
  task: Task | null;
  mode: 'add' | 'edit';
}

const TaskForm: React.FC<TaskFormProps> = ({ task, mode }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Task>(
    task || { id: '', title: '', description: '', status: STATUSES[0], dueDate: '' }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'add') {
      dispatch(addTask({ ...formData, id: Date.now().toString() }));
    } else {
      dispatch(updateTaskStatus(formData));
    }
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Task Title"
        className="mb-4"
        required
      />
      <Input
        type="text"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description"
        className="mb-4"
      />
      <select
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      >
        {STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <Input
        type="date"
        value={formData.dueDate}
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        className="mb-4"
      />
      <Button type="submit" className="bg-blue-500 hover:bg-blue-600 w-full">
        {mode === 'add' ? 'Add Task' : 'Update Task'}
      </Button>
    </form>
  );
};

export default TaskForm;