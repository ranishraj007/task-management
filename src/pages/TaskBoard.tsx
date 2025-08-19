import React, { lazy, Suspense, useMemo, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus, openModal } from "../redux/slices/taskSlice";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { RootState } from "../redux/store";
import { STATUSES } from "../utils/constants";
import Button from "../components/common/Button";

// Lazy import TaskList
const TaskList = lazy(() => import("../components/task/TaskList"));

type SortBy = "none" | "priority" | "dueDate";

// Define the task type (adjust fields if your slice differs)
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: "High" | "Medium" | "Low";
  dueDate?: string;
  status: string; // could be a union of STATUSES if they’re fixed
}

const TaskBoard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks as Task[]);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("none");

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

  // Filter & sort tasks
  const normalized = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = q
      ? tasks.filter((t) => {
          const hay = `${t.title ?? ""} ${t.description ?? ""}`.toLowerCase();
          return hay.includes(q);
        })
      : tasks;

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "priority") {
        const rank = (p?: string) =>
          p?.toLowerCase() === "high"
            ? 3
            : p?.toLowerCase() === "medium"
            ? 2
            : p?.toLowerCase() === "low"
            ? 1
            : 0;
        return rank(b.priority) - rank(a.priority);
      }
      if (sortBy === "dueDate") {
        const ad = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
        const bd = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
        return ad - bd; // earliest first
      }
      return 0;
    });

    return sorted;
  }, [tasks, search, sortBy]);

  // Count tasks by status
  const countByStatus = useMemo(() => {
    const map: Record<string, number> = {};
    STATUSES.forEach(
      (s) => (map[s] = normalized.filter((t) => t.status === s).length)
    );
    return map;
  }, [normalized]);

  return (
    <div className="p-4">
      {/* Header + Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Task Board</h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search tasks by title/description..."
            className="border px-3 py-2 rounded w-full sm:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search tasks"
          />

          <select
            className="border px-3 py-2 rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            aria-label="Sort tasks"
          >
            <option value="none">Sort: None</option>
            <option value="priority">Sort: Priority</option>
            <option value="dueDate">Sort: Due Date</option>
          </select>

          <Button
            onClick={() => dispatch(openModal({ mode: "add", task: null }))}
            className="bg-blue-500 hover:bg-blue-600"
          >
            + Add Task
          </Button>
        </div>
      </div>

      {/* Task Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STATUSES.map((status) => {
            const items = normalized.filter((t) => t.status === status);

            return (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="bg-white p-4 rounded shadow flex flex-col"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{status}</h3>
                      <span className="text-sm text-gray-500">
                        {countByStatus[status] ?? 0}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Button
                        onClick={() =>
                          dispatch(
                            openModal({
                              mode: "add",
                              task: null,
                              // allow preset status if your slice supports it
                              presetStatus: status,
                            }) as any
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-xs"
                      >
                        + Add {status} Task
                      </Button>
                    </div>

                    <div className="min-h-[60px]">
                      <Suspense fallback={<LoadingSpinner />}>
                        <TaskList tasks={items} />
                      </Suspense>
                      {provided.placeholder}
                    </div>

                    {items.length === 0 && (
                      <p className="text-center text-sm text-gray-400 py-4">
                        No tasks here.
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
