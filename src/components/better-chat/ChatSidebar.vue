<template>
    <div class="chat-sidebar">
        <div class="chat-sidebar__nav">
            <RouterLink @click="$emit('changeStreamer', streamer)" :to="{name: 'better-chat-streamer', params: {streamer: streamer}}" class="nav-item" v-for="streamer in streamers" :key="streamer">
                <span class="nav-item__label">{{ streamer }}</span>
            </RouterLink>
            <div class="nav-item" @click="addStreamer()">Add streamer</div>

        </div>
    </div>
</template>

<script lang="ts">


export default {
    emits: ['changeStreamer'],
    data() {
        return {
            streamers: [],
        };
    },
    mounted() {
    },
    beforeUnmount() {
    },
    methods: {
        addStreamer(){
            const streamer = prompt('Enter the username of the streamer (case sensitive)');
            this.streamers.push(streamer);
            this.$router.push({name: 'better-chat-streamer', params: {streamer: streamer}});
            this.$emit('changeStreamer', streamer);
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-sidebar {
    background-color: #FFFFFF;
    &__nav{
        display: flex;
        flex-direction: column;

        .nav-item{
            padding: .5rem 1rem;

            &.router-link-active{
                background-color: rgba(0, 0, 0, 0.05);
            }
        }
    }
}
</style>