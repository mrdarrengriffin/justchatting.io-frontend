<template>
    <div class="header">
        <div class="header__brand">JustChatting.io</div>
        <div class="header__nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
        <div class="header__toggles">
            <div class="header__toggle" @click="toggleDarkMode()">
                <i class="bi bi-moon-stars" v-if="darkMode"></i>
                <i class="bi bi-sun" v-if="!darkMode"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return { 
            darkMode: false
        }
    },
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    background-color: #FFFFFF;
    box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.15);
    display: flex;
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