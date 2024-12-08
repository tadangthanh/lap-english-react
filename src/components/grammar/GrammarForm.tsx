import { useEffect, useState } from "react";
import { Grammar } from "../../modal/Grammar";

interface GrammarFormProps {
    onSubmit: (grammar: Grammar) => void;
    existingGrammar?: Grammar | null;
    typeGrammarId: number;
    setExistingGrammar: (grammar: Grammar | null) => void;
}

export const GrammarForm: React.FC<GrammarFormProps> = ({
    onSubmit,
    existingGrammar,
    typeGrammarId,
    setExistingGrammar
}) => {
    const [name, setName] = useState(existingGrammar?.name || "");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [description, setDescription] = useState(
        existingGrammar?.description || ""
    );
    const [isFormVisible, setIsFormVisible] = useState(false); // Quản lý việc hiển thị form

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newGrammar = new Grammar(
            existingGrammar?.id || 0,
            name,
            description,
            typeGrammarId,
            new Date(),
            new Date(),
            "",
            "",
        );

        onSubmit(newGrammar);
        setExistingGrammar(null);
        setName("");
        setDescription("");
    };

    useEffect(() => {
        if (existingGrammar) {
            setName(existingGrammar.name);
            setDescription(existingGrammar.description);
        } else {
            setName("");
            setDescription("");
        }
    }, [existingGrammar]);
    return (
        <div className="p-4 bg-white shadow rounded-lg mb-8">
            {/* Nút mở form */}
            {!isFormVisible && (
                <button
                    onClick={() => setIsFormVisible(true)}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    {existingGrammar ? "Edit Grammar" : "Add New Grammar"}
                </button>
            )}

            {/* Form */}
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <h2 className="text-xl font-bold mb-4">
                        {existingGrammar ? "Edit Grammar" : "Add New Grammar"}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setErrorMessage("");
                            }}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setErrorMessage("");
                            }}
                            required
                        />
                    </div>
                    <span className="text-red-500">{errorMessage}</span>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            {existingGrammar ? "Update" : "Add"}
                        </button>
                        <button
                            type="button"
                            className="p-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            onClick={() => setIsFormVisible(false)} // Đóng form khi click
                        >
                            Close
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
