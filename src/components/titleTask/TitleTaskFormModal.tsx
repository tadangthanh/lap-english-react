import React, { useEffect, useState } from "react";
import { Task } from "../../modal/Task";
import { TypeTask } from "../../modal/TypeTask";
import { FunTaskQuiz } from "../../modal/FunTaskQuiz";
import { TypeTaskFor } from "../../modal/TypeTaskFor";
import { Title } from "../../modal/Title";
import { Reward } from "../../modal/Reward";

interface TitleTaskFormModalProps {
    titleEdit: Title | null;
    onSave: (title: Title) => void;
    onClose: () => void;
    file: File | undefined;
    setFile: (file: File) => void;
}

export const TitleTaskForm: React.FC<TitleTaskFormModalProps> = ({ titleEdit, onSave, onClose, file, setFile }) => {
    const [task, setTask] = useState<Task>({
        id: 0,
        description: "",
        type: TypeTask.LOGIN,
        keyFunUpdate: FunTaskQuiz.funLearnNewTopicWord,
        total: 0,
        reward: {
            id: 0,
            gold: 0,
            diamond: 0,
            createdAt: new Date(),
            createdBy: "",
            updatedAt: new Date(),
            updatedBy: "",
        },
        createdAt: new Date(),
        createdBy: "",
        updatedAt: new Date(),
        updatedBy: "",
    });
    useEffect(() => {
        if (titleEdit) {
            setTask(titleEdit.task);
            setReward(titleEdit.reward);
            setTitle(titleEdit);
        }
    }, [titleEdit]);
    const [title, setTitle] = useState<Title>({
        id: 0,
        image: "",
        title: "",
        task: task,
        reward: {
            id: 0,
            gold: 0,
            diamond: 0,
            createdAt: new Date(),
            createdBy: "",
            updatedAt: new Date(),
            updatedBy: "",
        },
        createdAt: new Date(),
        createdBy: "",
        updatedAt: new Date(),
        updatedBy: "",
    });
    const [reward, setReward] = useState<Reward>({
        id: 0,
        gold: 0,
        diamond: 0,
        createdAt: new Date(),
        createdBy: "",
        updatedAt: new Date(),
        updatedBy: "",
    });
    const handleSubmit = () => {
        onSave({
            ...title,
            task: task,
            reward: reward,
        });
    }
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add New Task"}</h2>

                {/* Task title */}
                <input
                    name="title"
                    placeholder="Title"
                    value={title.title}
                    onChange={(e) => setTitle({ ...title, title: e.target.value })}
                    className="w-full border p-2 mb-2"
                />
                {/* Task description */}
                <input
                    name="DescriptionTask"
                    placeholder="Description task"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="w-full border p-2 mb-2"
                />
                {/* title image */}
                <input
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files![0])}
                    placeholder="Description task"
                    className="w-full border p-2 mb-2"
                />

                {/* Task Type */}
                Type Task
                <select
                    name="type"
                    value={task.type}
                    onChange={(e) => setTask({ ...task, type: e.target.value as TypeTask })}
                    className="w-full border p-2 mb-2"
                >
                    {Object.values(TypeTask)
                        .filter((key) => isNaN(Number(key))) // Lọc chỉ lấy key là string
                        .map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                </select>
                {/* Key Fun Update */}
                <h3 className="text-lg font-semibold mt-4 mb-2">Key Fun Update</h3>
                <select
                    name="keyFunUpdate"
                    value={task.keyFunUpdate}
                    onChange={(e) => setTask({ ...task, keyFunUpdate: e.target.value as FunTaskQuiz })}
                    className="w-full border p-2 mb-2"
                >
                    {Object.values(FunTaskQuiz)
                        .filter((key) => isNaN(Number(key))) // Lọc chỉ lấy key là string
                        .map((keyFun) => (
                            <option key={keyFun} value={keyFun}>
                                {keyFun}
                            </option>
                        ))}
                </select>

                {/* Total */}
                <h3 className="text-lg font-semibold mt-4 mb-2">Total</h3>
                <input
                    name="total"
                    type="number"
                    placeholder="Enter total"
                    value={task.total}
                    onChange={(e) => setTask({ ...task, total: Number(e.target.value) })}
                    className="w-full border p-2 mb-2"
                />
                {/* Reward Section */}
                <h3 className="text-lg font-semibold mt-4 mb-2">Reward</h3>

                {/* Gold input with icon */}
                <div className="relative mb-4">
                    <input
                        name="reward.gold"
                        type="number"
                        placeholder="Gold"
                        value={reward.gold}
                        onChange={(e) => setReward({ ...reward, gold: Number(e.target.value) })}
                        className="w-full border p-2 pl-10"
                    />
                    <i className="absolute right-10 top-3 text-yellow-500 fa fa-coins"></i>
                </div>

                {/* Diamond input with icon */}
                <div className="relative mb-4">
                    <input
                        name="reward.diamond"
                        type="number"
                        placeholder="Diamond"
                        value={reward.diamond}
                        onChange={(e) => setReward({ ...reward, diamond: Number(e.target.value) })}
                        className="w-full border p-2 pl-10"
                    />
                    <i className="absolute right-10 top-3 text-blue-500 fa fa-gem"></i>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Save
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 text-gray-500 hover:underline"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

