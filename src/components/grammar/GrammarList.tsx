import { Grammar } from "../../modal/Grammar";

interface GrammarListProps {
    grammars: Grammar[];
    setGrammarEdit: (grammar: Grammar | null) => void;
    grammarEdit: Grammar | null;
    onDelete: (id: number) => void;
}

export const GrammarList: React.FC<GrammarListProps> = ({
    grammars,
    setGrammarEdit,
    grammarEdit,
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
                                {grammarEdit?.id === grammar.id ?
                                    <button
                                        className="px-3 py-1 text-sm text-yellow-600 bg-yellow-200 rounded hover:bg-yellow-300"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent navigation on button click
                                            setGrammarEdit(null);
                                        }}
                                    >
                                        Cancel
                                    </button> :
                                    <button
                                        className="me-2 text-blue-500 hover:text-blue-700"
                                        onClick={() => setGrammarEdit(grammar)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                }
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
