<template>
        <footer id="footer" class="footer">
        <div class="container footer-flex">
            <div class="footer-text">
                <p>
                    Контактная информация
                    <li>
                        <img src="img/envelope.svg" alt="">
                        <a href="mailto:test@test.ru">test@test.ru</a>
                    </li>
                    <li>
                        <img src="img/call.svg" alt="">
                        <a href="tel:+87775556699">+8 777 555 66 99</a>
                    </li>
                    <li>
                        <img src="img/placeholder.svg" alt="">
                        <a href="">Москва, Бульвар Ленина 33</a>
                    </li>
            </div>
            <div class="footer-text">
                <p>
                    Основные ссылки
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <router-link class="text-decoration-none" to="/">Главная</router-link>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <router-link class="text-decoration-none" to="/theory">Теория</router-link>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <router-link class="text-decoration-none" to="/practic">Практика</router-link>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <router-link class="text-decoration-none" to="/demo">Пробный демоэкзамен</router-link>
                    </li>
            </div>
            <div class="footer-text">
                <p>
                    Социальные сети
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <a href="https://vk.com/worldskills_russia">VK.com</a>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <a href="https://www.instagram.com/worldskillsrussia/">Instagram</a>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <a href="https://www.facebook.com/worldskills.ru/">Facebook</a>
                    </li>
                    <li>
                        <img src="img/Vector.svg" alt="">
                        <a href="https://twitter.com/worldskillsru">Twitter</a>
                    </li>
            </div>
        </div>
        <hr>
        <p>Все права защищены © 2020</p>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>