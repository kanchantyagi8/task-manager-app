import type { Task } from "../types/user";
import { TaskRow } from "./TaskRow";
import "../styles/TaskTable.css";

export function TaskTable({
  taskList,
  deleteTask,
  toggleStatus,
  editTask,
}: {
  taskList: Task[];
  deleteTask: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  editTask: (id: string, title: string) => Promise<void>;
}) {
  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
          <th>Mark as Done</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {taskList.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            deleteTask={deleteTask}
            toggleStatus={toggleStatus}
            editTask={editTask}
          />
        ))}
      </tbody>
    </table>
  );
}
