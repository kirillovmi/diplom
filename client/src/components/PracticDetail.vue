<template>
    <div>
        <HeaderMin/>
        <div class="container task">
            <h3>{{practic.title}}</h3>
            <div class="">
                <div v-for="error of errors"  :key="error.id" class="errors">{{error.msg}}</div>
                <div v-if="msg" class="msg">{{msg}}</div>
            </div>
            <div v-if="admin">
                <button @click="deletePractic">Удалить</button>
                <button v-if="isEdit" @click="editChange">Отмена</button>
                <button v-else @click="editChange">Редактрировать</button>
            </div>

            <div v-if="isEdit">
                <div class="container">
                    <div v-for="error of errors"  :key="error.id" class="errors">{{error.msg}}</div>
                    <div v-if="msg" class="msg">{{msg}}</div>
                </div>
                <form enctype="multipart/form-data" class="container" @submit.prevent="updatePractic">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputCity">Название</label>
                            <input v-model="practic.title" type="text" class="form-control" id="inputCity">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputState">Задание</label>
                            <input v-model="practic.question" type="text" class="form-control" id="inputCity">
                        </div>
                        {{practic.file}}
                        <input @change="onSelectFile" type="file" ref='file'>
                    </div>
                    <button type="submit" class="btn btn-primary">Обновить задание</button>
                </form>
            </div>
            <div v-else>
                {{practic.question}}
                    <br>
                    <button v-on:click="downloadFile(practic.file)">{{practic.file}}</button>
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
                        <tr v-for="answer of practic.answers" :key="answer.id">
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
import {getAuthUser, getOnePractic, uploadDocumentInformation, downloadDocument, deletePractic, updatePractic} from '../services/apiService'

import axios from "axios";

export default {
    name: 'PracticDetail',
    data() {
        return {
            practic: {},
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
        ...mapGetters(['getToken', 'getCurrentPost'])
    },
    mounted() {
        this.getUser(),
        getOnePractic().then((practic) => {
            this.practic = practic.data
        }).catch((error) => {
            console.log(error.response.data.errors);
        });
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
                await axios.post('/api/practic/' + this.getCurrentPost, formData)
                uploadDocumentInformation(this.file.name).then(() => {
                    this.errors = []
                    this.msg = 'Файл добавлен'
                }).catch((error) => {
                    this.msg = ''
                    this.errors = error.response.data.errors
                })
            } catch(error) {
                this.msg = ''
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
            downloadDocument(file).then((result) => {
                window.open(result.config.baseURL + '/' + result.config.url)
            }).catch((error) => {
                console.log(error)
            });
        },

        deletePractic() {
            deletePractic().then(() => {
                this.$router.push('practic');
            }).catch((error) => {
                console.log(error);
            });
        },

        editChange() {
            this.isEdit = !this.isEdit;
        },
        
        updatePractic() {
            const formData = new FormData();
            formData.append('file', this.file);
            axios.post('/api/practic/add_file', formData)

            updatePractic(this.practic.title,this.practic.question, this.file.name).then(() => {
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