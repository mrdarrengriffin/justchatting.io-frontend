<template>
    <Chat :targetStreamer="streamer" :clearBtn="false" :alwaysScroll="true" />
</template>
<script>
export default {
    data() {
        return {
            streamer: null
        }
    },
    mounted() {
        if (this.$route.params.streamer) {
            this.setStreamer(this.$route.params.streamer);
        }
    },
    methods: {
        setStreamer(streamer) {
            this.streamer = streamer;
        }
    }
}
</script>
<style lang="scss">
body{
    background: transparent !important;
}
.sidebar,
.header {
    display: none !important;
}

.better-chat {
    display: flex;
    flex-grow: 1;
    overflow: hidden;

}

.message{
    text-shadow: 0 0 1px #000, 0 0 2px #000
}

.chat-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    flex-grow: 1;
}
</style>
