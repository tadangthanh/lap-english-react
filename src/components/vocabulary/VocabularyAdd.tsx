import React, { useState } from 'react';
import { MdlMainVocabularyTopic } from '../../modal/MdlMainVocabularyTopic';
import { MdlWord } from '../../modal/MdlWord';
import VocabularyTable from './VocabularyTable';


const topics: MdlMainVocabularyTopic[] = [

];


const Vocabulary: React.FC = () => {
    const [words, setWords] = useState<MdlWord[]>([
        {
            id: 1,
            word: 'hello',
            meaning: 'xin chào',
            pronounceUK: 'həˈləʊ',
            pronounceUS: 'həˈloʊ',
            type: 'interjection',
            level: 'A1',
            example: 'Hello, how are you?',
            idSubTopic: 1,
            topicName: 'Greeting',
            imageUrl: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            updateBy: ''

        },
        {
            id: 2,
            word: 'goodbye',
            meaning: 'tạm biệt',
            pronounceUK: 'ɡʊdˈbaɪ',
            pronounceUS: 'ɡʊdˈbaɪ',
            type: 'interjection',
            level: 'A1',
            example: 'Goodbye, see you later!',
            idSubTopic: 1,
            topicName: 'Greeting',
            imageUrl: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            updateBy: ''
        }
    ]);

    const [newWord, setNewWord] = useState<MdlWord>({
        id: 0,
        word: '',
        meaning: '',
        pronounceUK: '',
        pronounceUS: '',
        type: '',
        level: '',
        example: '',
        idSubTopic: 0, // Mặc định chọn chủ đề đầu tiên
        topicName: "",
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        updateBy: ''

    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    };

    const handleAddWord = () => {

    };
    const handleEditWord = (word: MdlWord) => {
        // Logic chỉnh sửa từ
        console.log('Editing word:', word);
    };

    const handleDeleteWord = (id: number) => {
        // Logic xóa từ
        setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    };
    return (
        <div className="p-4">
            <h2>Quản lý từ vựng</h2>

            {/* Form thêm từ mới */}
            <div className="mb-3">
                <div className="row">
                    {/* Chủ đề */}
                    <div className="col-md-6">
                        <label className="form-label">Chủ đề</label>
                        <select
                            className="form-select mb-2"
                            name="idSubTopic"
                            value={newWord.idSubTopic}
                            onChange={handleInputChange}
                        >
                            {topics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Từ vựng */}
                    <div className="col-md-6">
                        <label className="form-label">Từ vựng</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Từ vựng"
                            name="word"
                            value={newWord.word}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Nghĩa */}
                    <div className="col-md-6">
                        <label className="form-label">Nghĩa</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nghĩa"
                            name="meaning"
                            value={newWord.meaning}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Phát âm UK */}
                    <div className="col-md-6">
                        <label className="form-label">Phát âm UK</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Phát âm UK"
                            name="pronounceUK"
                            value={newWord.pronounceUK}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Phát âm US */}
                    <div className="col-md-6">
                        <label className="form-label">Phát âm US</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Phát âm US"
                            name="pronounceUS"
                            value={newWord.pronounceUS}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Loại từ */}
                    <div className="col-md-6">
                        <label className="form-label">Loại từ</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Loại từ"
                            name="type"
                            value={newWord.type}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Trình độ */}
                    <div className="col-md-6">
                        <label className="form-label">Trình độ</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Trình độ"
                            name="level"
                            value={newWord.level}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>

                    {/* Ví dụ */}
                    <div className="col-md-6">
                        <label className="form-label">Ví dụ</label>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ví dụ"
                            name="example"
                            value={newWord.example}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={handleAddWord}>
                    <i className="fa fa-plus-circle"></i> Thêm từ
                </button>
            </div>

            {/* Bảng danh sách từ */}
            {/* Component VocabularyTable */}
            <VocabularyTable
                words={words}
                onEdit={handleEditWord}
                onDelete={handleDeleteWord}
            />
        </div>
    );
};

export default Vocabulary;
