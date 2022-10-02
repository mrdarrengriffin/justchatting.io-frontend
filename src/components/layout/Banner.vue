<template>
    <div class="banner" :class="['banner--' + status, {'visible': visible}]">
        {{ message }}
    </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { useStatusStore } from '@/stores/status';
export default {
    data() {
        return storeToRefs(useStatusStore())
    },
    mounted() {
        this.checkServerStatus();
    },
    methods: {
        async checkServerStatus() {
            await useStatusStore().check().then(() => {
                // Check every 10 seconds by default
                let timeoutInterval = 10000;

                // If the server is offline, check at a faster interval
                if (this.status === 'offline') {
                    timeoutInterval = 5000;
                }

                setTimeout(this.checkServerStatus, timeoutInterval);
            });


        }
    }
}
</script>

<style lang="scss" scoped>
.banner {
    box-sizing: border-box;
    font-size: 14px;
    height: 41px;
    padding: .75rem 1rem;
    text-align: center;
    transition: margin-top .5s;
    transition-delay: .5s;
    margin-top: -41px;
    
    &.visible{
        margin-top: 0;
    }

    &--online {
        background-color: #DCEDC8;
        color: #8BC34A;
    }

    &--checking {
        background-color: #FFECB3;
        color: #FF9800;
    }

    &--offline {
        background-color: #FFCDD2;
        color: #F44336;
    }
}
</style>