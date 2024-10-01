<template>
    <div class="bg-black h-full text-white">
        <!-- Navigation Bar -->
        <nav class="bg-gray-900 p-4 flex justify-between items-center">
            <div class="text-xl font-bold">Zenotes</div>
            <nav v-if="canLogin" class="-mx-3 flex flex-1 justify-end">
                <Link
                    v-if="auth.user"
                    :href="route('dashboard')"
                    class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                    Dashboard
                </Link>

                <template v-else>
                    <Link
                        :href="route('login')"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Log in
                    </Link>

                    <Link
                        v-if="canRegister"
                        :href="route('register')"
                        class="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                        Register
                    </Link>
                </template>
            </nav>
        </nav>

        <!-- Header Section -->
        <header class="text-center py-8">
            <h1 class="text-4xl font-bold">Welcome to Zenotes!</h1>
            <p class="text-lg mt-2">Your Ultimate Classroom Companion</p>
        </header>

        <!-- Main Content -->
        <div class="main-content flex flex-col items-center text-center px-4 py-8">
            <!-- Features Container -->
            <div class="features-container flex flex-wrap justify-center">
                <!-- Feature Item -->
                <section
                    v-for="feature in features"
                    :key="feature.title"
                    class="feature bg-white text-black rounded-lg shadow-lg p-6 m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform transform hover:-translate-y-2"
                >
                    <h2 class="text-2xl font-semibold">{{ feature.title }}</h2>
                    <p class="mt-2">{{ feature.description }}</p>
                </section>
            </div>

            <!-- Get Started Button -->
            <button
                @click="navigateToSignUp"
                class="btn-start bg-blue-600 text-white py-3 px-6 rounded-md mt-6 hover:bg-blue-500 transition-colors"
            >
                Get Started
            </button>
        </div>

        <!-- Footer -->
        <footer class="bg-gray-900 text-center p-4">
            <p class="text-sm">&copy; 2024 Zenotes. All rights reserved.</p>
        </footer>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Link } from '@inertiajs/inertia-vue3';

export default {
    components: {
        Link,
    },
    setup() {
        const canLogin = ref(true); // Set this based on your authentication logic
        const canRegister = ref(false); // Adjust this as needed
        const auth = ref({});
        const features = ref([
            {
                title: 'Record Lectures & Take Live Notes',
                description: 'Capture audio recordings of lectures and automatically transcribe them into notes in real-time.',
            },
            {
                title: 'Write and Edit Notes',
                description: 'Write down your thoughts, edit existing notes, and keep everything organized in one place.',
            },
            {
                title: 'Share Notes Instantly',
                description: 'Share your notes with classmates or friends easily. Collaboration has never been this smooth!',
            },
            {
                title: 'Add Pictures to Your Notes',
                description: 'Make your notes more engaging by adding pictures. Capture diagrams, slides, or anything important.',
            },
        ]);

        onMounted(() => {
            // Access authentication state from Inertia props
            auth.value = window.$page.props.auth;
            canLogin.value = window.$page.props.canLogin; // Set this to true or false based on your authentication logic
            canRegister.value = window.$page.props.canRegister; // Adjust this as needed
        });

        const navigateToSignUp = () => {
            window.location.href = route('register');
        };

        const route = (name) => {
            return `/${name}`;
        };

        return {
            canLogin,
            canRegister,
            auth,
            features,
            navigateToSignUp,
            route,
        };
    },
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
