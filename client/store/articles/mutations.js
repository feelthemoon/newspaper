export default {
  SET_ARTICLES(state, articles) {
    state.articles = [...state.articles, ...articles];
  },
  SET_HAS_NEW_ARTICLES(state, hasNewArticles) {
    state.hasNewArticles = hasNewArticles;
  },
};
