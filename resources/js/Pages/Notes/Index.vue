<script setup>
import AppLayout from '@/Layouts/AppLayout.vue';
import {ref} from 'vue';
import {usePage} from '@inertiajs/vue3';

// Get notes from the Inertia response
const {props} = usePage();
const notes = ref(props.notes);

// Format the date to a more readable format
const formatDate = (dateString) => {
    const options = {year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'};
    return new Date(dateString).toLocaleDateString(undefined, options);
};
</script>

<template>
    <Head title="All Notes" />

    <AppLayout title="All Notes">
        <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 class="text-2xl font-bold mb-6">Notes</h1>

            <!-- Notes List -->
            <div class="bg-white shadow-sm sm:rounded-lg">
                <ul>
                    <li v-for="note in notes.data" :key="note.id" class="flex justify-between items-center border-b py-4 px-6">
                        <!-- Note Title -->
                        <div class="text-lg font-medium text-gray-900">
                            {{ note.title || 'Untitled Note' }}
                        </div>

                        <!-- Creation Date -->
                        <div class="text-gray-500">
                            {{ formatDate(note.created_at) }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </AppLayout>
</template>


<style scoped>
/* Styling to enhance the layout */
ul {
    list-style-type: none;
    padding: 0;
}

li {
    border-bottom: 1px solid #e5e7eb;
}

li:last-child {
    border-bottom: none;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}
</style>
