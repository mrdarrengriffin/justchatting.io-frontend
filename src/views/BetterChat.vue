<template>
    <Alert />
    <div class="better-chat">
        <ChatSidebar @changeStreamer="setStreamer" />
        <Chat :streamer="streamer" />
    </div>
</template>
<script>
    export default {
        data(){
            return {
                streamer: null
            }
        },
        methods: {
            setStreamer(streamer){
                this.streamer = streamer;
            }
        }
    }
</script>
<style lang="scss">
    .better-chat{
        display: flex;
        flex-grow: 1;

    }
    .chat{
        flex-grow: 1;
    }
</style>
