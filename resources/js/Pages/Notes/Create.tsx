import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';

interface PageProps {
    errors: {
        title?: string;
        content?: string;
    };
}

const Create: React.FC = () => {
    const { errors } = usePage<PageProps>().props; // Get validation errors from Inertia
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Inertia.post('/notes', { title, content });
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    return (
        <div>
            <h1>Create a New Note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Note Title</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    {errors.title && <span style={{ color: 'red' }}>{errors.title}</span>}
                </div>
                <div>
                    <label>Note Content</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                    {errors.content && <span style={{ color: 'red' }}>{errors.content}</span>}
                </div>
                <button type="submit">Create Note</button>
            </form>
        </div>
    );
};

export default Create;
