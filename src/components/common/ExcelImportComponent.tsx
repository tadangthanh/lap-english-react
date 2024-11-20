import React, { useRef, useState } from "react";
import InstructionalText from "./InstructionalText";

interface ExcelImportProps {
    fileImport: File | null;
    setFileImport(file: File): void;
    handleImport(): void;
    instructionalText: string;
}

const ExcelImportComponent: React.FC<ExcelImportProps> = ({ fileImport, setFileImport, handleImport, instructionalText }) => {
    const importInputRef = useRef<HTMLInputElement | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const validTypes = ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
            if (!validTypes.includes(file.type)) {
                setErrorMessage("Invalid file type. Please upload an Excel file (.xls or .xlsx).");
                importInputRef.current && (importInputRef.current.value = '');
                return;
            }
            setErrorMessage(""); // Xóa thông báo lỗi nếu file hợp lệ
            setFileImport(file); // Lưu file vào state
        }
    };

    const _handleImport = () => {
        if (!fileImport) {
            setErrorMessage("Please choose a file to import");
            return;
        }
        handleImport(); // Gọi hàm xử lý import từ props
        importInputRef.current && (importInputRef.current.value = '');
    };

    return (
        <div className="mt-6 border rounded shadow p-4 zoom-in">
            <h2 className="text-lg font-bold mb-3">Import from Excel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex items-baseline">
                    <div className="w-full">
                        <input
                            ref={importInputRef}
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={onChangeFile}
                            className="p-2 border rounded w-full"
                        />
                        {/* Vùng chứa error message với chiều cao cố định */}
                        <span
                            className={`block text-red-600 ms-2 mt-1 transition-opacity duration-300 ${errorMessage ? "opacity-100" : "opacity-0"
                                }`}
                            style={{ minHeight: "20px" }}
                        >
                            {errorMessage}
                        </span>
                    </div>
                    <button
                        onClick={_handleImport}
                        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                    >
                        Import
                    </button>
                </div>
                <InstructionalText instructionalText={instructionalText} />
            </div>
        </div>
    );
};

export default ExcelImportComponent;
