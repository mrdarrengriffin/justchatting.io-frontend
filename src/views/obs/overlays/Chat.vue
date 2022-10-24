<template>
    <Chat :targetStreamer="streamer" :clearBtn="false" :alwaysScroll="true" :messageLimit="messageLimit" />
</template>
<script>
export default {
    data() {
        return {
            streamer: null,
            messageLimit: 25
        }
    },
    mounted() {
        if (this.$route.params.streamer) {
            this.setStreamer(this.$route.params.streamer);
        }

        const queryArgs = new URL(window.location);

        var messageLimitQuery = queryArgs.searchParams.get('messageLimit')
        if(messageLimitQuery){
            this.messageLimit = messageLimitQuery;

            // Maximum is 100
            if(this.messageLimit > 100){
                this.messageLimit = 100;
            }
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
body {
    background: transparent !important;
}

.router-wrapper{
    align-items: flex-end;
}

.banner,
.sidebar,
.header {
    display: none !important;
}

.better-chat {
    display: flex;
    flex-grow: 1;
    overflow: hidden;

}

.messages {
    overflow: hidden !important;
}

.message {
    text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000;
    font-weight: 600;

    &__text {
        color: #ffffff;
    }
}

.chat-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    flex-grow: 1;
}
</style>
