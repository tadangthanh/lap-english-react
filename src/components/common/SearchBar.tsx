// src/components/common/SearchBar.tsx
import { FC } from "react";

interface SearchBarProps {
    searchQuery: string;
    onSearchQueryChange: (query: string) => void;
    onSearch: () => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, onSearchQueryChange, onSearch }) => {
    return (
        <div className="flex mb-4">
            <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)} // Cập nhật giá trị tìm kiếm
            />
            <button
                onClick={onSearch} // Gọi hàm tìm kiếm khi nhấn nút
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Search
            </button>
        </div>
    );
};

export default SearchBar;
