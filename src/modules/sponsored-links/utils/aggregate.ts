interface AggregateSponsoredLinksParams {
  keyword: string;
  data: Record<string, string[]>;
}
function aggregateSponsoredLinks(data: AggregateSponsoredLinksParams[]) {
  return data.map((item) => ({
    keyword: item.keyword,
    data: Object.values(item.data).flat(), // Преобразование объекта в массив значений и сглаживание
  }));
}

export { aggregateSponsoredLinks };
