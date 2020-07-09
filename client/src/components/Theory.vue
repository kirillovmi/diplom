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
      <LessonsList/>  
    </div>   
</template>

<script>
import Header from './Header'
import LessonsList from "../components/LessonsList"
import { getProfiles } from "../services/apiService";

export default {
    name: "Theory",
    components: {
        Header,
        LessonsList
    },
    data() {
        return {
        profiles: []
        };
    },
    mounted() {
        getProfiles().then(profiles => {
            this.profiles = profiles.data;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>