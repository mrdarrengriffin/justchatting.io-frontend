<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
	<Header />
	<div class="main">
		<Sidebar v-if="authStore.token" />
		<div class="router-wrapper">
			<RouterView />
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.main {
		display: flex;
		height: calc(100vh - 56px);
		
		.router-wrapper{
			padding: 1rem;
			width: 100%;
		}
	}
</style>