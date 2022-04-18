export default {
  async getCurrencyCourse({ commit, dispatch }) {
    try {
      commit(
        'SET_LOADING',
        { namespace: 'statistic_currency', value: true },
        { root: true }
      );
      const res = await this.$axios.get(
        this.$routes.routeFactory('statistic', 'currency')
      );
      commit('UPDATE_CURRENCY_COURSE', {
        USD: parseFloat(res.data.USD).toFixed(2),
        EUR: parseFloat(res.data.EUR).toFixed(2),
      });
      commit(
        'SET_LOADING',
        { namespace: 'statistic_currency', value: false },
        { root: true }
      );
    } catch (error) {
      dispatch(
        'setError',
        { errorData: error, namespace: 'statistic_currency' },
        { root: true }
      );
      dispatch(
        'setAlert',
        {
          type: 'error',
          errorStatus: error.response.status,
        },
        { root: true }
      );
      commit(
        'SET_LOADING',
        { namespace: 'statistic_currency', value: true },
        { root: false }
      );
    }
  },
};
