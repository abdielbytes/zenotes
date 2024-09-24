<script setup>
import { usePage, useForm, Head } from '@inertiajs/vue3'; // Ensure all necessary imports are included
import AppLayout from '@/Layouts/AppLayout.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';
import { ref, onMounted } from 'vue';

// Get the note from props
const { props } = usePage();
const note = props.note;

// Initialize form data with existing note title and content
const form = useForm({
    title: note.title || '', // Prefill with existing title or empty
    note: note.content || '', // Prefill with existing content or empty
});

// Speech recognition setup
const recognition = ref(null);
const recognitionStarted = ref(false);
const loaderVisible = ref(false);
const error = ref('');
const finalText = ref('');
const interimText = ref('');

// Handle recognition results
const handleRecognitionResult = (e) => {
    interimText.value = '';
    Array.from(e.results).forEach((result) => {
        if (result.isFinal) {
            finalText.value += result[0].transcript;
            console.log('Final transcript:', finalText.value);
        } else {
            interimText.value += result[0].transcript;
            console.log('Interim transcript:', interimText.value);
        }
    });
    form.content = finalText.value; // Update the note with final text
    finalText.value = ''; // Reset final text after using it
};

// Start speech recognition
const startRecognition = () => {
    if (!recognitionStarted.value && recognition.value) {
        recognition.value.start();
        recognitionStarted.value = true;
        loaderVisible.value = true;
        error.value = '';
        console.log('Speech recognition started');
    }
};

// Stop speech recognition
const stopRecognition = () => {
    if (recognitionStarted.value && recognition.value) {
        recognition.value.stop();
        recognitionStarted.value = false;
        loaderVisible.value = false;
        console.log('Speech recognition stopped');
    }
};

const submitForm = () => {
    form.put(route('notes.update', note.id), {
        onSuccess: () => form.reset(),
    });
};

// Setup speech recognition on component mount
onMounted(() => {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (window.SpeechRecognition) {
        recognition.value = new SpeechRecognition();
        recognition.value.interimResults = true;
        recognition.value.continuous = true;

        recognition.value.addEventListener('result', (e) => {
            handleRecognitionResult(e);
        });

        recognition.value.addEventListener('end', () => {
            if (recognition.value.continuous && recognitionStarted.value) {
                recognition.value.start();
            }
        });

        recognition.value.addEventListener('error', (e) => {
            error.value = 'Speech recognition error: ' + e.error;
            console.error('Speech recognition error:', e.error);
            recognitionStarted.value = false;
            loaderVisible.value = false;
        });
    } else {
        error.value = 'SpeechRecognition not supported by this browser.';
        console.error('SpeechRecognition not supported by this browser.');
    }
});
</script>

<template>
    <Head title="Edit Note"/>

    <AppLayout title="Edit Note">
        <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">

            <!-- Buttons to start and stop transcription -->
            <div class="flex justify-between mb-4">
                <button @click="startRecognition" :disabled="recognitionStarted"
                        class="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Start Transcription
                </button>
                <button @click="stopRecognition" :disabled="!recognitionStarted"
                        class="bg-red-500 text-white px-4 py-2 rounded-md">
                    Stop Transcription
                </button>
            </div>

            <!-- Loader and error message -->
            <div v-if="loaderVisible" class="mb-4 text-indigo-600">Listening...</div>
            <p v-if="error" class="text-red-600">{{ error }}</p>

            <!-- Form for editing the note -->
            <form @submit.prevent="form.put(route('notes.update', note.id), { onSuccess: () => form.reset() })">
                <div class="relative mb-4">
                    <input
                        v-model="form.title"
                        placeholder="Note Title"
                        class="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm p-2 mb-4 text-lg"
                        type="text"
                    />
                    <InputError :message="form.errors.title" class="mt-2"/>
                </div>
                <div class="relative">
                    <textarea
                        v-model="form.content"
                        placeholder="Your note goes here"
                        class="block w-[21cm] h-[29.7cm] border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm resize-none overflow-auto p-4"
                        style="min-width: 21cm; min-height: 29.7cm;"
                    ></textarea>
                    <InputError :message="form.errors.content" class="mt-2"/>
                </div>
                <PrimaryButton class="mt-4">Save</PrimaryButton>
            </form>
        </div>
    </AppLayout>
</template>

<style scoped>
textarea {
    box-sizing: border-box;
}

input {
    border: 1px solid #d1d5db;
    padding: 10px;
    font-size: 16px;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
}
</style>
