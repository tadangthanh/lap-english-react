import React from 'react';
import { MdlWord } from '../../modal/MdlWord';


interface VocabularyTableProps {
    words: MdlWord[];
    onEdit?: (word: MdlWord) => void;
    onDelete?: (id: number) => void;
}

const VocabularyTable: React.FC<VocabularyTableProps> = ({ words, onEdit, onDelete }) => {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Từ vựng</th>
                    <th>Nghĩa</th>
                    <th>Phát âm UK</th>
                    <th>Phát âm US</th>
                    <th>Loại từ</th>
                    <th>Trình độ</th>
                    <th>Ví dụ</th>
                    <th>Chủ đề</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word) => (
                    <tr key={word.id}>
                        <td>{word.id}</td>
                        <td>{word.word}</td>
                        <td>{word.meaning}</td>
                        <td>{word.pronounceUK}</td>
                        <td>{word.pronounceUS}</td>
                        <td>{word.type}</td>
                        <td>{word.level}</td>
                        <td>{word.example}</td>
                        <td>{word.topicName}</td>
                        <td>
                            {onEdit && (
                                <button
                                    className="btn btn-sm btn-outline-secondary me-2"
                                    onClick={() => onEdit(word)}
                                >
                                    <i className="fa fa-pencil-alt"></i> Sửa
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(word.id)}
                                >
                                    <i className="fa fa-trash"></i> Xóa
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VocabularyTable;
