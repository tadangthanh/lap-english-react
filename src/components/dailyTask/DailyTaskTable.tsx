import React from "react";
import { Task } from "../../modal/Task";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import { DailyTask } from "../../modal/DailyTask";


interface TaskTableProps {
    dailyTasks: DailyTask[];
    onEdit: (task: Task) => void;
    onDelete: (taskId: number) => void;
    page: number;
    setPage: (page: number) => void;
    pageResponse: PageResponse<Task>;
}

const TaskTable: React.FC<TaskTableProps> = ({ dailyTasks, onEdit, onDelete, page, setPage, pageResponse }) => {
    return (
        <div>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Type</th>
                        <th className="py-2 px-4 border-b">Key Fun Update</th>
                        <th className="py-2 px-4 border-b">Total</th>
                        <th className="py-2 px-4 border-b">Reward</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dailyTasks.map((dlt) => (
                        <tr key={dlt.id} className="hover:bg-gray-100">
                            <td className="py-2 px-4 border-b">{dlt.task.description}</td>
                            <td className="py-2 px-4 border-b">{dlt.task.type}</td>
                            <td className="py-2 px-4 border-b">{dlt.task.keyFunUpdate}</td>
                            <td className="py-2 px-4 border-b">{dlt.task.total}</td>
                            <td className="py-2 px-4 border-b flex items-center space-x-2">
                                <i className="fas fa-gem text-blue-500"></i>
                                <span>{dlt.reward?.diamond}</span>
                                <i className="fas fa-coins text-yellow-500"></i>
                                <span>{dlt.reward?.gold}</span>

                            </td>

                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => onEdit(dlt.task)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(dlt.task.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </table>
            {/* Pagination */}
            {
                dailyTasks.length > 0 && (
                    <div className="mt-4">
                        <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
                    </div>
                )
            }
        </div>
    );
};

export default TaskTable;
