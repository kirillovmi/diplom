<template>
    <div class="product-item"  @click="getSlug(lesson._id)">
        <iframe class="col-lg-12" width="433" height="200" :src="lesson.video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div class="product-list">
            <h3>{{lesson.title}}</h3>
            <span class="price">{{lesson.theory.slice(0, 200) + ' ...'}}</span>
            <router-link class="btn btn-primary" :to="{name: 'lesson', params: {lesson_id: lesson._id}}">Перейти</router-link>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Lesson',
    props: ['lesson'],
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