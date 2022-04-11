<template>
  <header class="header">
    <div
      class="header__top py-2 px-15 d-flex align-center justify-space-between primary"
    >
      <nav class="header__nav">
        <ul class="header__links pa-0 d-flex align-center">
          <li
            class="header__links-item mr-5"
            v-for="(link, index) in links"
            :key="index"
          >
            <nuxt-link :to="link.path">{{ link.title }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <auth-form></auth-form>
    </div>
    <div class="header__bottom px-12 d-flex align-center justify-space-between">
      <div class="header__bottom-left d-flex align-center">
        <div class="logo mt-2">
          <nuxt-link to="/">
            <img src="~/static/logo.svg" alt="NewsPaper" />
          </nuxt-link>
        </div>
        <v-form @submit.prevent class="header__search ml-8">
          <v-text-field
            hide-details
            dense
            outlined
            rounded
            type="search"
            color="primary"
            class="py-0 my-0 px-2"
            label="Поиск по новостям..."
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-form>
      </div>
      <div class="header__bottom-right d-flex align-center">
        <div class="header__weather font-weight-bold">
          <v-icon small>mdi-weather-pouring</v-icon>
          <span>+12&deg;</span>
          <span>в Москве</span>
        </div>
        <div class="header__currency">
          <span class="eur red--text mx-5 font-weight-bold">EUR 89.9</span>
          <span class="usd red--text font-weight-bold">USD 75.9</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import AuthForm from '~/components/auth-form';

export default {
  name: 'layout-header',
  components: {
    AuthForm,
  },
  data() {
    return {
      links: [
        { path: 'technology', title: 'Технологии' },
        { path: 'lifestyle', title: 'Образ жизни' },
        { path: 'programming', title: 'Разработка' },
        { path: 'science', title: 'Наука' },
        { path: 'sports', title: 'Спорт' },
        { path: 'finance', title: 'Финансы' },
        { path: 'politics', title: 'Политика' },
        { path: 'game', title: 'Игры' },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.header {
  &__links {
    list-style: none;
    a {
      color: #fff;
      font-size: 16px;
      transition: 0.3s;
      &:hover {
        opacity: 0.7;
        transition: 0.3s;
      }
    }
  }
  &__login {
    font-size: 14px;
  }
  &__bottom {
    box-shadow: 0 10px 10px -10px rgb(49 94 251 / 40%);
    .logo {
      img {
        width: 160px;
        height: 50px;
      }
    }
  }
  &__search {
    min-width: 300px;
  }
  &__weather {
    font-size: 15px;
    color: rgba($color: #315efb, $alpha: 0.8);
  }
  &__currency {
    font-size: 14px;
  }
}
</style>
