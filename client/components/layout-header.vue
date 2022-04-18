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
        <v-form @submit.prevent class="header__search ml-4">
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
        <div class="header__currency d-flex align-center">
          <template v-if="loading('statistic_currency')">
            <v-skeleton-loader
              class="eur mx-3 mt-2"
              type="text"
              width="65"
            ></v-skeleton-loader>
            <v-skeleton-loader
              class="usd mx-3 mt-2"
              type="text"
              width="65"
            ></v-skeleton-loader>
          </template>
          <template v-else>
            <span class="eur red--text mx-5 font-weight-bold"
              >EUR {{ currency.EUR }}</span
            >
            <span class="usd red--text font-weight-bold"
              >USD {{ currency.USD }}</span
            >
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, createNamespacedHelpers } from 'vuex';
const { mapActions } = createNamespacedHelpers('statistic');

export default {
  name: 'layout-header',
  data() {
    return {
      links: [
        { path: 'general', title: 'Главное' },
        { path: 'gadgets', title: 'Гаджеты' },
        { path: 'software', title: 'Программное обеспечение' },
        { path: 'sports', title: 'Спорт' },
        { path: 'regional', title: 'Региональные новости' },
      ],
    };
  },
  computed: {
    ...mapGetters({ currency: 'statistic/currencyCourse', loading: 'loading' }),
  },
  created() {
    this.getCurrency();
  },
  methods: {
    ...mapActions({ getCurrency: 'getCurrencyCourse' }),
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
        width: fit-content;
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
