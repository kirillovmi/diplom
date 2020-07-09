<template>
    <div>
        <HeaderMin/>
        <div class="container task">
            <h3>{{demo.title}}</h3>
            <div class="">
                <div v-for="error of errors"  :key="error.id" class="errors">{{error.msg}}</div>
                <div v-if="msg" class="msg">{{msg}}</div>
            </div>
            <div v-if="admin">
                <button @click="deleteDemo">Удалить</button>
                <button v-if="isEdit" @click="editChange">Отмена</button>
                <button v-else @click="editChange">Редактрировать</button>
            </div>

            <div v-if="isEdit">

                <div class="container">
                    <div v-for="error of errors"  :key="error.id" class="errors">{{error.msg}}</div>
                    <div v-if="msg" class="msg">{{msg}}</div>
                </div>

                <form enctype="multipart/form-data" class="container" @submit.prevent="updateDemo">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">Название</label>
                            <input v-model="demo.title" type="text" class="form-control" id="inputCity">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputState">Задание</label>
                            <input v-model="demo.question" type="text" class="form-control" id="inputCity">
                        </div>
                        {{demo.file}}
                        <input @change="onSelectFile" type="file" ref='file'>
                    </div>
                    <button type="submit" class="btn btn-primary">Обновить задание</button>
                </form>
            </div>
            <div v-else>
                {{demo.question}}
                    <br>
                    <button @click="downloadFile(demo.file)">{{demo.file}}</button>
                    <h3>Прикрепить задание</h3>
                    <form v-if="getToken" enctype="multipart/form-data" @submit.prevent="sendAnswer">
                        <p><input @change="onSelectFile" type="file" ref='file'>
                        <button type="submit">Отправить</button></p>
                    </form> 
                    <div v-else>Авторизуйтесь для отправки задания!</div>
                </div>


                <div v-if="admin" class="tabl">
                    <h2>Сдали</h2>
                    <table class="table table-sm table-dark table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Файл</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="answer of demo.answers" :key="answer.id">
                            <td>{{answer.user.name}}</td>
                            <td v-on:click="downloadFile(answer.file)">{{answer.file}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
    </div>
</template>

<script>
import HeaderMin from './HeaderMin'
import {mapGetters} from 'vuex'
import {getAuthUser, getOneDemo, uploadDemoDocumentInformation, downloadDemoDocument, deleteDemo, updateDemo} from '../services/apiService'

import axios from "axios";

export default {
    name: 'DemoDetail',
    data() {
        return {
            demo: {},
            file: '',
            admin: false,
            isEdit: false,
            msg: '',
            errors: []
        }
    },
    components: {
        HeaderMin
    },
    computed: {
        ...mapGetters(['getToken', 'getCurrentPage'])
    },
    mounted() {
        this.getUser(),
        getOneDemo().then((demo) => {
            this.demo = demo.data
        }).catch((error) => {
            console.log(error.response.data.errors);
        }),
        this.msg = '',
        this.errors = []
    },
    methods: {
        onSelectFile() {
            const file = this.$refs.file.files[0];
            this.file = file;
        },

        async sendAnswer() {
            const formData = new FormData();
            formData.append('file', this.file);
            try {
                axios.post('/api/demo/' + this.getCurrentPost, formData)
                uploadDemoDocumentInformation(this.file.name).then(() => {
                    this.errors = []
                    this.msg = 'Файл добавлен'
                    console.log('Файл добавлен')
                }).catch((error) => {
                    this.msg = []
                    this.errors = error.response.data.errors
                })
            } catch(error) {
                this.msg = []
                this.errors = error.response.data.errors
            }
        },

        getUser() {
           getAuthUser().then((user) => {
               this.user = user.data
               console.log(user)
               if(user.data.role == "admin") {
                   this.admin = true
               }
           }).catch((error) => {
               console.log(error.response.data.errors)
           });
        },

        downloadFile(file) {
            downloadDemoDocument(file).then((result) => {
                window.open(result.config.baseURL + '/' + result.config.url)
            }).catch((error) => {
                console.log(error)
            });
        },

        deleteDemo() {
            deleteDemo().then(() => {
                this.$router.push('demo');
            }).catch((error) => {
                console.log(error);
            });
        },

        editChange() {
            this.isEdit = !this.isEdit;
        },
        
        updateDemo() {
            const formData = new FormData();
            formData.append('file', this.file);
            axios.post('/api/demo/add_file', formData)

            updateDemo(this.demo.title,this.demo.question, this.demo.name).then(() => {
                this.errors = []
                this.msg = 'Задание обновлено'
            }).catch((error) => {
                this.msg = ''
                this.errors = error.response.data.errors
            })
        }
    }
}
</script>