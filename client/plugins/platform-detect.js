import Vue from 'vue';

const BREAKPOINTS = {
  xxlDesktop: 2300,
  xlDesktop: 1800,
  desktop: 1440,
  tablet: 900,
  mobile: 650,
};
const detector = {
  devices: {
    mobile: false,
    tablet: false,
    desktop: false,
    xlDesktop: false,
    xxlDesktop: false,
  },

  updateDevice(key) {
    Object.keys(this.devices).forEach((objKey) => {
      this.devices[objKey] = objKey === key;
    });
  },

  platformBySize() {
    Object.keys(BREAKPOINTS).forEach((breakPoint) => {
      if (window.innerWidth <= BREAKPOINTS[breakPoint]) {
        this.updateDevice(breakPoint);
      }
    });
  },
};

export default (_, inject) => {
  if (typeof window !== 'undefined') {
    detector.platformBySize();
    window.addEventListener('resize', detector.platformBySize.bind(detector));
    inject('device', Vue.observable(detector.devices));
  } else {
    inject('device', detector.devices);
  }
};
