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
    font-size: 14px;
    display: flex;
    gap: 8px;

    &__badges,
    &__badge,
    &__username {
        display: inline-flex;
    }

    &__badges {
        display: flex;
        gap: 2px;
    }
    &__badge {
        img {
            height: 18px;
        }
    }

    &__text {
        word-wrap: break-word;

        .message-emote {
            height: 28px;
        }
    }

    &__username {
        font-weight: 600;

        &:after {
            content: ':';
            margin-right: .25rem;
        }
    }

}
</style>