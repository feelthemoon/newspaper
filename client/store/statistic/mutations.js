export default {
  UPDATE_CURRENCY_COURSE(state, currencyCourse) {
    state.currencyCourse = { ...currencyCourse };
  },
  UPDATE_WEATHER(state, weather) {
    state.weather = { ...weather };
  },
};
