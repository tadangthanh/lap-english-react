import React, { useEffect, useState } from "react";
import { Task } from "../../modal/Task";
import TaskTable from "./TaskTable";
import TaskFormModal from "./TaskFormModal";
import { verifyToken } from "../../api/ApiUtils";
import { useNavigate } from "react-router-dom";
import { createTask, deleteTask, getPageTask, updateTask } from "../../api/task/TaskApi";
import { toast, ToastContainer } from "react-toastify";
import { PageResponse } from "../../modal/PageResponse";


const TaskManager = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentTask, setCurrentTask] = useState<Task | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [pageResponse, setPageResponse] = useState<PageResponse<Task>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });


    // xác thực token còn hiệu lực hay k
    const navigate = useNavigate();
    useEffect(() => {
        verifyToken().then((response: any) => {
            if (response.status !== 200) {
                navigate('/login');
            }
        })
    }, []);
    useEffect(() => {
        getPageTask(page, size).then((response) => {
            if (response.status === 200) {
                setTasks(response.data.items);
                setPageResponse(response.data);
            } else {
                toast.error(response.message, { containerId: "task" });
            }
        });
    }, [page, size]);
    const handleAddTask = () => {
        setCurrentTask(null);
        setShowModal(true);
    };

    const handleEditTask = (task: Task) => {
        setCurrentTask(task);
        setShowModal(true);
    };

    const handleDeleteTask = (taskId: number) => {
        deleteTask(taskId).then((response) => {
            if (response.status === 204) {
                setTasks(tasks.filter((t) => t.id !== taskId));
            } else {
                toast.error(response.message, { containerId: "task" });
            }
        })
    };

    const saveTask = (task: Task) => {
        if (task.id) {
            // Edit task
            // setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
            updateTask(task).then((response) => {
                if (response.status === 200) {
                    const taskNew = response.data;
                    setTasks(tasks.map((t) => (t.id === taskNew.id ? taskNew : t)));
                } else {
                    toast.error(response.message, { containerId: "task" });
                }
            });
        } else {
            createTask(task).then((response) => {
                if (response.status === 201) {
                    toast.success(response.message, { containerId: "task" });
                    console.log(response.data);
                    setTasks([...tasks, response.data]);
                } else {
                    toast.error(response.message, { containerId: "task" });
                }
            });
        }
        setShowModal(false);
    };

    return (
        <div className="container mx-auto p-6">
            <ToastContainer containerId="task" />

            <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
            <div className="flex justify-between mb-4">
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Task
                </button>
            </div>
            <TaskTable
                tasks={tasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                page={page}
                setPage={setPage}
                pageResponse={pageResponse}
            />

            {showModal && (
                <TaskFormModal
                    task={currentTask}
                    onClose={() => setShowModal(false)}
                    onSave={saveTask}
                />
            )}
        </div>
    );
};

export default TaskManager;
