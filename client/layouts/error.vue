<template>
  <div
    dark
    class="d-flex error-wrapper flex-column justify-center align-center"
  >
    <h1 class="error-block">
      <template v-if="error.statusCode === 404">
        <span class="status">404</span>
        <span class="description">{{ pageNotFound }}</span>
      </template>
      <template v-else>
        <span class="description">{{ otherError }}</span>
      </template>
    </h1>
    <v-btn class="primary mt-1" to="/"> Home page </v-btn>
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: 'Not Found',
      otherError: 'An error occurred',
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 20px;
}
.error-wrapper {
  height: 100%;
  .error-block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .status {
    font-weight: 700;
    font-size: 120px;
    line-height: 0.9;
  }
  .description {
    font-weight: 500;
    font-size: 36px;
  }
}
</style>
