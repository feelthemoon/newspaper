export const actions = {
  async signin({ commit, dispatch }, data) {
    try {
      const res = await this.$axios.post(this.$routes.signin, data);
      commit('SET_TOKEN', res.headers.authorization, { root: true });
    } catch (e) {
      dispatch(
        'setError',
        { errorData: e, namespace: 'signin' },
        { root: true }
      );
    }
  },
  async signup({ commit, dispatch }, data) {
    try {
      const res = await this.$axios.post(this.$routes.signup, data);
      commit('SET_TOKEN', res.headers.authorization, { root: true });
    } catch (e) {
      dispatch(
        'setError',
        { errorData: e, namespace: 'signup' },
        { root: true }
      );
    }
  },
  async logout() {
    try {
      await this.$axios.$post(this.$routes.logout);
    } catch (e) {
      console.log(e);
    }
  },
};
