<template>
  <v-main class="main">
    <h1 class="main__title">
      {{ headlines[slug] }}
    </h1>
    <listing-articles :articles-type="slug || 'any'"></listing-articles>
  </v-main>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: 'IndexPage',
  async asyncData({ params, error }) {
    const pages = [
      'any',
      'security',
      'general',
      'software',
      'culture',
      'regional',
    ];

    const slug =
      params.slug === 'gadgets'
        ? 'security'
        : params.slug === undefined
        ? 'any'
        : params.slug;

    if (!pages.includes(slug)) {
      error({ statusCode: 404 });
    }
    return { slug };
  },
  data() {
    return {
      headlines: {
        any: 'Топ новостей',
        security: 'Новости из мира гаджетов',
        general: 'О главном',
        software: 'Новости о программном обеспечении',
        culture: 'О культуре',
        regional: 'Региональные новости',
      },
    };
  },

  created() {
    this.setHasNewArticles(true);
  },
  methods: {
    ...mapMutations({ setHasNewArticles: 'articles/SET_HAS_NEW_ARTICLES' }),
  },
};
</script>
