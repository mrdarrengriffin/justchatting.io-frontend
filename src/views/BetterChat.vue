<template>
    <Alert />
    <div class="better-chat">
        <ChatSidebar @changeStreamer="setStreamer" ref="chatSidebar" />
        <div class="chat-wrapper">
            <Chat :targetStreamer="streamer" />
        </div>
    </div>
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
            this.$refs.chatSidebar.addStreamer(this.$route.params.streamer);
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
.better-chat {
    display: flex;
    flex-grow: 1;

}

.chat-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    flex-grow: 1;
}
</style>
