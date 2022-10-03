<template>
    <div class="chat" :class="[{'paused': pauseScroll}]">
        <div class="chat__resume" @click="scrollToView();pauseScroll = false">Chat paused due to scroll. Click to resume</div>
        <button @click="clear()">Clear</button>
        <div class="messages">
            <Message v-for="message in messages" :key="message.id" :channel="message.channel" :message="message.message"
                :tags="message.tags" />
        </div>
    </div>
</template>

<script lang="ts">
import Message from "./Message.vue";

export default {
    props: ['streamer'],
    data() {
        return {
            messages: [],
            pauseScroll: false
        };
    },
    watch: {
        streamer(newStreamer, oldStreamer) {
            this.clear();
            this.changeStreamer(newStreamer);
        }
    },
    mounted() {
        this.$socket.connect();
        this.messages = [];
        // If no streamer provided in route, don't listen for messages
        if (!this.$route.params.streamer) {
            return;
        }
        this.changeStreamer(this.$route.params.streamer);

        document.querySelector('.messages').addEventListener('wheel', this.pauseScrolling);

    },
    beforeUnmount() {
        this.$socket.disconnect();
    },
    sockets: {
        chatMessage: function (message) {
            this.messages.push(message);
            this.pauseScrolling();
            // Keep only the last 100 messages
            if (!this.pauseScroll) {
                this.messages = this.messages.slice(-100);
            }
            if (!this.pauseScroll) {
                this.scrollToView();
            }
        }
    },
    methods: {
        clear() {
            this.messages = [];
        },
        resumeScroll(){
            scrollToView();
        },
        pauseScrolling() {
            console.log((document.querySelector('.messages').scrollTop - (document.querySelector('.messages').scrollHeight - document.querySelector('.messages').offsetHeight)));
            if ((document.querySelector('.messages').scrollTop - (document.querySelector('.messages').scrollHeight - document.querySelector('.messages').offsetHeight)) < -100) {
                this.pauseScroll = true;
            } else {
                this.pauseScroll = false;

            }
        },
        scrollToView() {
            document.querySelector('.messages').scrollTo({ top: document.querySelector('.messages').scrollHeight });
        },
        changeStreamer(streamer) {
            this.$socket.emit('join', streamer);
        },
        getMessages() {
            return this.messages;
        },
        addMessage(data) {
        }
    },
    components: { Message }
}
</script>

<style lang="scss" scoped>
.chat {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    .messages {
        line-height: 24px;
        overflow-y: auto;
        position: relative;
    }

    &.paused &{
        &__resume{
            left: 1rem;
            opacity: 1;
        }
    }
    
    &__resume {
        background-color: rgba(0,0,0,0.75);
        border-radius: 4px;
        bottom: 1rem;
        color: #ffffff;
        cursor: pointer;
        font-size: 14px;
        left: 0;
        opacity: 0;
        padding: .5rem 1rem;
        position: absolute;
        transition: opacity .5s, left .5s;
        z-index: 1;
    }
}
</style>