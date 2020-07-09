<template>
    <div>
        <HeaderMin/>
        <section class="container task">
            <div v-for="error of getErrors"  :key="error.id" class="errors">{{error.msg}}</div>
            <form @submit.prevent="signIn">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input v-model="email" name="email" type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input v-model="password" name="password" type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="Пароль">
                </div>
                <button type="submit" class="btn btn-primary">Войти</button>
                <router-link class="btn" to="/registration">Зарегистрироваться</router-link>
            </form>
        </section>
        </div>
</template>

<script>
import HeaderMin from './HeaderMin'
import {mapGetters, mapActions} from 'vuex'
export default {
    name: 'Auth',
    components: {
        HeaderMin
    },
    computed: mapGetters(['getToken', 'getErrors']),
    mounted() {
        this.$store.commit('updateError')
    },
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        signIn() {
            this.loginUser({
                email: this.email,
                password: this.password
            })
            this.$router.push('/')     
        }
    }
}
</script>