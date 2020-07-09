<template>
        <header id="headerr" class="header3">
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
    </header>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'HeaderMini',
    computed: mapGetters(['getToken'])
}
</script>