<template>
    <Chat :targetStreamer="streamer" :clearBtn="false" :alwaysScroll="true" :messageLimit="messageLimit"
        :scrollbar="false" :messageExpiry="messageExpiry" />
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
        document.body.style.backgroundColor = 'transparent';
        if (this.$route.params.streamer) {
            this.setStreamer(this.$route.params.streamer);
        }

        const queryArgs = new URL(window.location);

        var messageLimitQuery = queryArgs.searchParams.get('messageLimit')
        if (messageLimitQuery) {
            this.messageLimit = messageLimitQuery;

            // Maximum is 100
            if (this.messageLimit > 100) {
                this.messageLimit = 100;
            }
        }
        var messageExpiryQuery = queryArgs.searchParams.get('messageExpiry')
        if (messageExpiryQuery) {
            this.messageExpiry = messageExpiryQuery;

            // Maximum is 100
            if (this.messageExpiry > 100) {
                this.messageExpiry = 100;
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
<style lang="scss" scoped>
.router-wrapper {
    align-items: flex-end;
}

.chat :deep {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
    overflow: hidden;
    width: 100%;

    .message {
        text-shadow: -1px -1px 1px #000, 1px -1px 1px #000, 1px 1px 1px #000, -1px 1px 1px #000;
        font-weight: 600;

        &__text {
            color: #ffffff;
        }
    }

}
</style>
