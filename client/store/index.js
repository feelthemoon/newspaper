import Vue from 'vue';

export const state = () => ({
  token: null,
  errors: {},
  loading: {},
});

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_ERROR(state, errorData) {
    if (state.errors[errorData.namespace]) {
      state.errors[errorData.namespace] = {
        ...state.errors[errorData.namespace],
        [errorData.errorType]: errorData.errorMessage,
      };
    } else {
      Vue.set(state.errors, errorData.namespace, {
        [errorData.errorType]: errorData.errorMessage,
      });
    }
  },
  SET_LOADING(state, loadingData) {
    if (state.loading[loadingData.namespace]) {
      state.loading[loadingData.namespace] = loadingData.value;
    } else {
      Vue.set(state.loading, loadingData.namespace, loadingData.value);
    }
  },
  RESET_ERROR(state, namespace) {
    if (namespace) {
      state.errors[namespace] = null;
    } else {
      state.errors = {};
    }
  },
};

export const actions = {
  setError({ commit }, { errorData, namespace }) {
    let errorType = '',
      errorMessage = '';
    if (errorData.response?.data) {
      [errorType, errorMessage] = Object.entries(
        JSON.parse(errorData.response.data.message)
      ).flat();
    }
    commit('SET_ERROR', {
      namespace,
      errorType,
      errorMessage,
    });
  },
  resetErrors({ commit }, namespace) {
    commit('RESET_ERROR', namespace);
  },
};
export const getters = {
  token: (state) => state.token,
  error: (state) => (namespace) => Object.values(state.errors[namespace] ?? {}),
  loading: (state) => (namespace) => state.loading[namespace],
};
