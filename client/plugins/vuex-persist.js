import VuexPersistence from 'vuex-persist';

export default ({ store }) => {
  new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({ token: state.token }),
    filter: (mutation) => mutation.type === 'SET_TOKEN',
  }).plugin(store);
};
