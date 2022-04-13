<template>
  <v-main class="main">
    <h1 class="main__title pl-3">Топ новостей</h1>
    <listing-articles></listing-articles>
  </v-main>
</template>

<script>
export default {
  name: 'IndexPage',
};
</script>
<style scoped lang="scss">
.main {
  padding: 15px 70px !important;
}
</style>
