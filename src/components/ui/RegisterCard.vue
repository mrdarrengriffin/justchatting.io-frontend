<template>
    <div class="register card">
        <h1>Register</h1>
        <Alert />
        <div class="form-inputs">
            <div class="form-input">
                <div class="form-input__label">Name</div>
                <input class="form-input__control" type="text" name="name" v-model="name">
                <div v-if="validation?.name" class="form-input__validation form-input__validation--error">{{
                validation?.name }}
                </div>
            </div>
            <div class="form-input">
                <div class="form-input__label">Email</div>
                <input class="form-input__control" type="text" name="email" v-model="email">
                <div v-if="validation?.email" class="form-input__validation form-input__validation--error">{{
                validation?.email
                }}</div>
            </div>
            <div class="form-input">
                <div class="form-input__label">Password</div>
                <input class="form-input__control" type="password" name="password" v-model="password">
                <div v-if="validation?.password" class="form-input__validation form-input__validation--error">{{
                validation?.password }}</div>
            </div>
            <div class="form-input">
                <div class="form-input__label">Confirm Password</div>
                <input class="form-input__control" type="password" name="password_confirm" v-model="password_confirm">
                <div v-if="validation?.password_confirm" class="form-input__validation form-input__validation--error">{{
                validation?.password_confirm }}</div>
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
    data() {
        return {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            validation: {
                name: '',
                email: '',
                password: '',
                password_confirm: ''
            }
        }
    },
    methods: {
        clearErrors() {
            Object.keys(this.validation).forEach(key => {
                this.validation[key] = '';
            });

        },
        async register() {
            this.clearErrors();
            if (this.password != this.password_confirm) {
                this.validation.password = "Passwords do not match";
                this.validation.password_confirm = "Passwords do not match";
                return;
            }
            const registerResult = await useAuthStore().register(this.name, this.email, this.password);
            if (registerResult && registerResult.validation) {
                this.validation = registerResult.validation;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.register {
    width: 30rem;
}

.alert {
    margin-bottom: 1rem;
}
</style>