import { PageResponse } from "../../modal/PageResponse";

interface PagingProps {
    pageResponse: PageResponse<any>;
    setPage: (page: number) => void;
    page: number;
}
export const Paging: React.FC<PagingProps> = ({ pageResponse, setPage, page }) => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pageResponse.pageNo > 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(0)}>First</a>
                    </li>
                )}

                {pageResponse.pageNo > 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page - 1)}>Previous</a>
                    </li>
                )}

                {pageResponse.pageNo - 2 >= 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page - 2)}>{pageResponse.pageNo - 2}</a>
                    </li>
                )}

                {pageResponse.pageNo - 1 >= 0 && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page - 1)}>{pageResponse.pageNo - 1}</a>
                    </li>
                )}

                <li className="page-item active">
                    <a className="page-link" href="#">{pageResponse.pageNo}</a>
                </li>

                {pageResponse.pageNo + 1 < pageResponse.totalPage && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page + 1)}>{pageResponse.pageNo + 1}</a>
                    </li>
                )}

                {pageResponse.pageNo + 2 < pageResponse.totalPage && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page + 2)}>{pageResponse.pageNo + 2}</a>
                    </li>
                )}

                {pageResponse.hasNext && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(page + 1)}>Next</a>
                    </li>
                )}

                {pageResponse.pageNo + 1 < pageResponse.totalPage && (
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPage(pageResponse.totalPage - 1)}>Last</a>
                    </li>
                )}

            </ul>
        </nav>
    );
}