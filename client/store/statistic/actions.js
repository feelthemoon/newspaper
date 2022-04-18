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
  async getWeather({ commit }, geolocation) {
    try {
      let geoObj = geolocation;
      if (!Object.keys(geolocation).length) {
        geoObj = { lat: 55.751244, lon: 37.618423 };
      }

      const res = await this.$axios.get(
        this.$routes.routeFactory('statistic', 'weather', [], geoObj)
      );
      commit('UPDATE_WEATHER', res.data);
      commit(
        'SET_LOADING',
        { namespace: 'statistic_weather', value: false },
        { root: true }
      );
    } catch (error) {
      dispatch(
        'setError',
        { errorData: error, namespace: 'statistic_weather' },
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
        { namespace: 'statistic_weather', value: true },
        { root: false }
      );
    }
  },
};
