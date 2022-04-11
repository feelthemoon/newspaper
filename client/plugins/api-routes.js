const API_PREFIX = 'api/v1/';
const API_ADMIN_PREFIX = `${API_PREFIX}/admin/`;

export default ({ app }, inject) => {
  const routes = {
    signin: 'signin',
    signup: 'signup',
    logout: 'logout',
  };
  inject('routes', routes);
};
