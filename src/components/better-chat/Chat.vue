<template>
    <div class="chat">
        <Message v-for="message in messages" :key="message.id" :message="message.message" :tags="message.tags" />
    </div>
</template>

<script lang="ts">
import Message from "./Message.vue";

export default {
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        this.messages = [];
        this.sockets.subscribe("chatMessage", (data) => {
            this.messages.push(data);
        });
    },
    beforeUnmount(){
        this.sockets.unsubscribe("chatMessage");
    },
    sockets: {
    /*  chatMessage: (data) => {
         if(!self.messages){
             self.messages = [];
         }
         self.messages.push(data);
     },
     customEmit(val) {
         console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
     } */
    },
    methods: {
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
    .chat{
        line-height: 24px;
    }
</style>