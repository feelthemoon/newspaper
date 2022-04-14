<template>
  <v-main class="main">
    <h1 class="main__title pl-3">Топ новостей</h1>
    <listing-articles :articles-type="slug || 'any'"></listing-articles>
  </v-main>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ params }) {
    const slug = params.slug === 'gadgets' ? 'security' : params.slug;
    return { slug }
  },
};
</script>
