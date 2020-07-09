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
            <h2>Практические задания</h2>
            <div class="row">
                <div class="list">

                    <div class="product-item" v-for="practic of practics" :key="practic.key" @click="getSlug(practic._id)">
                        <div class="product-list">
                            <h3>{{practic.title}}</h3>
                            <span class="price">{{practic.question.slice(0, 200) + ' ...'}}</span>
                            <router-link class="btn btn-primary" :to="{name: 'practic', params: {practic_id: practic._id}}">Перейти</router-link>
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
import { getProfiles, getAllPractics } from "../services/apiService";
export default {
    name: 'Practic',
    data() {
        return {
            profiles: [],
            practics: []
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

        getAllPractics().then((practics) => {
            this.practics = practics.data
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