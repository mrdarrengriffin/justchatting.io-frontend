<template>
    <div class="chat" :class="[{'paused': pauseScroll}]">
        <div class="chat__resume" @click="scrollToView();pauseScroll = false">Chat paused due to scroll. Click to resume
        </div>
        <button @click="clear()">Clear</button>
        <div class="messages">
            <Message v-for="message in messages" :key="message.id" :channel="message.channel" :message="message.message"
                :tags="message.tags" />
        </div>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import Message from "./Message.vue";

export default {
    props: ['streamer'],
    data() {
        return {
            messages: [],
            streamer: '',
            emotes: {
                global: {},
                channel: {},
                matches: []
            },
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
        // Reset emotes
        this.emotes.global = {};
        this.emotes.channel = {};
        this.emotes.matches = [];

        this.$socket.connect();
        this.messages = [];
        // If no streamer provided in route, don't listen for messages
        if (!this.$route.params.streamer) {
            return;
        }
        this.changeStreamer(this.$route.params.streamer);

        document.querySelector('.messages').addEventListener('wheel', this.pauseScrolling);

        this.getGlobalEmotes();

    },
    beforeUnmount() {
        this.$socket.disconnect();
    },
    sockets: {
        chatMessage: function (message) {
            // Replace any emotes
            message = this.injectEmoteIntoMessage(message);

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
        resumeScroll() {
            scrollToView();
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
            this.getChannelEmotes(streamer);
        },
        getMessages() {
            return this.messages;
        },
        injectEmoteIntoMessage(message) {
            // Split words and see if any match any emotes
            let words = message.message.split(' ');
            words.forEach(word => {
                if (this.emotes.matches.includes(word)) {
                    // Channel emotes
                    const channelEmote = this.emotes.channel.filter(emote => { return emote.code == word && emote.provider == 0 })
                    if(channelEmote && channelEmote.length > 0 && channelEmote[0].urls){
                        message.message = message.message.replace(word, `<img class="emote" src="${channelEmote[0].urls[channelEmote[0].urls.length - 1]['url']}" />`);
                        return;
                    }

                    // 7TV
                    const seventvEmote = this.emotes.channel.filter(emote => { return emote.code == word && emote.provider == 1 })
                    if(seventvEmote && seventvEmote.length > 0 && seventvEmote[0].urls){
                        message.message = message.message.replace(word, `<img class="emote" src="${seventvEmote[0].urls[seventvEmote[0].urls.length - 1]['url']}" />`);
                        return;
                    }

                    // BetterTTV
                    const betterTTVEmote = this.emotes.channel.filter(emote => { return emote.code == word && emote.provider == 2 })
                    if(betterTTVEmote && betterTTVEmote.length > 0 && betterTTVEmote[0].urls){
                        message.message = message.message.replace(word, `<img class="emote" src="${betterTTVEmote[0].urls[betterTTVEmote[0].urls.length - 1]['url']}" />`);
                        return;
                    }

                    // FFZ
                    const ffzEmote = this.emotes.channel.filter(emote => { return emote.code == word && emote.provider == 3 })
                    if(ffzEmote && ffzEmote.length > 0 && ffzEmote[0].urls){
                        message.message = message.message.replace(word, `<img class="emote" src="${ffzEmote[0].urls[ffzEmote[0].urls.length - 1]['url']}" />`);
                        return;
                    }   

                    // Global Emote
                    const globalEmote = this.emotes.global.filter(emote => { return emote.code == word })
                    if(globalEmote && globalEmote.length > 0 && globalEmote[0].urls){
                        message.message = message.message.replace(word, `<img class="emote" src="${globalEmote[0].urls[globalEmote[0].urls.length - 1]['url']}" />`);
                        return;
                    }
                }
            });

            return message;
        },
        getGlobalEmotes() {
            axios.get(import.meta.env.VITE_SERVER_URI + '/twitch/emotes/global').then((response) => {
                this.emotes.global = response.data;
                this.roundupEmoteWords();
            });
        },
        getChannelEmotes(streamer) {
            axios.get(import.meta.env.VITE_SERVER_URI + '/twitch/emotes/streamer/' + streamer).then((response) => {
                this.emotes.channel = response.data;
                this.roundupEmoteWords();
            });
        },
        roundupEmoteWords() {
            Object.values(this.emotes.global).forEach((emote) => {
                if (this.emotes.matches.includes(emote.code)) {
                    return;
                }
                this.emotes.matches.push(emote.code)
            });
            Object.values(this.emotes.channel).forEach((emote) => {
                if (this.emotes.matches.includes(emote.code)) {
                    return;
                }
                this.emotes.matches.push(emote.code)
            });
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