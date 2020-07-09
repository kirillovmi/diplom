<template>
    <div class="container">
        <div class="row">
            {{msg}}
            <div class="list">
                <Lesson
                    v-for="lesson of lessons" :key="lesson.id"
                    v-bind:lesson="lesson"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {getLessons} from '../services/apiService'

import Lesson from './Lesson'
export default {
    name: 'LessonsList',
    data() {
        return {
            msg: '',
            lessons: []
        }
    },
    components: {
        Lesson
    },
    mounted() {
        getLessons().then((lessons) => {
            this.lessons = lessons.data
        }).catch((error) => {
            this.msg = error
        });
    }
}
</script>