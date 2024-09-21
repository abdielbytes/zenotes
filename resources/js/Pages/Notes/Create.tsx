import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function CreateNote() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
    });

    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    const processText = (text) => {
        text = text.trim();

        text = text.replace(/\b(period)\b/gi, '.');
        text = text.replace(/\b(comma)\b/gi, ',');
        text = text.replace(/\b(new paragraph)\b/gi, '\n\n');

        text = text.replace(/(^\w{1}|\.\s*\w{1}|\n\n\s*\w{1})/gi, function (char) {
            return char.toUpperCase();
        });

        return text;
    };

    useEffect(() => {
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            const speechRecognition = new window.SpeechRecognition();
            speechRecognition.interimResults = true;
            speechRecognition.continuous = true;

            speechRecognition.addEventListener('result', (e) => {
                let finalText = '';
                let interimText = '';

                Array.from(e.results).forEach((result) => {
                    if (result.isFinal) {
                        finalText += result[0].transcript;
                    } else {
                        interimText += result[0].transcript;
                    }
                });

                setFinalTranscript(finalText);
                setInterimTranscript(interimText);
                setData('content', data.content + finalText);
            });

            speechRecognition.addEventListener('end', () => {
                if (isListening) {
                    speechRecognition.start();
                }
            });

            setRecognition(speechRecognition);
        } else {
            alert('Speech recognition is not supported in this browser.');
        }
    }, [isListening, data]);

    const startListening = () => {
        if (recognition) {
            recognition.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognition) {
            recognition.stop();
            setIsListening(false);
        }
    };

    const submit = (e: any) => {
        e.preventDefault();
        post(route('notes.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New Note</h2>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={submit}
                            disabled={processing}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                        <a
                            href={route('notes.index')}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </a>
                    </div>
                </div>
            }
        >
            <Head title="Create Note" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form onSubmit={submit} className="space-y-6">
                                {/* Title Input */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                                    )}
                                </div>

                                {/* Content Input */}
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        className="mt-1 block w-full h-64 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                        placeholder="Write your note here..."
                                    ></textarea>
                                    {errors.content && (
                                        <p className="text-red-500 text-xs mt-1">{errors.content}</p>
                                    )}
                                </div>

                                {/* Speech Recognition Buttons */}
                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={startListening}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                                        disabled={isListening}
                                    >
                                        Start Listening
                                    </button>
                                    <button
                                        type="button"
                                        onClick={stopListening}
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:opacity-50"
                                        disabled={!isListening}
                                    >
                                        Stop Listening
                                    </button>
                                </div>

                                <p className="text-gray-500">
                                    {interimTranscript && (
                                        <>
                                            <strong>Interim: </strong>{interimTranscript}
                                        </>
                                    )}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
