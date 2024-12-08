import { useState } from "react";
import { GrammaticalStructure } from "../../modal/GrammaticalStructure";
import ConfirmationModal from "../common/ConfirmationModal";
import { useNavigate } from "react-router-dom";

interface Props {
    structures: GrammaticalStructure[];
    setGrammaticalStructureEdit: (structure: GrammaticalStructure | null) => void;
    grammaticalStructureEdit: GrammaticalStructure | null;
    onDelete: (id: number) => void;
    typeGrammarId: number,
    grammarId: number
}

export const GrammaticalStructureList: React.FC<Props> = ({ structures, setGrammaticalStructureEdit, typeGrammarId, grammarId, grammaticalStructureEdit, onDelete }) => {
    const [grammaticalStructureId, setGrammaticalStructureId] = useState<number>(-1);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Grammatical Structure List</h2>
            {structures.length === 0 ? (
                <p className="text-gray-500 text-center">No Grammatical Structures Found</p>
            ) : (
                <ul className="space-y-4">
                    {structures.map((structure) => (
                        <li key={structure.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
                            <div>
                                <h3 className="text-lg font-semibold">{structure.structure}</h3>
                                <p className="text-sm text-gray-500">{structure.description}</p>
                            </div>
                            <div>
                                <button
                                    className="px-3 me-5 py-2 text-sm text-blue-600 bg-blue-200 rounded hover:bg-blue-300"
                                    onClick={() => navigate(`/type-grammar/${typeGrammarId}/grammar/${grammarId}/grammatical-structure/${structure.id}/exercises-management`)} // Navigate to Grammar page                        
                                >
                                    Management exercises
                                </button>
                                {grammaticalStructureEdit?.id === structure.id ? (
                                    <button
                                        className="px-3 py-1 text-sm text-yellow-600 bg-yellow-200 rounded hover:bg-yellow-300"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation on button click
                                            setGrammaticalStructureEdit(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                ) : (
                                    <button
                                        className="text-blue-500 hover:text-blue-700"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation on button click
                                            setGrammaticalStructureEdit(structure);
                                        }}
                                    >
                                        <i className="fas fa-edit me-3"></i>
                                    </button>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent navigation on button click
                                        setShowModal(true);
                                        setGrammaticalStructureId(structure.id);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
                title="Confirm Deletion"
                message="Are you sure you want to delete this grammatical structure? This action cannot be undone."
                labelConfirm="Delete"
                labelCancel="Cancel"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => {
                    onDelete(grammaticalStructureId);
                    setShowModal(false);
                }}
                onCancel={() => setShowModal(false)}
            />
        </div>
    );
};
