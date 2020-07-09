<template>
    <div>
        <Header/>
        <!--<div class="tabl">
            <h2>Таблица лидеров</h2>
            <table class="table table-sm table-dark table-hover">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="profile of profiles" :key="profile.id">
                    <th scope="row">1</th>
                    <td>{{profile.name}}</td>
                    <td>{{profile.score}}</td>
                </tr>
                </tbody>
            </table>
        </div>-->

        <div class="container less">
            <h2>Пробный демоэкзамен</h2>
            <div class="row">
                <div class="list">

                    <div class="product-item" v-for="demo of demos" :key="demo.key" @click="getSlug(demo._id)">
                        <div class="product-list">
                            <h3>{{demo.title}}</h3>
                            <router-link class="btn btn-primary" :to="{name: 'demo', params: {demo_id: demo._id}}">Перейти</router-link>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Header from './Header'
import {mapActions} from 'vuex'
import { getProfiles, getAllDemo } from "../services/apiService";
export default {
    name: 'Demo',
    data() {
        return {
            profiles: [],
            demos: []
        };
    },
    components: {
        Header
    },
    mounted() {
        getProfiles().then(profiles => {
            this.profiles = profiles.data;
        }).catch(error => {
            console.log(error);
        }),

        getAllDemo().then((demo) => {
            this.demos = demo.data
        }).catch((error) => {
            console.log(error);
        })
    },
    methods: {
        ...mapActions(['getCurrentPost']),
        getSlug(slug) {
            this.getCurrentPost({
                slug: slug
            })
        }
    }
}
</script>