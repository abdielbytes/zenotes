<script setup>
import {usePage} from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import {Link} from '@inertiajs/vue3';

// Get note data from the Inertia response
const {props} = usePage();
const note = props.note;

console.log('Props:', props);
console.log('Note:', note);
</script>

<template>
    <Head title="View Note"/>

    <AppLayout title="View Note">
        <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 class="text-2xl font-bold mb-4">{{ note.title || 'Untitled Note' }}</h1>
            <p class="text-gray-700 mb-4">{{ note.content }}</p>

            <div class="flex justify-between mt-6">
                <Link :href="route('notes.edit', note.id)" class="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Edit Note
                </Link>
                <Link :href="route('notes.index')" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
                    Back to Notes
                </Link>
            </div>
        </div>
    </AppLayout>
</template>

<style scoped>
h1 {
    text-align: left;
    margin-bottom: 20px;
}
</style>
