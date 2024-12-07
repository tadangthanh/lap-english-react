import { useState, useEffect } from "react";
import { TypeGrammar } from "../../modal/TypeGrammar";

interface TypeGrammarFormProps {
  onSubmit: (typeGrammar: TypeGrammar) => void;
  existingTypeGrammar?: TypeGrammar | null;
  setExistingTypeGrammar: (typeGrammar: TypeGrammar | null) => void;
}

export const TypeGrammarForm: React.FC<TypeGrammarFormProps> = ({
  onSubmit,
  existingTypeGrammar,
  setExistingTypeGrammar,
}) => {
  const [name, setName] = useState(existingTypeGrammar?.name || "");
  const [errorMessage, setErrorMessage] = useState<string>("");
  useEffect(() => {
    setName(existingTypeGrammar?.name || "");
  }, [existingTypeGrammar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Name is required");
      return;
    }
    const typeGrammar: TypeGrammar = {
      id: existingTypeGrammar?.id || 0,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: "",
      updatedBy: "",
    };
    onSubmit(typeGrammar);
    setExistingTypeGrammar(null);
    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white shadow rounded-lg mb-8"
    >
      <h2 className="text-xl font-bold mb-4">
        {existingTypeGrammar ? "Edit Type Grammar" : "Add Type Grammar"}
      </h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          TypeGrammar name
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrorMessage("");
          }}
        />
        <span className="text-red-500">{errorMessage}</span>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {existingTypeGrammar ? "Update" : "Add"}
      </button>
    </form>
  );
};
