import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Toolbar from '@/Components/Toolbar';

export default function CreateNote() {
    const { data, setData, post, processing, errors } = useForm({
        title: 'Untitled Document',
        content: '',
    });

    const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [finalTranscript, setFinalTranscript] = useState('');

    // Helper function to process voice input
    const processText = (text) => {
        text = text.trim();
        text = text.replace(/\b(period)\b/gi, '.');
        text = text.replace(/\b(comma)\b/gi, ',');
        text = text.replace(/\b(new paragraph)\b/gi, '\n\n');
        text = text.replace(/(^\w{1}|\.\s*\w{1}|\n\n\s*\w{1})/gi, (char) => char.toUpperCase());

        return text;
    };

    useEffect(() => {
        // Check for SpeechRecognition API
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (window.SpeechRecognition) {
            const speechRecognition = new window.SpeechRecognition();
            speechRecognition.interimResults = true;
            speechRecognition.continuous = true;

            // Event listener for speech recognition results
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

            // Restart speech recognition when it stops
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

    // Start/Stop Listening Functions
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

    // Submit the form data
    const submit = (e) => {
        e.preventDefault();
        post(route('notes.store')); // Post the data to store route
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            {/* Toolbar */}
            <Toolbar title={data.title} setTitle={(title) => setData('title', title)} />


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


            {/* Content Area */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
                <form onSubmit={submit} className="p-6 space-y-6">
                    {/* A4 Styled Content Area */}
                    <div className="flex justify-center">
                        <div className="bg-white shadow-lg p-10 w-[210mm] h-[297mm] border border-gray-300 overflow-auto">
                            <textarea
                                id="content"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full h-full border-none outline-none resize-none text-black"
                                placeholder="Write your note here..."
                                style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.5' }}
                            />
                        </div>
                    </div>

                    {/* Display validation errors */}
                    {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}


                    {/* Show the interim transcript */}
                    <p className="text-gray-500 mt-4">
                        {interimTranscript && (
                            <>
                                <strong>Interim: </strong>
                                {interimTranscript}
                            </>
                        )}
                    </p>
                </form>
            </div>
        </div>
    );
}
