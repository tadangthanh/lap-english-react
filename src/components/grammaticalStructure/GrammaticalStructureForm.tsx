import { useEffect, useState } from "react";
import { GrammaticalStructure } from "../../modal/GrammaticalStructure";

interface Props {
    grammarId: number;
    onSubmit: (structure: GrammaticalStructure) => void;
    existingStructure?: GrammaticalStructure | null;
    setExistingStructure: (structure: GrammaticalStructure | null) => void;
}

export const GrammaticalStructureForm: React.FC<Props> = ({
    grammarId,
    onSubmit,
    existingStructure,
    setExistingStructure,
}) => {
    const [structure, setStructure] = useState(existingStructure?.structure || "");
    const [description, setDescription] = useState(existingStructure?.description || "");

    useEffect(() => {
        setStructure(existingStructure?.structure || "");
        setDescription(existingStructure?.description || "");
    }, [existingStructure]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newStructure = new GrammaticalStructure(
            existingStructure?.id || 0,
            description,
            structure,
            grammarId,
            new Date(),
            new Date(),
            "",
            ""
        );
        onSubmit(newStructure);
        setExistingStructure(null);
        setStructure("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg mb-4">
            <div className="mb-4">
                <label className="block mb-2 font-medium">Structure</label>
                <input
                    value={structure}
                    onChange={(e) => setStructure(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {existingStructure ? "Update" : "Add"}
            </button>
        </form>
    );
};
