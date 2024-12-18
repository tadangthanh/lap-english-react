import React, { useEffect, useState } from "react";
import { Task } from "../../modal/Task";
import { verifyToken } from "../../api/ApiUtils";
import { useNavigate } from "react-router-dom";
import { createDailyTask, deleteDailyTask, getPageDailyTask, updateDailyTask } from "../../api/task/DailyTaskApi";
import { toast, ToastContainer } from "react-toastify";
import { PageResponse } from "../../modal/PageResponse";
import { TitleTaskForm } from "./TitleTaskFormModal";
import { TitleTaskTable } from "./TitleTaskTable";
import { Title } from "../../modal/Title";
import { createTitleTask, deleteTitleTask, getPageTitleTask, updateTitleTask } from "../../api/task/TitleTaskApi";

export const TitleTaskManager = () => {
    const [titles, setTitles] = useState<Title[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [currentTitle, setCurrentTitle] = useState<Title | null>(null);  // Changed from Task to Title
    const [page, setPage] = useState<number>(0);
    const [file, setFile] = useState<File | undefined>(undefined);

    const [size, setSize] = useState<number>(10);
    const [pageResponse, setPageResponse] = useState<PageResponse<Title>>({
        pageNo: 0,
        pageSize: 10,
        totalPage: 0,
        hasNext: true,
        totalItems: 0,
        items: [],
    });

    // Verify token is valid or not
    const navigate = useNavigate();
    useEffect(() => {
        verifyToken().then((response: any) => {
            if (response.status !== 200) {
                navigate('/login');
            }
        });
    }, []);

    // Fetch Title Task list when page or size changes
    useEffect(() => {
        getPageTitleTask(page, size).then((response) => {
            if (response.status === 200) {
                setTitles(response.data.items);
                setPageResponse(response.data);
            } else {
                toast.error(response.message, { containerId: "title-task" });
            }
        });
    }, [page, size]);

    // Handle Add New Task
    const handleAddTask = () => {
        setCurrentTitle(null);  // Set to null for a new Title
        setShowModal(true);
    };

    // Handle Edit Task
    const handleEditTask = (title: Title) => {  // Changed from Task to Title
        setCurrentTitle(title);  // Set the current Title for editing
        setShowModal(true);
    };

    // Handle Delete Task
    const handleDeleteTask = (titleId: number) => {
        deleteTitleTask(titleId).then((response) => {
            if (response.status === 204) {
                setTitles(titles.filter((title) => title.id !== titleId));  // Filter out deleted task
            } else {
                toast.error(response.message, { containerId: "title-task" });
            }
        });
    };

    // Save Task (Add or Edit)
    const saveTask = (title: Title) => {
        if (title.id) {
            // Edit Title Task
            updateTitleTask(title).then((response) => {
                if (response.status === 200) {
                    const updatedTitle = response.data;
                    setTitles(titles.map((t) => (t.id === updatedTitle.id ? updatedTitle : t)));  // Update title in list
                } else {
                    toast.error(response.message, { containerId: "title-task" });
                }
            });
        } else {
            // Add New Title Task
            createTitleTask(title, file).then((response) => {
                if (response.status === 201) {
                    toast.success(response.message, { containerId: "title-task" });
                    setTitles([...titles, response.data]);  // Add new title to list
                } else {
                    toast.error(response.message, { containerId: "title-task" });
                }
            });
        }
        setShowModal(false);  // Close the modal
    };

    return (
        <div className="container mx-auto p-6">
            <ToastContainer containerId="title-task" />

            <h1 className="text-3xl font-bold mb-4">Title Task Manager</h1>
            <div className="flex justify-between mb-4">
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add New Title Task
                </button>
            </div>
            <TitleTaskTable
                titles={titles}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                page={page}
                setPage={setPage}
                pageResponse={pageResponse}
            />

            {showModal && (
                <TitleTaskForm
                    file={file}
                    setFile={setFile}
                    titleEdit={currentTitle}  // Pass Title object
                    onClose={() => setShowModal(false)}
                    onSave={saveTask}
                />
            )}
        </div>
    );
};
