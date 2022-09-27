<script setup lang="ts">
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
</script>

<template>
	<Header />
	<div class="main">
		<Sidebar />
		<div class="router-wrapper">
			<RouterView />
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.main {
		display: flex;
		
		.router-wrapper{
			padding: 1rem;
			width: 100%;
		}
	}
</style>