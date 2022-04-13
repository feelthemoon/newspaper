export default {
  async loadArticles({ commit, dispatch }, page) {
    try {
      commit(
        'SET_LOADING',
        { namespace: 'articles', value: true },
        { root: true }
      );
      const articles = await this.$axios.$get(
        this.$routes.articles('latest', [page])
      );
      if (!articles.length) {
        commit('SET_HAS_NEW_ARTICLES', false);
      }
      commit('SET_ARTICLES', articles);
      commit(
        'SET_LOADING',
        { namespace: 'articles', value: false },
        { root: true }
      );
    } catch (e) {
      commit(
        'SET_LOADING',
        { namespace: 'articles', value: false },
        { root: true }
      );
      dispatch(
        'setError',
        { errorData: e, namespace: 'articles' },
        { root: true }
      );
    }
  },
};
