<template>
  <header class="header">
    <div
      class="header__top py-2 d-flex align-center justify-space-between primary"
    >
      <mobile-menu :links="links"></mobile-menu>
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
      <nuxt-link to="/" class="logo logo--mobile">
        <img src="~/static/logo-mobile.svg" alt="NewsPaper" />
      </nuxt-link>
      <auth-form></auth-form>
    </div>
    <div class="header__bottom d-flex align-center justify-space-between">
      <div class="header__bottom-left">
        <div class="logo mt-2">
          <nuxt-link to="/">
            <img src="~/static/logo.svg" alt="NewsPaper" />
          </nuxt-link>
        </div>
        <v-form @submit.prevent class="search ml-4">
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
      <div class="header__bottom-right">
        <div class="header__weather d-flex align-center font-weight-bold">
          <v-skeleton-loader
            v-if="loading('statistic_weather')"
            class="eur mx-3 mt-2"
            type="text"
            width="65"
          ></v-skeleton-loader>
          <template v-else>
            <v-img height="30" width="30" :src="weatherIcon"></v-img>
            <span>{{ celciusTempurature }}&deg;</span>
            <span>{{ weather.name }}</span>
          </template>
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
import { mapMutations, mapGetters, createNamespacedHelpers } from 'vuex';
import mobileMenu from './mobile-menu.vue';
const { mapActions } = createNamespacedHelpers('statistic');

export default {
  components: { mobileMenu },
  name: 'layout-header',
  data() {
    return {
      links: [
        { path: 'general', title: 'Главное' },
        { path: 'gadgets', title: 'Гаджеты' },
        { path: 'software', title: 'Программное обеспечение' },
        { path: 'culture', title: 'Культура' },
        { path: 'regional', title: 'Региональные новости' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      currency: 'statistic/currencyCourse',
      loading: 'loading',
      weather: 'statistic/weather',
      kelvinDegree: 'statistic/kelvinDegree',
    }),
    celciusTempurature() {
      return Math.floor(this.weather.main?.temp - this.kelvinDegree) || '';
    },
    weatherIcon() {
      if (this.weather.weather) {
        return `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png`;
      }
      return '';
    },
  },
  created() {
    this.updateLoading({ namespace: 'statistic_weather', value: true });
    if (process.browser) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.getWeather({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        () => {
          this.getWeather({});
        }
      );
    }

    this.getCurrency();
  },
  methods: {
    ...mapActions({
      getCurrency: 'getCurrencyCourse',
      getWeather: 'getWeather',
    }),
    ...mapMutations({
      updateLoading: 'SET_LOADING',
    }),
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
  &__top,
  &__bottom {
    padding-left: 48px;
    padding-right: 48px;
    @media screen and (max-width: $tablet) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  &__login {
    font-size: 14px;
  }
  &__nav {
    @media screen and (max-width: $tablet) {
      display: none;
    }
  }
  .logo {
    img {
      width: fit-content;
      height: 50px;
    }
    @media screen and (max-width: $mobile) {
      display: none;
    }
    &--mobile {
      justify-self: center;
      display: none;
      img {
        height: 36px;
      }
      height: 36px;
      margin-left: -20px;
      position: relative;
      @media screen and (max-width: $mobile) {
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  &__bottom {
    box-shadow: 0 10px 10px -10px rgb(49 94 251 / 40%);
    @media screen and (max-width: 650px) {
      padding: 10px 0 !important;
    }
    &-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media screen and (max-width: $tablet) {
        width: 100%;
      }
      @media screen and (max-width: $mobile) {
        display: block;
      }
      .search {
        @media screen and (max-width: $tablet) {
          margin-left: 0 !important;
          padding-left: 0 !important;
        }
      }
    }
    &-right {
      display: flex;
      align-items: center;
      @media screen and (max-width: $tablet) {
        display: none;
      }
    }
  }
  .search {
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
