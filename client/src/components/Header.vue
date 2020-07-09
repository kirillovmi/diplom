<template>
    <header id="headerr" class="headerr">
        <div class="container">
            <div>
                <ul class="menu">
                    <li>
                        <router-link class="text-decoration-none" to="/">Главная</router-link>
                    </li>
                    <li>
                       <router-link class="text-decoration-none" to="/theory">Теория</router-link> 
                    </li>
                    <li>
                        <router-link class="text-decoration-none" to="/practic">Практика</router-link>  
                    </li>
                    <li>
                        <router-link class="text-decoration-none" to="/demo">Пробный демоэкзамен</router-link> 
                    </li>
                    <li>
                        <router-link v-if="getToken" class="text-decoration-none" to="/profile">Профиль</router-link>
                        <router-link v-else class="text-decoration-none" to="/auth">Вход</router-link>
                    </li>                
                </ul>
            </div>
        </div>
        <hr>
        <div class="offer container">
            <p>Передовая образовательная площадка</p>
            <h3>
                Улучшение мира с помощью силы навыков
            </h3>
            <router-link class="btn btn-primary" to="/theory">Подготовиться</router-link>
        </div>
    </header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {getAuthUser} from '../services/apiService'
export default {
    name: 'Header',
    computed: mapGetters(['getToken', 'getErrors']),
    data() {
        return {
            email: '',
            password: '',
            userName: ''
        }
    },
    methods: {
        ...mapActions(['loginUser']),
        signIn() {
            this.loginUser({
                email: this.email,
                password: this.password
            }),
            this.getUser()
        },

        getUser() {
            getAuthUser().then((user) => {
                this.userName = user.data.name
            }).catch((error) => {
                console.log(error.response.data.errors)
            });
        }
    }
}
</script>