<script setup lang="ts">
import { RouterView } from "vue-router";
import Banner from "./components/layout/Banner.vue";
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
</script>

<template>
	<Banner />
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
		overflow: hidden;
		flex-grow: 1;
		
		.router-wrapper{
			display: flex;
			flex-grow: 1;
			width: 100%;
		}
	}
</style>