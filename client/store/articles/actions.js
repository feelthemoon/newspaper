export default {
  async loadArticles({ commit, dispatch, state }, articleData) {
    try {
      if (!state.hasNewArticles) return;
      commit(
        'SET_LOADING',
        { namespace: 'articles', value: true },
        { root: true }
      );

      const articles = await this.$axios.$get(
        this.$routes.routeFactory(
          'articles',
          'latest',
          [articleData.page],
          [`category=${articleData.type}`]
        )
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
      dispatch(
        'setAlert',
        { type: 'error', errorStatus: e.response.status },
        { root: true }
      );
    }
  },
  resetArticles({ commit }) {
    commit('RESET_ARTICLES');
  },
};
