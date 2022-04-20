<template>
  <div class="listing">
    <v-container fluid class="listing__container">
      <v-row v-scroll-lock="firstLoading">
        <v-col v-for="(article, index) in articles" :key="index" :cols="cols">
          <v-skeleton-loader
            v-if="firstLoading"
            max-width="450"
            type="card"
          ></v-skeleton-loader>
          <article-card
            v-else
            :article="article"
            :maxCardWidth="articleWidth"
          ></article-card>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <div class="d-flex justify-center" v-intersect="infiniteScroll">
        <span v-if="loading('articles')">Загружаем...</span>
        <span v-else-if="!hasNewArticles || page >= 20"
          >Вы посмотрели все новости😊</span
        >
      </div>
    </client-only>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'listing-articles',
  props: {
    articlesType: {
      type: String,
      default: () => 'any',
    },
  },
  data() {
    return {
      page: 1,
      firstLoading: false,
      colsCount: {
        mobile: 12,
        tablet: 6,
        desktop: 4,
        xlDesktop: 3,
        xxlDesktop: 2,
      },
    };
  },
  computed: {
    ...mapGetters({
      articles: 'articles/articles',
      hasNewArticles: 'articles/hasNewArticles',
      loading: 'loading',
    }),
    cols() {
      const device = Object.keys(this.$device).filter(
        (key) => this.$device[key]
      )[0];
      return this.colsCount[device];
    },
    articleWidth() {
      return this.$device.mobile ? 535 : 450;
    },
  },
  created() {
    this.firstLoading = true;
    this.action_resetArticles();
    this.loadArticles().then(() => {
      this.firstLoading = false;
    });
  },
  methods: {
    ...mapActions({
      action_loadArticles: 'articles/loadArticles',
      action_resetArticles: 'articles/resetArticles',
    }),
    async loadArticles() {
      if (this.page < 20) {
        await this.action_loadArticles({
          page: this.page,
          type: this.articlesType,
        });
        this.page++;
      }
    },
    infiniteScroll(_, __, isIntersecting) {
      if (isIntersecting) {
        this.loadArticles();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.listing {
  &__container {
    min-height: 100vh;
  }
}
</style>
