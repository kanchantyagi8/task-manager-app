import { useState } from "react";
import type { Task } from "../types/user";
import "../styles/TaskRow.css";
import { toast } from "react-hot-toast/headless";
import Button from "./common/Button";

export function TaskRow({
  task,
  deleteTask,
  toggleStatus,
  editTask,
}: {
  task: Task;
  deleteTask: (id: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  editTask: (id: string, title: string) => Promise<void>;
}) {
  const [editingTitle, setEditingTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isEditingLoadingState, setIsEditingLoadingState] = useState(false);

  const editTaskTitle = () => {
    setIsEditing(true);
  };

  const handleEditTask = async () => {
    setIsEditingLoadingState(true);
    try {
      await editTask(task._id, editingTitle);
    } catch {
      toast.error("Error fetching data");
    } finally {
      setIsEditing(false);
      setIsEditingLoadingState(false);
    }
  };

  const deleteTaskRow = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(task._id);
    } catch {
      toast.error("Error fetching data");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleTaskStatus = async () => {
    setIsTogglingStatus(true);
    try {
      await toggleStatus(task._id);
    } catch {
      toast.error("Error fetching data");
    } finally {
      setIsTogglingStatus(false);
    }
  };

  return (
    <tr className="task-row">
      <td className="task-title">
        {isEditing ?
          <div className="edit-task-container">
            <input
              className="edit-task-input"
              value={editingTitle}
              onChange={(e) => setEditingTitle(e.target.value)}
            />

            <Button
              variant="save"
              onClick={handleEditTask}
              disabled={isEditingLoadingState}
            >
              {isEditingLoadingState ? "Processing..." : "Done"}
            </Button>

            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        : task.title}
      </td>

      <td>
        <span
          className={
            task.completed ? "task-status completed" : "task-status pending"
          }
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </td>

      <td>
        <Button
          variant="primary"
          onClick={toggleTaskStatus}
          disabled={isTogglingStatus}
        >
          {isTogglingStatus ? "Changing..." : "Mark as Done"}
        </Button>
      </td>

      <td>
        <Button variant="edit" onClick={editTaskTitle}>
          Edit
        </Button>
      </td>

      <td>
        <Button variant="danger" onClick={deleteTaskRow} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </td>
    </tr>
  );
}
