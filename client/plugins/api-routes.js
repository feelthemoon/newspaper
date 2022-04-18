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

const getQueryParamsString = (params) => {
  let queryString = '';
  const entries = Object.entries(params);

  if (entries.length) {
    entries.forEach(([key, value]) => {
      queryString += `${key}=${value}&`;
    });
    queryString = `?${queryString.slice(0, queryString.length - 1)}`;
  }
  return queryString;
};

const getDynamicParamsString = (params) => {
  if (params.length) {
    return `/${params.join('/')}`;
  }
  return '';
};

export default ({ app }, inject) => {
  const routes = {
    signin: 'signin',
    signup: 'signup',
    logout: 'logout',
    routeFactory: (prefix, type, dynamicParams = [], queryParams = {}) =>
      `${getPrefix(prefix || '')}/${type}${getDynamicParamsString(
        dynamicParams
      )}${getQueryParamsString(queryParams)}`,
  };
  inject('routes', routes);
};
