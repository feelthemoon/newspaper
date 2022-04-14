<template>
  <v-card class="ma-0 article" shaped :max-width="maxCardWidth">
    <div class="article__img">
      <div class="overlay"></div>
      <v-img
        class="article__img"
        :lazy-src="article.imgSrc"
        :src="article.imgSrc"
        :alt="article.title"
        :height="imgHeight"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-card-title class="pb-1 pt-1 font-weight-black title white--text">{{
        article.title
      }}</v-card-title>
    </div>
    <v-card-actions class="py-0 my-2">
      <v-spacer></v-spacer>
      <v-btn
        color="blue lighten-2"
        text
        @click.stop="showDescription = !showDescription"
      >
        <span>Краткое описание</span>
        <v-icon>{{
          showDescription ? 'mdi-chevron-up' : 'mdi-chevron-down'
        }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="showDescription">
        <v-card-text class="pb-3 pt-0">
          <v-row align="center" class="mx-0 mt-1">
            {{ article.description }}
          </v-row>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn
            color="primary lighten-2"
            text
            :href="article.remoteUrl"
            target="_blank"
          >
            Подробнее
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
    <v-divider class="mx-4"></v-divider>
    <div class="d-flex align-start mt-2 justify-space-between">
      <div>
        <v-card-actions class="py-0">
          <v-btn
            color="blue lighten-2"
            text
            @click.stop="showAuthors = !showAuthors"
          >
            <span>Авторы</span>
            <v-icon>{{
              showAuthors ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </v-btn>
        </v-card-actions>
        <v-expand-transition>
          <div v-show="showAuthors">
            <v-card-subtitle class="d-flex py-0 pr-0 mt-2">
              <strong class="article__author d-flex align-start mt-n2">{{
                article.author
              }}</strong>
            </v-card-subtitle>
          </div>
        </v-expand-transition>
      </div>
      <v-card-subtitle class="py-0 pl-0 ml-2 mt-2">
        <strong>{{ formattedDate }}</strong>
      </v-card-subtitle>
    </div>
    <v-card-text class="py-0">
      <v-chip-group column mandatory class="py-0">
        <v-chip
          :color="categories[cat] || 'primary lighten-2'"
          class="font-weight-bold text-uppercase"
          small
          v-for="(cat, index) in filteredCategories"
          :key="index"
          >{{ translateCategory(cat) }}</v-chip
        >
      </v-chip-group>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'article-card',
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
    imgHeight: {
      type: Number,
      default: () => 300,
    },
    maxCardWidth: {
      type: Number,
      default: () => 450,
    },
  },
  data() {
    return {
      showDescription: false,
      showAuthors: false,
      categories: {
        security: 'yellow lighten-2',
        software: 'blue lighten-3',
        general: 'red lighten-2',
        regional: 'cyan lighten-2',
        sports: 'orange lighten-2',
      },
    };
  },
  computed: {
    ...mapGetters({ translateCategory: 'articles/translateCategory' }),
    formattedDate() {
      return new Date(this.article.publishedDate).toLocaleDateString();
    },
    filteredCategories() {
      return this.article.categories.filter((cat) => cat !== 'any');
    },
  },
};
</script>

<style scoped lang="scss">
.article {
  &__img {
    position: relative;
    overflow: hidden;
  }
  .overlay {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 11;
    background-color: #000;
    opacity: 0.4;
    border-radius: 24px 4px 4px 4px;
    transition: opacity 0.3s;
  }
  .title {
    position: absolute;
    top: 50%;
    word-break: break-word;
    z-index: 12;
    transform: translateY(-50%);
  }
  &__img:hover {
    .overlay {
      opacity: 0.5;
      transition: opacity 0.3s;
    }
  }
  *:not(.overlay):not(.title) {
    position: relative;
    z-index: 10;
  }
}
</style>
