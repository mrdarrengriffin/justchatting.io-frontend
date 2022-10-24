<template>
    <div class="message">
        <div class="message__badges">
            <div class="message__badge" v-for="badge in badges" :key="badge">
                <img :src="badge.img" :title="badge.info" :alt="badge.info">
            </div>
        </div>
        <div class="message__username" :style="'color: ' + tags.color">{{ tags.username }}</div>
        <div class="message__text" v-html="message"></div>
    </div>
</template>

<script lang="ts">


export default {
    props: ['channel', 'message', 'tags', 'badges']
}
</script>

<style lang="scss">
.message {
    display: block;
    font-size: 14px;
    margin-bottom: 6px;

    &__badges,
    &__badge,
    &__username {
        display: inline-block;
    }

    &__badges {
        display: inline-flex;
    }

    &__badge {
        margin-right: 4px;
    
        img {
            height: 18px;
            margin-bottom: -4px;
        }
    }
    
    &__text {
        display: inline;
        word-wrap: break-word;
        
        .message-emote {
            height: 28px;
            margin: -9px 0;
        }
    }

    &__username {
        font-weight: 600;
        margin-right: 2px;

        &:after {
            content: ':';
            margin-right: .25rem;
        }
    }
}
</style>