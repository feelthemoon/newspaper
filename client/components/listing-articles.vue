<template>
  <div class="listing">
    <v-container fluid>
      <v-row>
        <v-col v-for="(article, index) in articles" :key="index" :cols="3">
          <article-card :article="article"></article-card>
        </v-col>
      </v-row>
    </v-container>
    <client-only>
      <infinite-loading @infinite="loadArticles">
        <div slot="no-more">Вы посмотрели все новости😊</div>
        <div slot="spinner">Загружаем...</div>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'listing-articles',
  components: {
    InfiniteLoading,
  },
  props: {
    articlesType: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapGetters({
      articles: 'articles/articles',
      hasNewArticles: 'articles/hasNewArticles',
    }),
  },
  methods: {
    ...mapActions({
      action_loadArticles: 'articles/loadArticles',
    }),
    async loadArticles($state) {
      await this.action_loadArticles(this.page);
      if (this.hasNewArticles) {
        $state.loaded();
      } else {
        $state.complete();
      }
      this.page++;
    },
  },
};
</script>
