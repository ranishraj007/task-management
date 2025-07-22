// src/components/task/TaskCard.tsx
import React from 'react';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/slices/taskSlice';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided) => (
        <div
          className="bg-gray-100 p-3 mb-2 rounded shadow cursor-move"
          {... provided.draggableProps}
          {... provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => dispatch(openModal({ mode: 'edit', task }))}
        >
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
        </div>
      )}
    </Draggable>
 );
};

export default TaskCard;