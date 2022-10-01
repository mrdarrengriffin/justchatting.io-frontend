<template>
    <div class="view-wrapper">
        <LoginCard />
    </div>
</template>
<script>
import { useAuthStore } from "@/stores/auth";
export default {
    mounted() {
        const authStore = useAuthStore();
        if (!!authStore.token) {
            this.$router.push('/');
        }
    }
}
</script>
<style scoped>
.view-wrapper {
    align-items: center;
    display: flex;
    height: 60%;
    justify-content: center;
}
</style>