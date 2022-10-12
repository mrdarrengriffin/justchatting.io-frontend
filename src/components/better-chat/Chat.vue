<template>
    <div class="chat" :class="[{'paused': pauseScroll}]">
        <div class="chat__resume" @click="scrollToView();pauseScroll = false">Chat paused due to scroll. Click to resume
        </div>
        <button @click="clear()">Clear</button>
        <div class="messages">
            <Message v-for="message in messages" :key="message" :channel="message.channel" :message="message.message"
                :tags="message.tags" :badges="message.badges" />
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import Message from "./Message.vue";
import * as emoteParser from 'tmi-emote-parse';

export default {
    props: ['targetStreamer'],
    data() {
        return {
            messages: [],
            streamer: '',
            pauseScroll: false
        };
    },
    watch: {
        // On streamer changed event, clear the chat, set the streamer and connect to the chat
        targetStreamer(newStreamer, oldStreamer) {
            this.clear();
            console.log(newStreamer, oldStreamer);
            this.changeStreamer(newStreamer);
        }
    },
    mounted() {
        // Register emote parser
        emoteParser.setTwitchCredentials(import.meta.env.VITE_TWITCH_CLIENT_ID, import.meta.env.VITE_TWITCH_CLIENT_OAUTH);

        this.$socket.connect();
        this.messages = [];
        
        if (!this.targetStreamer) {
            return;
        }
        console.log(this.$route.params.streamer);
        //console.log(this.$route.params);
        this.changeStreamer(this.$route.params.streamer);

        document.querySelector('.messages').addEventListener('wheel', this.pauseScrolling);
    },
    beforeUnmount() {
        this.$socket.disconnect();
    },
    sockets: {
        chatMessage: function (message: any) {
            // Replace any emotes
            message.message = emoteParser.replaceEmotes(message.message, message.tags, message.channel);
            console.log(emoteParser.getBadges(message.tags, message.channel));
            this.messages.push(
                {
                    badges: emoteParser.getBadges(message.tags, message.channel),
                    message: message.message,
                    tags: message.tags,
                    channel: message.channel
                }
            );
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
        resumeScroll() {
            this.scrollToView();
        },
        pauseScrolling() {
            //console.log((document.querySelector('.messages').scrollTop - (document.querySelector('.messages').scrollHeight - document.querySelector('.messages').offsetHeight)));
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
            this.streamer = streamer;
            //this.getChannelEmotes(streamer);
            emoteParser.setDebug(true);
            emoteParser.events.on("error", e => {
                console.log("Error:", e);
            })

            emoteParser.loadAssets(streamer);
        },
        getMessages() {
            return this.messages;
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
        margin: 0 0 0 .5rem;
        overflow-y: auto;
        position: relative;
    }

    &.paused & {
        &__resume {
            left: 1rem;
            opacity: 1;
        }
    }

    &__resume {
        background-color: rgba(0, 0, 0, 0.75);
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