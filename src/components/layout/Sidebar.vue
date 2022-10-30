<template>
    <div class="sidebar" :class="{'sidebar--collapsed': collapsed}">
        <div class="sidebar__nav">
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">General</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/" class="nav-item">
                        <i class="bi bi-house nav-item__icon"></i>
                        <span class="nav-item__label">Home</span>
                    </RouterLink>
                    <RouterLink to="/about" class="nav-item">
                        <i class="bi bi-question-circle nav-item__icon"></i>
                        <span class="nav-item__label">About</span>
                    </RouterLink>
                </div>
            </div>
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">Download</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/" class="nav-item">
                        <i class="bi bi-camera-video nav-item__icon"></i>
                        <span class="nav-item__label">VODs</span>
                    </RouterLink>
                    <RouterLink to="/about" class="nav-item">
                        <i class="bi bi-chat-right-text nav-item__icon"></i>
                        <span class="nav-item__label">Chat</span>
                    </RouterLink>
                </div>
            </div>
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">Real-Time Tools</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/better-chat" class="nav-item">
                        <i class="bi bi-soundwave nav-item__icon"></i>
                        <span class="nav-item__label">Better Chat</span>
                    </RouterLink>
                    <RouterLink to="/about" class="nav-item">
                        <i class="bi bi-graph-up nav-item__icon"></i>
                        <span class="nav-item__label">Stream Insights</span>
                        <div class="sidebar__subnav">
                            <RouterLink to="/" class="nav-item">
                                <i class="bi bi-soundwave nav-item__icon"></i>
                                <span class="nav-item__label">Chat Interaction</span>
                            </RouterLink>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">Analysis</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/" class="nav-item">
                        <i class="bi bi-soundwave nav-item__icon"></i>
                        <span class="nav-item__label">Chat Interaction</span>
                    </RouterLink>
                    <RouterLink to="/about" class="nav-item">
                        <i class="bi bi-graph-up nav-item__icon"></i>
                        <span class="nav-item__label">Overall Stats</span>
                        <div class="sidebar__subnav">
                            <RouterLink to="/?" class="nav-item">
                                <i class="bi bi-soundwave nav-item__icon"></i>
                                <span class="nav-item__label">Chat Interaction</span>
                            </RouterLink>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">Creator Tools</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/" class="nav-item">
                        <i class="bi bi-funnel nav-item__icon"></i>
                        <span class="nav-item__label">Chat Pre-Render Filter</span>
                    </RouterLink>
                    <RouterLink to="/about" class="nav-item">
                        <i class="bi bi-save nav-item__icon"></i>
                        <span class="nav-item__label">VOD Chat Downloader</span>
                    </RouterLink>
                </div>
            </div>
            <div class="sidebar__nav-group">
                <div class="sidebar__nav-group__title">Fun</div>
                <div class="sidebar__nav-group__nav">
                    <RouterLink to="/wordle" class="nav-item">
                        <i class="bi bi-pen nav-item__icon"></i>
                        <span class="nav-item__label">Wordle</span>
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="sidebar__collapse-toggle"><i class="bi bi-arrow-bar-left" @click="toggleCollapse()"></i></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            collapsed: false
        }
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed
            localStorage.setItem('sidebarCollapsed', this.collapsed ? 'true' : 'false')
        }
    },
    mounted() {
        const storedSidebarCollapsedState = localStorage.getItem('sidebarCollapsed');
        if (storedSidebarCollapsedState && storedSidebarCollapsedState == 'true') {
            this.collapsed = true;
        }
        console.log(storedSidebarCollapsedState);
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    background-color: #FFFFFF;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.15);
    //box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    padding: 2rem 0 1rem 0;
    transition: width .5s, padding .5s;
    width: 250px;

    &--collapsed {
        padding: 1rem 0;
        width: 56px;
    }

    &--collapsed & {
        &__collapse-toggle {
            i:before {
                transform: rotate(180deg) !important;
            }
        }

        &__nav {
            gap: 0;
        }

        &__nav-group {
            &__title {
                height: 0;
            }

            &__nav {
                .nav-item {
                    &__label {
                        color: transparent;
                    }
                }
            }
        }
    }

    &__collapse-toggle {
        display: flex;
        justify-content: flex-end;
        padding: 0 1rem;
        margin-top: 1rem;

        i {
            cursor: pointer;
        }
    }

    &__nav {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        top: 2rem;
        transition: gap .25s;
    }

    &__subnav {
        background-color: #FFFFFF;

        left: 250px;
        transition: width .25s ease-in-out;
    }

    &__nav-group {
        &__title {
            color: rgba(0, 0, 0, 0.5);
            font-size: 12px;
            font-weight: 700;
            height: 12px;
            text-transform: uppercase;
            transition: height .25s;
            overflow: hidden;
            margin-bottom: .75rem;
            padding: 0 1rem;
        }

        &__nav {
            display: flex;
            flex-direction: column;

            .nav-item {
                display: block;
                padding: .75rem 1rem;
                white-space: nowrap;
                font-size: 14px;
                position: relative;
                transition: background-color .25s ease-in-out;

                .sidebar__subnav {
                    display: none;
                    margin: 1rem -1rem -.75rem -1rem;
                    .nav-item{
                        padding: .75rem 1rem .75rem 2rem;
                    }
                }

                &:has(.router-link-active) {
                    .sidebar__subnav {
                        display: block;
                    }
                }


                &:hover,
                &.router-link-active {
                    background-color: rgba(0, 0, 0, 0.05);
                }
                
                &.router-link-active {
                    .sidebar__subnav{
                        display: block;
                    }
                }

                &__label {
                    transition: color .25s ease-in-out;
                }

                &__icon {
                    font-size: 16px;
                    display: inline-block;
                    margin-right: 1rem;
                    text-align: center;
                    width: 1.5rem;
                }
            }
        }
    }
}
</style>