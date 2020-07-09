<template>
  <div>
      <Header/>
        <section id="services">
        <div class="container">
            <div class="title">
                <h2>
                    Мы помогаем обучающимся подготовиться к демонтрационному экзамену Worldskills
                </h2>
                <p>
                    Союз «Молодые профессионалы (Ворлдскиллс Россия)» – официальный оператор международного
                    некоммерческого движения WorldSkills International, миссия которого – повышение стандартов
                    подготовки кадров. Наш девиз: «Делай мир лучше силой своего мастерства!» («Improving the world with
                    the power of skills!»).
                </p>
            </div>
            <div class="services clearfix">
                <div class="services__item">
                    <img src="img/Group_15.svg" alt="Услуга">
                    <h3>Теоретический материал</h3>
                    <p>
                        Подготовка по видео урокам и прохождение тестов
                    </p>
                </div>
                <div class="services__item">
                    <img src="img/Group_15.svg" alt="Услуга">
                    <h3>Практические задания</h3>
                    <p>
                        Решение практических заданий для усвоения теоритечиеского материала
                    </p>
                </div>
                <div class="services__item">
                    <img src="img/Group_15.svg" alt="Услуга">
                    <h3>Пробный демоэкзамен</h3>
                    <p>
                        Симуляция сдачи реального демоэкзамена
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section id="about" class="about">
        <div class="container">
            <div class="description">
                <div class="desc-left">
                    <p>
                        <h3>Высокие стандарты обучения</h3>
                        Повышение престижа рабочих профессий и развитие профессионального образования путем гармонизации
                        лучших практик и профессиональных стандартов во всем мире посредством организации и проведения
                        конкурсов профессионального мастерства как в каждой отдельной стране, так и во всем мире в
                        целом.
                </div>
                <div class="desc-right">
                    <img src="img/Rectangle2.svg" alt="">
                </div>

            </div>
            <hr class="about">
        </div>
    </section>
    <section id="vid">
        <div class="vid">
            <div class="container">
                <h3>Видео о нас</h3>
                <p>Просто посмотрите как мы работаем</p>
            </div>
            <iframe class="mult" src="https://www.youtube.com/embed/_sNjx-OzszQ" frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            <hr>
        </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Header from './Header'
import { getProfiles } from "../services/apiService";

export default {
  name: "Index",
  data() {
    return {
      profiles: []
    };
  },

  components: {
      Header
  },

  computed: mapGetters(['getToken']),

  mounted() {
    getProfiles()
      .then(profiles => {
        this.profiles = profiles.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>