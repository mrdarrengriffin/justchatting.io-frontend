<template>
    <Alert />
    <div class="song-request">
        <Playlist />
    </div>
</template>
<script>
    export default {
    data() {
        return {
            streamer: null
        };
    },
    methods: {
        setStreamer(streamer) {
            this.streamer = streamer;
        }
    }
}
</script>
<style lang="scss">
    .song-request{
        display: flex;
        flex-grow: 1;

    }
    
</style>
