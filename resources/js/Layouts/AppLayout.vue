<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';

const showingNavigationDropdown = ref(false);
const showingProfileDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
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

                <img src="/images/logo.webp" class="logoimg"
                     alt="Google Docs Logo">
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
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<style>
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

nav {
    display: none;
    background-color: #333;
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 100%;
    padding-top: 50px;
    z-index: 0;
}

nav ul {
    list-style: none;
    padding: 0;
}

nav li {
    padding: 15px;
}

nav a {
    color: white;
    text-decoration: none;
}

nav.show {
    display: block;
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
</style>
