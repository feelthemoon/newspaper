import Vue from 'vue';

export const state = () => ({
  token: null,
  errors: {},
  loading: {},
  alerts: [],
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
  SET_ALERT(state, alertData) {
    state.alerts.push(alertData);
  },
};

export const actions = {
  setAlert({ commit }, alertData) {
    if (alertData.type === 'error' && alertData.errorStatus >= 500) {
      return commit('SET_ALERT', {
        type: 'error',
        message:
          'Кажется, что-то пошло не так. Попробуйте перезагрузить страницу',
      });
    }
  },
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
  alerts: (state) => state.alerts,
};
