<template>
    <div class="songs">
        <div v-for="song in songs" :key="song" class="song">
            <img class="song__image" :src="getYouTubeThumbnail(song?.url)">
        </div>
    </div>
</template>

<script lang="ts">


export default {
    props: ['channel', 'message', 'tags'],
    data() {
        return {
            songs: []
        }
    },
    sockets: {
        playlistAdd: function (item) {
            this.songs.push(item);
        },
    },
    methods: {
        getYouTubeThumbnail(url) {
            var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return `https://img.youtube.com/vi/${match[2]}/0.jpg`;
            } else {
                return false;
            }
        }
    }
}
</script>

<style lang="scss">

</style>