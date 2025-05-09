import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import '../App.css';

type PostCardProps = {
    question: string;
    result: string;
};

function PostCard({ question, result }: PostCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    let jsonData;
    try {
        jsonData = JSON.parse(result);
    } catch (error) {
        console.error('Invalid JSON:', error);
        jsonData = { text: 'Invalid content', sources: [] };
    }

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div className='card'>
            <h3 
                onClick={handleToggle} 
                style={{ cursor: 'pointer', marginBottom: isExpanded ? '1rem' : 0 }}
            >
                {question}
            </h3>

            {isExpanded && (
                <div>
                    <ReactMarkdown>{jsonData.text}</ReactMarkdown>

                    {jsonData.sources && jsonData.sources.length > 0 && (
                        <div style={{ marginTop: '1rem' }}>
                            <h4>Sources:</h4>
                            <ul>
                                {jsonData.sources.map((source: any, index: number) => (
                                    <li key={index}>
                                        <img 
                                            src={source.iconUrl} 
                                            alt={`${source.title} icon`} 
                                            style={{ width: 16, height: 16, marginRight: 8 }} 
                                        />
                                        <a href={source.url} target="_blank" rel="noopener noreferrer">
                                            {source.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default PostCard;
