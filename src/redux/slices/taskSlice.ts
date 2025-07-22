// src/redux/slices/taskSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ModalState, type Task } from "../../types";
import { STATUSES } from "../../utils/constants";

interface TaskState {
  tasks: Task[];
  modal: ModalState;
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Sample Task",
      description: "This is a sample task",
      status: STATUSES[0],
      dueDate: "2025-07-20",
    },
  ],
  modal: { isOpen: false, mode: "add", task: null },
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{ taskId: string; newStatus: string }>
    ) {
      const { taskId, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.status = newStatus;
      }
    },
    openModal(
      state,
      action: PayloadAction<{ mode: "add" | "edit"; task: Task | null }>
    ) {
      state.modal = {
        isOpen: true,
        mode: action.payload.mode,
        task: action.payload.task,
      };
    },
    closeModal(state) {
      state.modal = { isOpen: false, mode: "add", task: null };
    },
  },
});

export const { addTask, updateTask, updateTaskStatus, openModal, closeModal } =
  taskSlice.actions;
export default taskSlice.reducer;
