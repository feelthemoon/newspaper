const API_PREFIX = 'api/v1/';
const API_ADMIN_PREFIX = `${API_PREFIX}/admin/`;

const getPrefix = (prefix, hasApiPrefix = true, isAdmin = false) => {
  const apiPrefix =
    hasApiPrefix && isAdmin
      ? API_ADMIN_PREFIX
      : hasApiPrefix && !isAdmin
      ? API_PREFIX
      : '';
  return apiPrefix + prefix;
};
export default ({ app }, inject) => {
  const routes = {
    signin: 'signin',
    signup: 'signup',
    logout: 'logout',
    articles: (type, dynamicParams = [], queryParams = []) =>
      `${getPrefix('articles')}/${type}/${dynamicParams.join(
        '/'
      )}?${queryParams.join('&')}`,
  };
  inject('routes', routes);
};
