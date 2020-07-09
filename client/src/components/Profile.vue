<template>
<div>
    <HeaderMin/>
    <div class="container">
        <div class="container profile_card">
            <img src="../../public/img/user.png">
            <div class="user_card">
                <h3>{{user.name}}</h3>
                <p>{{user.email}}</p>
                <p>Счет: {{user.score}}</p>
                <button @click="logOut" class="btn btn-primary">Выйти</button>
            </div>
        </div>
        <div class="tabl container admin">
            <table class="table table-sm table-dark table-hover">
                <thead>
                    <tr>
                        <th scope="col">Урок</th>
                        <th scope="col">Попытка</th>
                        <th scope="col">Счет</th>
                        <th scope="col">Завершенность</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="lesson of statistic" :key="lesson.id">
                        <td>{{lesson.lesson}}</td>
                        <td>{{lesson.trying}}</td>
                        <td>{{lesson.score}}</td>
                        <td v-if="lesson.isFinished">Сдал</td>
                        <td v-else>Не сдал</td>
                    </tr>
                    </tbody>
            </table>
        </div>
        <form v-if="admin" class="container admin" @submit.prevent="addLesson">
            <h3>Теория</h3>
            <div v-for="error of lessonErrors"  :key="error.id" class="errors">{{error.msg}}</div>
            <div v-if="lessonMsg" class="msg">{{lessonMsg}}</div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Название</label>
                    <input v-model="title" type="text" class="form-control" id="inputEmail4">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Видео</label>
                    <input v-model="video" type="text" class="form-control" id="inputPassword4">
                </div>
            </div>
            <div class="form-group">
                <label for="inputAddress">Теория</label>
                <textarea v-model="theory" rows="10" class="form-control" id="inputAddress" placeholder=""/>
            </div>
            <h4>Вопрос</h4>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Вопрос</label>
                    <input v-model="question_title" type="text" class="form-control" id="inputEmail4">
                </div>
                <div class="form-group col-md-5">
                    <label for="inputPassword4">Ответ</label>
                    <input v-model="answer_title" type="text" class="form-control" id="inputPassword4">
                </div>
                <div class="form-group col-md-1">
                    <input v-model="answer_right" type="checkbox" class="form-control">
                </div>
            </div>
            <button @click.prevent="addQuestion" type="submit" class="btn">Добавить ответ</button>
            <button type="submit" class="btn btn-primary">Добавить урок</button>
            <ul>
                <li v-for="answer of answers" :key="answer.key">{{answer.title}}</li>
            </ul>
        </form>
        <form v-if="admin" enctype="multipart/form-data" class="container admin" @submit.prevent="addPractic">
            <h3>Практика</h3>
            <div v-for="error of practicErrors"  :key="error.id" class="errors">{{error.msg}}</div>
            <div v-if="practicMsg" class="msg">{{practicMsg}}</div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputCity">Название</label>
                    <input v-model="practicTitle" type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputState">Задание</label>
                    <input v-model="practicQuestion" type="text" class="form-control" id="inputCity">
                </div>
                <input @change="onSelectFile" type="file" ref='file'>
            </div>
            <button type="submit" class="btn btn-primary">Добавить задание</button>
        </form>
        <form v-if="admin" enctype="multipart/form-data" class="container admin" @submit.prevent="addDemo">
            <h3>Дэмоэкзамен</h3>
            <div v-for="error of demoErrors"  :key="error.id" class="errors">{{demo.msg}}</div>
            <div v-if="demoMsg" class="msg">{{demoMsg}}</div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputCity">Название</label>
                    <input v-model="demoTitle" type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputState">Задание</label>
                    <input v-model="demoQuestion" type="text" class="form-control" id="inputCity">
                </div>
                <input @change="onSelectFile" type="file" ref='file'>
            </div>
            <button type="submit" class="btn btn-primary">Добавить демо</button>
        </form>
    </div>
    <div v-if="admin" class="tabl container admin">
        <h2>Студенты</h2>
        <table class="table table-sm table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Счет</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="profile of profiles" :key="profile.id">
                    <td>{{profile.name}}</td>
                    <td>{{profile.score}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import HeaderMin from './HeaderMin'
import {mapGetters} from 'vuex'
import {addNewLesson, addNewPractic, getAuthUser, addNewDemo, getProfiles, getUserAnswers} from '../services/apiService'

import axios from "axios";

export default {
    name: 'Profile',
    data() {
        return {
            user: {},
            msg: '',
            admin: false,

            title: '',
            video: '',
            theory: '',

            question_title: '',
            answer_title: '',
            answer_right: false,

            answers: [],

            practicTitle: '',
            practicQuestion: '',
            file: '',

            demoTitle: '',
            demoQuestion: '',

            lessons: [],
            profiles: [],

            statistic: [],

            lessonErrors: [],
            practicErrors: [],
            demoErrors: [],

            lessonMsg: '',
            practicMsg: '',
            demoMsg: ''
        }
    },

    components: {
        HeaderMin
    },

    computed: {
        ...mapGetters(['getErrors', 'getToken'])
    },
    mounted() {
        this.getUser(),
        getProfiles().then(profiles => {
            this.profiles = profiles.data;
        }).catch(error => {
            console.log(error);
        }),
        this.getAnswers(),
        this.lessonErrors = [],
        this.practicErrors = [],
        this.demoErrors = [],
        
        this.lessonMsg = '',
        this.practicMsg = '',
        this.demoMsg = ''
    },
    methods: {
        getUser() {
           getAuthUser().then((user) => {
               this.user = user.data
               if(user.data.role == "admin") {
                   this.admin = true
               }
           }).catch((error) => {
               console.log(error.response.data.errors)
           });
        },

        getAnswers() {
            getUserAnswers().then((lessons) => {
                this.statistic = lessons.data
            }).catch((error) => {
                console.log(error);                
            })
        },

        addLesson() {
            const question = {
                text: this.question_title,
                answers: this.answers
            }
            addNewLesson(this.title, this.video, this.theory, question).then(() => {
                this.lessonErrors = []
                this.lessonMsg = 'Урок добавлен'
            }).catch((error) => {
                this.lessonMsg = ''
                this.lessonErrors = error.response.data.errors
            })
        },
        addQuestion() {
            const answer = {
                title: this.answer_title,
                right: this.answer_right
            }
            this.answers.push(answer);
            //console.log(this.answers);
        },
        addPractic() {
            const formData = new FormData();
            formData.append('file', this.file);
             console.log(this.file)
            axios.post('/api/practic/add_file', formData)
            addNewPractic(this.practicTitle, this.practicQuestion, this.file.name).then(() => {
                this.practicErrors = []
                this.practicMsg = 'Задание добавлено'
            }).catch((error) => {
                this.practicMsg = ''
                this.practicErrors = error.response.data.errors
            });
        },

        addDemo() {
            const formData = new FormData();
            formData.append('file', this.file);
            axios.post('/api/demo/add_file', formData)
            addNewDemo(this.demoTitle, this.demoQuestion, this.file.name).then(() => {
                this.demoErrors = []
                this.demoMsg = 'Задание добавлено'
            }).catch((error) => {
                this.demoMsg = ''
                this.demoErrors = error.response.data.errors
            });
        },

        onSelectFile() {
            const file = this.$refs.file.files[0];
            this.file = file;
        },

        onSelectPracticFile() {
            const file = this.$refs.file.files[0];
            this.file = file;
        },

        logOut() {
            this.$store.commit('logOut')
            this.$router.push('/')
        }
    }
}
</script>