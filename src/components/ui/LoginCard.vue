<template>
    <div class="login card">
        <h1>Login</h1>
        <Alert />
        <div class="form-inputs">
            <div class="form-input">
                <div class="form-input__label">Email</div>
                <input class="form-input__control" type="text" name="email" v-model="email">
                <div v-if="errors?.email" class="form-input__validation form-input__validation--error">{{ errors?.email }}</div>
            </div>
            <div class="form-input">
                <div class="form-input__label">Password</div>
                <input class="form-input__control" type="password" name="password" v-model="password">
                <div v-if="errors?.password" class="form-input__validation form-input__validation--error">{{ errors?.password }}</div>
            </div>
        </div>
        <button type="submit" class="submit" @click="login()">Login</button>
    </div>
</template>

<script lang="ts">
    import axios from "axios"; 
    import { useAuthStore } from '@/stores/auth';
    import { useAlertStore } from '@/stores/alert';
    
    export default {
        data(){
            return {
                email: '',
                password: 'test',
                errors: {
                    generic: '',
                    email: '',
                    password: ''
                }
            }
        },
        mounted(){
        },
        methods: {
            clearErrors(){
                this.errors.generic = '';
                this.errors.email = '';
                this.errors.password = '';
            },
            async login() {
                useAuthStore().login(this.email, this.password);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        width: 30rem;
    }
.alert{
    margin-bottom: 1rem;
}
</style>