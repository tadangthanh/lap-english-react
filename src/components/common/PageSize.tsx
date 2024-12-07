import React from "react";
interface PageSizeProps {
    size: number;
    handlePageSizeChange: (size: number) => void;
}
export const PageSize: React.FC<PageSizeProps> = ({ size, handlePageSizeChange }) => {
    return (
        <div>
            <label htmlFor="pageSize" className=" me-3">Item count:</label>
            <select id="pageSize" value={size + ''} onChange={(event: any) => { handlePageSizeChange(+event.target.value) }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    );
};
