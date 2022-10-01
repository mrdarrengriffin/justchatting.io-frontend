<template>
    <div class="login card">
        <h1>Login</h1>
        <Alert />
        <div class="form-inputs">
            <div class="form-input">
                <div class="form-input__label">Name</div>
                <input class="form-input__control" type="text" name="name" v-model="name">
                <div v-if="errors?.name" class="form-input__validation form-input__validation--error">{{ errors?.name }}</div>
            </div>
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
            <div class="form-input">
                <div class="form-input__label">Confirm Password</div>
                <input class="form-input__control" type="password" name="password_confirm" v-model="password_confirm">
                <div v-if="errors?.password_confirm" class="form-input__validation form-input__validation--error">{{ errors?.password_confirm }}</div>
            </div>
        </div>
        <button type="submit" class="submit" @click="register()">Register</button>
    </div>
</template>

<script lang="ts">
    import axios from "axios"; 
    import { useAuthStore } from '@/stores/auth';
    import { useAlertStore } from '@/stores/alert';
    
    export default {
        data(){
            return {
                name: '',
                email: '',
                password: 'test',
                password_confirm: 'test',
                errors: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirm: ''
                }
            }
        },
        mounted(){
        },
        methods: {
            clearErrors(){
                Object.keys(this.errors).forEach(key => {
                    this.errors[key] = '';
                });
              
            },
            async register() {
                this.clearErrors();
                if(this.password != this.password_confirm){
                    this.errors.password = "Passwords do not match";
                    this.errors.password_confirm = "Passwords do not match";
                    return;
                }
                useAuthStore().register(this.name, this.email, this.password);
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