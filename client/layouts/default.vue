<template>
  <v-app>
    <layout-header></layout-header>
    <Nuxt />
  </v-app>
</template>

<script>
import LayoutHeader from '~/components/layout-header';

export default {
  components: {
    LayoutHeader,
  },
  name: 'DefaultLayout',
};
</script>
