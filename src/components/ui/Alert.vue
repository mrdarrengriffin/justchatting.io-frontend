<template>
    <div v-if="visible" class="alert" :class="'alert--' + type">
        {{ message }}
    </div>
</template>

<script lang="ts">
    import { storeToRefs } from 'pinia';
    import { useAlertStore } from '@/stores/alert';
    export default {
        data(){
            return storeToRefs(useAlertStore())
        }
    }
</script>

<style lang="scss" scoped>
    .alert{
        padding: .75rem 1rem;
        border: 1px solid #000000;
        font-size: 14px;
        border-radius: .25rem;

        &--success {
            background-color: #DCEDC8;
            border-color: #8BC34A;
            color: #8BC34A;
        }
        &--info {
            background-color: #B3E5FC;
            border-color: #03A9F4;
            color: #03A9F4;
        }
        &--warning {
            background-color: #FFECB3;
            border-color: #FF9800;
            color: #FF9800;
        }
        &--error {
            background-color: #FFCDD2;
            border-color: #F44336;
            color: #F44336;
        }
    
    }
</style>