import { useContext, useState } from "react";
import { MainTopic } from "../../modal/MainTopic";
import { PageResponse } from "../../modal/PageResponse";
import { Paging } from "../common/Paging";
import ConfirmationModal from "../common/ConfirmationModal";
import { PageSize } from "../common/PageSize";
import { DataContext } from "../context/DataContext";

interface TableMainTopicProps {
    mainTopics: MainTopic[];
    pageResponse: PageResponse<MainTopic>;
    setPage: (page: number) => void;
    page: number;
    setMainTopicEdit: (mainTopic: MainTopic | null) => void;
    mainTopicEdit: MainTopic | null;
    handleDeleteMainTopic: (id: number) => void;
}
export const TableMainTopic: React.FC<TableMainTopicProps> = ({ mainTopics, pageResponse, setPage, page, setMainTopicEdit, mainTopicEdit, handleDeleteMainTopic }) => {
    const [showModal, setShowModal] = useState(false);
    const [mainTopicId, setMainTopicId] = useState(-1);
    const context = useContext(DataContext);
    return (
        <div className="table-responsive mt-4" >
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Chủ đề</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {mainTopics.length > 0 ? (
                        mainTopics.map((topic) => (
                            <tr key={topic.id} >
                                <td style={{ background: mainTopicEdit?.id === topic.id ? "grey" : "white" }}>{topic.id}</td>
                                <td style={{ background: mainTopicEdit?.id === topic.id ? "grey" : "white" }}>{topic.name}</td>
                                <td style={{ background: mainTopicEdit?.id === topic.id ? "grey" : "white" }}>{new Date(topic.createdAt).toLocaleDateString()}</td>
                                <td style={{ background: mainTopicEdit?.id === topic.id ? "grey" : "white" }}>{new Date(topic.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    {mainTopicEdit?.id !== topic.id && <button className="btn btn-sm btn-secondary me-2" onClick={
                                        () => setMainTopicEdit(topic)
                                    }>Edit <i className="fa-solid fa-pen-to-square"></i></button>}
                                    {
                                        mainTopicEdit?.id === topic.id && <button className="btn btn-sm btn-warning me-2" onClick={
                                            () => setMainTopicEdit(null)
                                        }>Cancel</button>
                                    }
                                    <button className="btn btn-sm btn-danger" onClick={() => {
                                        setShowModal(true);
                                        setMainTopicId(topic.id);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">Không có chủ đề nào</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Paging page={page} setPage={setPage} pageResponse={pageResponse} />
            {/* Modal xác nhận xóa */}
            <ConfirmationModal
                title="Xác nhận xóa"
                message="Bạn có chắc chắn muốn xóa chủ đề này không? Việc này sẽ xóa tất cả các đối tượng phụ thuộc vào chủ đề này."
                labelConfirm="Xóa"
                labelCancel="Hủy"
                colorConfirm="red"
                show={showModal}
                onConfirm={() => { handleDeleteMainTopic(mainTopicId); setShowModal(false); }}
                onCancel={() => setShowModal(false)}
            />
            <PageSize
                size={context.size}
                handlePageSizeChange={context.handleChangePageSize}
            />
        </div >

    );
}