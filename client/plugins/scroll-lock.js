import Vue from 'vue';

Vue.directive('scroll-lock', {
  update: (el, { value }) => {
    if (value) {
      return document.body.classList.add('no-overflow');
    }
    document.body.classList.remove('no-overflow');
  },
});
