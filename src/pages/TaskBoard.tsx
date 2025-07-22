// src/pages/TaskBoard.tsx
import React, { lazy, Suspense } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskStatus } from '../redux/slices/taskSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { RootState } from '../redux/store';
import { STATUSES } from '../utils/constants';

const TaskList = lazy(() => import('../components/task/TaskList'));

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      dispatch(
        updateTaskStatus({
          taskId: draggableId,
          newStatus: destination.droppableId,
        })
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Task Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUSES.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="bg-white p-4 rounded shadow"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h3 className="text-lg font-semibold mb-2">{status}</h3>
                  <Suspense fallback={<LoadingSpinner />}>
                    <TaskList tasks={tasks.filter((task) => task.status === status)} />
                  </Suspense>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;