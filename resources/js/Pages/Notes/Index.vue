<script setup>
import { ref, defineProps } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

// Props
const props = defineProps(['notes']);

// States for dropdowns
const showingNavigationDropdown = ref(false);
const showingProfileDropdown = ref(false);

// Function to switch team
const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

// Logout function
const logout = () => {
    router.post(route('logout'));
};

// Date formatting function
const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Adjust format as necessary
};

</script>

<template>
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div class="google-doc-nav bg-white dark:bg-gray-900">
            <div class="divo">
                <div class="menu-toggle" id="menu-toggle">
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>

                <img src="/images/logo.webp" class="logoimg" alt="Google Docs Logo">
            </div>
            <input type="text" class="search-input" placeholder="Search...">
            <div @click="showingProfileDropdown = !showingProfileDropdown" class="relative">
                <img src="https://via.placeholder.com/40" alt="User Profile Picture" class="profile-picture">
                <Dropdown v-if="showingProfileDropdown" align="right" width="48">
                    <template #trigger>
                        <button class="flex items-center">
                            <img :src="$page.props.auth.user.profile_photo_url" :alt="$page.props.auth.user.name" class="h-8 w-8 rounded-full object-cover">
                        </button>
                    </template>
                    <template #content>
                        <div class="block px-4 py-2 text-xs text-gray-400">Manage Account</div>
                        <DropdownLink :href="route('profile.show')">Profile</DropdownLink>
                        <div class="border-t border-gray-200 dark:border-gray-600"></div>
                        <form @submit.prevent="logout">
                            <DropdownLink as="button">Log Out</DropdownLink>
                        </form>
                    </template>
                </Dropdown>
            </div>
        </div>

        <!-- Page Content -->
        <h1 class="text-2xl font-bold mb-6">Notes</h1>

        <!-- Notes List -->
        <div class="bg-white shadow-sm sm:rounded-lg w-1/2 mx-auto">
            <!-- Create Note Link -->
            <div class="flex justify-end p-4">
                <Link :href="route('notes.create')" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                    Create Note
                </Link>
            </div>

            <ul>
                <li v-if="props.notes.data.length === 0" class="text-center text-gray-500">No notes available.</li>
                <li v-for="note in props.notes.data" :key="note.id" class="flex justify-between items-center border-b py-4 px-6">
                    <Link :href="route('notes.show', note.id)" class="flex-1">
                        <!-- Note Title -->
                        <div class="text-lg font-medium text-gray-900">
                            {{ note.title }}
                        </div>
                    </Link>
                    <!-- Creation Date -->
                    <div class="text-gray-500">
                        {{ formatDate(note.created_at) }}
                    </div>
                </li>
            </ul>
        </div>


        <!-- Pagination Controls -->
        <div class="flex justify-between mt-4">
            <button
                v-if="props.notes.current_page > 1"
                @click="router.get(route('notes.index', { page: props.notes.current_page - 1 }))"
                class="bg-blue-500 text-white px-4 py-2 rounded">
                Previous
            </button>
            <span>Page {{ props.notes.current_page }} of {{ props.notes.last_page }}</span>
            <button
                v-if="props.notes.current_page < props.notes.last_page"
                @click="router.get(route('notes.index', { page: props.notes.current_page + 1 }))"
                class="bg-blue-500 text-white px-4 py-2 rounded">
                Next
            </button>
        </div>
    </div>
</template>

<style scoped>
.google-doc-nav {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    justify-content: space-between;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.menu-toggle {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    margin-right: 20px;
    width: 20px;
}

.bar {
    height: 3px;
    max-width: 50px;
    background-color: #333;
    margin: 4px 0;
    transition: 0.3s;
}

.divo {
    display: flex;
    align-items: center;
}

.logoimg {
    width: 50px;
    height: 50px;
}

.search-input {
    flex: 1;
    margin: 0 20px;
    padding: 5px;
    max-width: 800px;
    border: 1px solid #ccc;
    border-radius: 20px;
}

.profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

/* Responsive adjustments */
@media (max-width: 640px) {
    .google-doc-nav {
        flex-direction: column;
        align-items: flex-start;
    }

    .search-input {
        max-width: 100%;
        margin-top: 10px;
    }
}

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
