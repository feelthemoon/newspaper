export default {
  articles: (state) => state.articles,
  hasNewArticles: (state) => state.hasNewArticles,
  translateCategory: (state) => (category) =>
    state.translateCategory[category] ?? 'Другое',
};
