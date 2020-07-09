<template>
    <div>
    <HeaderMin/>
    <section id="lesson">
        <div class="lesson">
            <div class="container"><h3>{{lesson.title}}</h3></div>
            <div v-if="admin" class="container">
                <button @click="deleteLesson">Удалить</button>
                <button v-if="isEdit" @click="editChange">Отмена</button>
                <button v-else @click="editChange">Редактрировать</button>
            </div>

            <div v-if="isEdit">
                
                <div class="container">
                    <div v-for="error of errors"  :key="error.id" class="errors">{{error.msg}}</div>
                    <div v-if="msg" class="msg">{{msg}}</div>
                </div>
                
                <form v-if="admin" class="container" @submit.prevent="updateLesson">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Название</label>
                            <input v-model="lesson.title" type="text" class="form-control" id="inputEmail4">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Видео</label>
                            <input v-model="lesson.video" type="text" class="form-control" id="inputPassword4">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="inputAddress">Теория</label>
                        <textarea v-model="lesson.theory" rows="10" class="form-control" id="inputAddress" placeholder=""/>
                    </div>
                    <h4>Вопрос</h4>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Вопрос</label>
                            <input v-model="lesson.question.text" type="text" class="form-control" id="inputEmail4">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Ответ</label>
                            <input v-model="answer_title" type="text" class="form-control" id="inputPassword4">
                            <input v-model="answer_right" type="checkbox" class="form-control">
                        </div>
                    </div>
                    <button @click.prevent="addQuestion" type="submit" class="btn">Добавить ответ</button>
                    <button type="submit" class="btn btn-primary">Обновить урок</button>
                    <ul>
                        <li v-for="answer of answers" :key="answer.key">{{answer.title}}</li>
                    </ul>
                </form>
            </div>
            
            <div v-else>
                <iframe class="mult-less" :src="lesson.video" frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                <div class="container">
                    <a class="btn btn-dark" data-toggle="collapse" href="#multiCollapseExample1" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">Показать теорию</a>
                </div>
                <div class="container">
                    <div class="col">
                        <div class="collapse multi-collapse" id="multiCollapseExample1">
                            <div class="card card-body">
                                <p class="text txt">
                                    {{lesson.theory}}
                                    <br><button v-if="getToken" type="button" class="btn btn-dark d-block mx-auto" data-toggle="modal"
                                        data-target="#exampleModal">
                                        Пройти тест
                                    </button>

                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Вопрос</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <form @submit.prevent="answerTest(lesson.question.answers)">
                                                <p class="text-center"><b>{{lesson.question.text}}</b></p>
                                                <div class="question">
                                                    <hr>
                                                    <ol>
                                                        <li v-for="answer of lesson.question.answers" :key="answer.id"><input @change="chooseAnswer(answer)" type="checkbox" name="quest1"> <label
                                                                class="form-check-label" for="a_1">{{answer.title}}</label></li>
                                                    </ol>
                                                </div>
                                                <div>
                                                    {{msg}}
                                                    <button class="btn-dark btn-lg btn-block" id="apply">Получить
                                                        результат</button>
                                                </div>
                                            </form>
                                            <pre id="log">
                                                    </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>

                            <hr>
                        </div>
    <!---->
                            <div v-if="admin">
                                <h2>Прошедшие тест</h2>
                                <table class="table table-sm table-dark table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">Имя</th>
                                        <ht scope="col">Количество попыток</ht>
                                        <th scope="col">Счет</th>
                                        <th scope="col">Результат</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user of lesson.testing" :key="user._id">
                                        <td>{{user.user.name}}</td>
                                        <td>{{user.trying}}</td>
                                        <td>{{user.score}}</td>
                                        <td v-if="user.isFinished">Сдал</td>
                                        <td v-else >Не сдал</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div> <!---->
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
</template>

<script>
import HeaderMin from './HeaderMin'
import {getAuthUser, getOneLesson, answerTest, deleteLesson, updateLesson} from '../services/apiService'
import {mapGetters} from 'vuex'

export default {
    name: 'LessonDetail',
    data() {
        return {
            lesson: {},
            msg: '',
            errors: [],
            admin: false,
            isEdit: false,
            answers: [],
            answer_right: false,
        }
    },

    components: {
        HeaderMin
    },

    computed: {
        ...mapGetters(['getToken'])
    },
    mounted() {
        getOneLesson().then((lesson) => {
            this.lesson = lesson.data
        }).catch((error) => {
            console.log(error.response.data.errors)
        }),

        this.getUser(),

        this.msg = '',
        this.errors = []
    },
    methods: {
        answerTest(answers) {
            let mistakes = 0;
            answers.map((answer) => {
                if(answer.right != answer.user_answer) {
                    mistakes++;
                }
            });
            if(mistakes == 0) {
                answerTest(true).then(() => {
                    getOneLesson().then((lesson) => {
                        this.lesson = lesson.data
                    }).catch((error) => {
                        console.log(error.response.data.errors)
                    });
                    this.msg = 'Ответ верный'
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                answerTest(false).then(() => {
                    getOneLesson().then((lesson) => {
                        this.lesson = lesson.data
                    }).catch((error) => {
                        console.log(error.response.data.errors)
                    });
                    this.msg = 'Ответ неверный'
                }).catch((err) => {
                    console.log(err)
                });
            }
        },

        chooseAnswer(answer) {
            answer.user_answer = !answer.user_answer;
        },

        getUser() {
           getAuthUser().then((user) => {
               if(user.data.role == "admin") {
                   this.admin = true
               }
           }).catch((error) => {
               console.log(error.response.data.errors)
           });
        },
        
        deleteLesson() {
            deleteLesson().then(() => {
                this.errors = []
                this.msg = 'Урок удален'
            }).catch((error) => {
                this.msg = ''
                this.errors = error.response.data.errors
            });
        },

        editChange() {
            this.isEdit = !this.isEdit;
        },
        
        updateLesson() {
            const question = {
                text: this.question_title,
                answers: this.answers
            }
            updateLesson(this.lesson.title, this.lesson.video, this.lesson.theory, question).then(() => {
                this.errors = []
                this.msg = 'Урок обновлен'
            }).catch((error) => {
                this.msg = ''
                this.errors = error.response.data.errors
            })
        },

        addQuestion() {
            const answer = {
                title: this.answer_title,
                right: this.answer_right
            }
            this.answers.push(answer);
        },
    }
}
</script>