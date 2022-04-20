<template>
  <div class="mobile-menu">
    <v-app-bar-nav-icon
      class="white--text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-navigation-drawer v-model="drawer" absolute top temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          exact
          active-class="active-link primary"
        >
          <v-list-item
            :to="link.path"
            v-for="(link, index) in links"
            :key="index"
          >
            <v-list-item-title class="black--text">
              {{ link.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'mobile-menu',
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mobile-menu {
  display: none;
  .active-link {
    * {
      color: #fff !important;
    }
  }
  @media screen and (max-width: $tablet) {
    display: block;
  }
  .v-navigation-drawer {
    z-index: 1001;
  }
}
</style>
