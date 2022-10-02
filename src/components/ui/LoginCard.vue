<template>
    <div class="login card" :class="{'loading': loading}">
        <h1>Login</h1>
        <Alert />
        <div class="form-inputs">
            <div class="form-input">
                <div class="form-input__label">Email</div>
                <input class="form-input__control" type="text" name="email" v-model="email">
                <div v-if="validation?.email" class="form-input__validation form-input__validation--error">{{ validation?.email
                }}</div>
            </div>
            <div class="form-input">
                <div class="form-input__label">Password</div>
                <input class="form-input__control" type="password" name="password" v-model="password">
                <div v-if="validation?.password" class="form-input__validation form-input__validation--error">{{
                validation?.password }}</div>
            </div>
        </div>
        <button type="submit" class="submit" @click="login()">Login</button>
    </div>
</template>

<script lang="ts">
import axios from "axios";
import { useAuthStore } from '@/stores/auth';

export default {
    data() {
        return {
            loading: false,
            email: '',
            password: '',
            validation: {
                email: '',
                password: ''
            }
        }
    },
    mounted() {
    },
    methods: {
        clearErrors() {
            this.validation.email = '';
            this.validation.password = '';
        },
        async login() {
            this.loading = true;
            const loginResult = await useAuthStore().login(this.email, this.password);
            if(loginResult && loginResult.validation){
                this.validation = loginResult.validation
            }
            this.loading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    width: 30rem;
}

.alert {
    margin-bottom: 1rem;
}
</style>