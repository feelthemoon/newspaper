export default {
  SET_ARTICLES(state, articles) {
    state.articles = [...state.articles, ...articles];
  },
  RESET_ARTICLES(state) {
    state.articles = [];
  },
  SET_HAS_NEW_ARTICLES(state, hasNewArticles) {
    state.hasNewArticles = hasNewArticles;
  },
};
