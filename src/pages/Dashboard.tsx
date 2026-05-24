import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useMemo, useState } from "react";
import { TaskTable } from "../components/TaskTable";
import "../styles/Dashboard.css";
import { useTasks } from "../hooks/useTasks";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const {
    taskList,
    taskLoadingState,
    createTask,
    createTaskLoadingState,
    deleteTask,
    toggleStatus,
    editTask,
    searchTask,
    resetTaskList,
  } = useTasks();
  const [newTask, setNewTask] = useState<string>("");
  const [showTaskSection, setShowTaskSection] = useState(false);
  const [searchTaskValue, setSearchTaskValue] = useState<string>("");
  const [taskStatus, setTaskStatus] = useState("all");
  const finalTaskList = useMemo(() => {
    if (taskStatus === "completed") {
      return taskList.filter((task) => task.completed);
    } else if (taskStatus === "pending") {
      return taskList.filter((task) => !task.completed);
    } else {
      return taskList;
    }
  }, [taskList, taskStatus]);

  const handleLogout = () => {
    logout();
  };

  const checkUserProfile = () => {
    navigate("/profile");
  };

  const addTask = () => {
    setShowTaskSection(!showTaskSection);
  };

  const handleCreateTask = async () => {
    const success = await createTask(newTask);
    if (success) {
      setShowTaskSection(false);
      setNewTask("");
    }
  };

  const handleSearchTask = () => {
    if (!searchTaskValue.trim()) {
      return;
    }
    searchTask(searchTaskValue);
  };

  const handleResetTaskList = () => {
    if (searchTaskValue.trim()) {
      setSearchTaskValue("");
      resetTaskList();
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-detail">
          <h1 className="dashboard-title">Task Manager Dashboard</h1>
          <p className="dashboard-welcome">
            Welcome: <span>{user?.email}</span>
          </p>
        </div>

        <div className="dashboard-actions">
          <Button variant="secondary" onClick={checkUserProfile}>
            Check Profile
          </Button>

          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>

          <Button variant="primary" onClick={addTask}>
            Add new task
          </Button>
        </div>
      </div>

      {showTaskSection ?
        <div className="create-task-card">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title"
            type="text"
          />

          <Button
            variant="primary"
            onClick={handleCreateTask}
            disabled={createTaskLoadingState}
          >
            {createTaskLoadingState ? "Loading..." : "Create Task"}
          </Button>
        </div>
      : null}

      <div className="task-section">
        <div className="task-section-header">
          <h2 className="task-section-title">List of tasks</h2>

          <div className="search-filter-container">
            <div className="search-container">
              <Input
                value={searchTaskValue}
                onChange={(e) => setSearchTaskValue(e.target.value)}
                placeholder="Search tasks..."
                type="text"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearchTask();
                  }
                }}
              />

              <Button variant="clear-search-btn" onClick={handleResetTaskList}>
                ✕
              </Button>
            </div>

            <div className="filter-container">
              <Button
                variant={
                  taskStatus === "all" ? "active-button" : "filter-button"
                }
                onClick={() => setTaskStatus("all")}
              >
                All
              </Button>

              <Button
                variant={
                  taskStatus === "completed" ? "active-button" : "filter-button"
                }
                onClick={() => setTaskStatus("completed")}
              >
                Completed
              </Button>

              <Button
                variant={
                  taskStatus === "pending" ? "active-button" : "filter-button"
                }
                onClick={() => setTaskStatus("pending")}
              >
                Pending
              </Button>
            </div>
          </div>
        </div>

        {taskLoadingState ?
          <p className="loading-text">Loading...</p>
        : <div className="task-table-wrapper">
            {finalTaskList?.length > 0 ?
              <TaskTable
                taskList={finalTaskList}
                deleteTask={deleteTask}
                toggleStatus={toggleStatus}
                editTask={editTask}
              />
            : <p className="empty-task-text">No Task available</p>}
          </div>
        }
      </div>
    </div>
  );
}
