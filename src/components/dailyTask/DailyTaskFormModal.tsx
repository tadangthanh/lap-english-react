import React, { useState } from "react";
import { Task } from "../../modal/Task";
import { TypeTask } from "../../modal/TypeTask";
import { FunTaskQuiz } from "../../modal/FunTaskQuiz";
import { TypeTaskFor } from "../../modal/TypeTaskFor";

interface TaskFormModalProps {
    task: Task | null;
    onSave: (task: Task) => void;
    onClose: () => void;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({ task, onSave, onClose }) => {
    const [formData, setFormData] = useState<Task>(
        task || {
            id: 0,
            description: "",
            type: TypeTask.LOGIN,
            keyFunUpdate: FunTaskQuiz.funLearnNewTopicWord, // Default value
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
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Check if input belongs to the reward object
        if (name.startsWith("reward.")) {
            const rewardField = name.split(".")[1];
            // Nếu trường reward.quantity, chuyển giá trị thành number
            const newValue = rewardField === "quantity" ? Number(value) : value;
            setFormData({
                ...formData,
                reward: {
                    ...formData.reward,
                    [rewardField]: newValue,
                },
            });
        } else {
            // Handle total value conversion to number
            if (name === "total") {
                setFormData({
                    ...formData,
                    [name]: value ? Number(value) : 0, // Convert to number, default 0 if empty
                });
            } else {
                setFormData({ ...formData, [name]: value });
            }
        }
    };

    const handleSubmit = () => {
        onSave(formData);
    };
    const [typeTaskFor, setTypeTaskFor] = useState<TypeTaskFor>(TypeTaskFor.DAILY);


    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add New Task"}</h2>

                {/* Task Description */}
                <input
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 mb-2"
                />

                {/* Task Type */}
                Type Task
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
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
                    value={formData.keyFunUpdate}
                    onChange={handleChange}
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
                    value={formData.total}
                    onChange={handleChange}
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
                        value={formData.reward.gold}
                        onChange={handleChange}
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
                        value={formData.reward.diamond}
                        onChange={handleChange}
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

export default TaskFormModal;
