<template>
    <div class="message">
        <div class="message__username" :style="'color: ' + tags.color">{{ tags.username }}</div>
        <div class="message__text" v-html="message"></div>
    </div>
</template>

<script lang="ts">


export default {
    props: ['channel', 'message', 'tags']
}
</script>

<style lang="scss">
    .message{
        font-size: 14px; 
        &__username, &__text{
            display: inline;
        }

        &__text{
            word-wrap: break-word;

            .emote{
                height: 30px;
                margin-bottom: -10px;
            }
        }
        &__username{
            font-weight: 600;
            &:after{
                content: ':';
                margin-right: .25rem;
            }
        }

    }
</style>