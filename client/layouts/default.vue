<template>
  <v-app>
    <layout-header></layout-header>
    <div class="alert-block" v-if="alerts.length">
      <v-alert
        v-for="(alert, index) in alerts"
        :key="index"
        class="alert"
        :type="alert.type"
        dense
        dismissible
        max-width="400"
        rounded
        transition="scale-transition"
      >
        {{ alert.message }}
      </v-alert>
    </div>
    <Nuxt />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters({ alerts: 'alerts' }),
  },
};
</script>

<style lang="scss" scoped>
.alert-block {
  position: fixed;
  right: 10px;
  top: 120px;
}
</style>
