import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { TypeGrammar } from "../../modal/TypeGrammar";
import ConfirmationModal from "../common/ConfirmationModal";

interface TypeGrammarListProps {
  typeGrammars: TypeGrammar[];
  setTypeGrammarEdit: (typeGrammar: TypeGrammar | null) => void;
  typeGrammarEdit: TypeGrammar | null;
  onDelete: (id: number) => void;
}

export const TypeGrammarList: React.FC<TypeGrammarListProps> = ({
  typeGrammars,
  setTypeGrammarEdit,
  typeGrammarEdit,
  onDelete,
}) => {
  const [typeGrammarId, setTypeGrammarId] = useState<number>(-1);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">Type Grammar List</h2>
      {typeGrammars.length === 0 ? (
        <p className="text-center text-gray-500">Empty.</p>
      ) : (
        <ul className="space-y-4">
          {typeGrammars.map((typeGrammar) => (
            <li
              key={typeGrammar.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => navigate(`/type-grammar/${typeGrammar.id}/grammar`)} // Navigate to Grammar page
            >
              <div className="flex items-center">
                <h3 className="text-lg font-semibold">{typeGrammar.name}</h3>
              </div>
              <div className="flex space-x-2">
                {typeGrammarEdit?.id === typeGrammar.id ? (
                  <button
                    className="px-3 py-1 text-sm text-yellow-600 bg-yellow-200 rounded hover:bg-yellow-300"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation on button click
                      setTypeGrammarEdit(null);
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation on button click
                      setTypeGrammarEdit(typeGrammar);
                    }}
                  >
                    <i className="fas fa-edit me-3"></i>
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation on button click
                    setShowModal(true);
                    setTypeGrammarId(typeGrammar.id);
                  }}
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
        message="Are you sure you want to delete this type grammar? This action cannot be undone."
        labelConfirm="Delete"
        labelCancel="Cancel"
        colorConfirm="red"
        show={showModal}
        onConfirm={() => {
          onDelete(typeGrammarId);
          setShowModal(false);
        }}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};
