import { Grammar } from "../../modal/Grammar";

interface GrammarListProps {
    grammars: Grammar[];
    onEdit: (grammar: Grammar) => void;
    onDelete: (id: number) => void;
}

export const GrammarList: React.FC<GrammarListProps> = ({
    grammars,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Grammar List</h2>
            {grammars.length === 0 ? (
                <p className="text-center text-gray-500">No Grammar Found</p>
            ) : (
                <ul className="space-y-4">
                    {grammars.map((grammar) => (
                        <li
                            key={grammar.id}
                            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
                        >
                            <div>
                                <h3 className="text-lg font-semibold">{grammar.name}</h3>
                                <p className="text-sm text-gray-500">{grammar.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => onEdit(grammar)}
                                >
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => onDelete(grammar.id)}
                                >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
