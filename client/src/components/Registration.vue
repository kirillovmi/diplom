<template>
    <div>
        <HeaderMin/>
        <section class="container task">
            <div v-for="error of getErrors"  :key="error.id" class="errors">{{error.msg}}</div>
            <form @submit.prevent="registration">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input v-model="email" name="email" type="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword2">Имя</label>
                    <input v-model="name" name="name" type="text" class="form-control" id="exampleInputPassword2" placeholder="Имя">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Пароль</label>
                    <input v-model="password" name="password" type="password" class="form-control" id="exampleInputPassword1"
                        placeholder="Пароль">
                </div>
                <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
                <router-link class="btn" to="/auth">Войти</router-link>
            </form>
    </section>
    </div>
</template>

<script>
import HeaderMin from './HeaderMin'
//import {registerUser} from '../services/apiService'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Registration',
    computed: mapGetters(['getToken', 'getErrors']),
    data() {
        return {
            email: '',
            name: '',
            password: ''
        }
    },
    components: {
        HeaderMin
    },
    mounted() {
        this.$store.commit('updateError')
    },
    methods: {
        ...mapActions(['userRegistration']),
        registration() {           
            this.userRegistration({
                name: this.name,
                email: this.email,
                password: this.password
            })
            this.$router.push('/')
        }
    }
}
</script>