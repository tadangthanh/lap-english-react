import { PageResponse } from "../../modal/PageResponse";

interface PagingProps {
    pageResponse: PageResponse<any>;
    setPage: (page: number) => void;
    page: number;
}
export const Paging: React.FC<PagingProps> = ({ pageResponse, setPage, page }) => {
    return (
        <nav aria-label="Page navigation example" className="flex justify-center mt-4">
            <ul className="flex space-x-2">
                {pageResponse.pageNo > 0 && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(0)}
                        >
                            First
                        </button>
                    </li>
                )}

                {pageResponse.pageNo > 0 && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page - 1)}
                        >
                            Previous
                        </button>
                    </li>
                )}

                {pageResponse.pageNo - 2 >= 0 && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page - 2)}
                        >
                            {pageResponse.pageNo - 2}
                        </button>
                    </li>
                )}

                {pageResponse.pageNo - 1 >= 0 && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page - 1)}
                        >
                            {pageResponse.pageNo - 1}
                        </button>
                    </li>
                )}

                <li>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        disabled
                    >
                        {pageResponse.pageNo}
                    </button>
                </li>

                {pageResponse.pageNo + 1 < pageResponse.totalPage && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page + 1)}
                        >
                            {pageResponse.pageNo + 1}
                        </button>
                    </li>
                )}

                {pageResponse.pageNo + 2 < pageResponse.totalPage && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page + 2)}
                        >
                            {pageResponse.pageNo + 2}
                        </button>
                    </li>
                )}

                {pageResponse.hasNext && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(page + 1)}
                        >
                            Next
                        </button>
                    </li>
                )}

                {pageResponse.pageNo + 1 < pageResponse.totalPage && (
                    <li>
                        <button
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            onClick={() => setPage(pageResponse.totalPage - 1)}
                        >
                            Last
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );

}