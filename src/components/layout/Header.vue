<template>
    <div class="header">
        <div class="header__brand">JustChatting.io</div>
        <div class="header__toggles">
            <div class="header__toggle" @click="toggleDarkMode()">
                <i class="bi bi-moon-stars" v-if="darkMode"></i>
                <i class="bi bi-sun" v-if="!darkMode"></i>
            </div>
        </div>
        <div class="header__nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
        <div class="header__nav header__nav--auth">
            <RouterLink to="/logout" v-if="token" @click="logout()">Logout</RouterLink>
            <RouterLink to="/login" v-if="!token">Login</RouterLink>
            <RouterLink to="/register" v-if="!token">Register</RouterLink>    
        </div>
    </div>
</template>

<script>
    import { useAuthStore } from '@/stores/auth';
    import { storeToRefs } from 'pinia';
export default {
    data(){
        return { 
            darkMode: false,
        }
    },
    setup(){
        const authStore = useAuthStore();
        const { token, getUserInfo } = storeToRefs(authStore);
        return {
            token,
            getUserInfo
        }
    },
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
        },
        logout(){
            const authStore = useAuthStore();
            authStore.logout();
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    background-color: #FFFFFF;
    box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.15);
    display: flex;
    flex-shrink: 0;
    height: 56px;
    position: relative;

    &__brand {
        align-items: center;
        display: flex;
        padding: 0 1rem;
        flex-grow: 1;
    }

    &__toggles {
        display: flex;
    }

    &__toggles & {
        &__toggle {
            align-items: center;
            cursor: pointer;
            display: flex;
            padding: 0 1rem;
            height: 100%;
        }
    }

    &__nav {
        display: flex;

        a {
            align-items: center;
            display: flex;
            padding: 0 1rem;
            height: 100%;
        }

    }
}
</style>