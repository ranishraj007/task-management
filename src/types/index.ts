// src/types/index.ts
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export interface AuthState {
  user: { email: string } | null;
  isAuthenticated: boolean;
}

export interface ModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  task: Task | null;
}

export interface TaskState {
  tasks: Task[];
  modal: ModalState;
}
