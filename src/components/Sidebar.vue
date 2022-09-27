<template>
    <div class="sidebar">
        <div class="sidebar__nav-group">
            <div class="sidebar__nav-group__title">Channels</div>
            <div class="sidebar__nav-group__nav">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
    background-color: #FFFFFF;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.15);
    width: 250px;
    height: calc(100vh - 56px);
    padding-top: 1rem;

    &__nav-group {
        &__title {
            color: rgba(0, 0, 0, 0.5);
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 0 1rem;
        }

        &__nav {
            display: flex;
            flex-direction: column;

            a {
                padding: .5rem 1rem;
            }
        }
    }
}
</style>