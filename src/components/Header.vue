<template>
    <div class="header">
        <div class="header__brand">JustChatting.io</div>
        <div class="header__nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
    </div>
</template>

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