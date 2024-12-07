import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

interface BreadcrumbItem {
    name: string;
    path: string;
}

const Breadcrumb: React.FC = () => {
    const { typeId, grammarId } = useParams<{ typeId?: string; grammarId?: string }>();

    // Xác định các phần tử trong breadcrumb dựa trên URL
    const breadcrumbItems: BreadcrumbItem[] = [
        { name: 'Type Grammar', path: '/type-grammar' },
        typeId ? { name: `Grammar`, path: `/type-grammar/${typeId}/grammar` } : null,
        grammarId ? { name: `Grammatical Structure`, path: `/type-grammar/${typeId}/grammar/${grammarId}` } : null
    ].filter((item): item is BreadcrumbItem => item !== null); // Ép kiểu mạnh mẽ

    return (
        <nav className="bg-gray-100 px-4 py-2 rounded-lg mb-4 fixed">
            <ol className="list-none flex">
                {breadcrumbItems.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <Link
                            to={item.path}
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            {item.name}
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                            <span className="mx-2 text-gray-500">/</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
