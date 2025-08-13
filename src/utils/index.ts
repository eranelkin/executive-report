// floor cause if it will be ceil the total can be more or equal to 100% and the other will not be there
const calcPrecentage = (count: number, item: any) => {
  return count !== 0 ? Math.round((item / count) * 100) : 0;
};

const calcTotal = (data: any, count: number) => {
  return data.reduce((all: number, curr: any) => {
    return all - calcPrecentage(count, Object.values(curr)[0]);
  }, 100);
};

// const normalizeItemsPercentage = (items: any) => {
//   const values = items.map((item: any) => item.value);
//   const maxValue = Math.max(...values);
//   const restValues = items.reduce((all: any, curr: any) => {
//     return curr.value !== maxValue ? all + curr.value : all;
//   }, 0);
//   const newMaxValue = 100 - restValues;

//   return items.reduce((all: any, curr: any) => {
//     return curr.value === maxValue ? [...all, { ...curr, value: newMaxValue }] : [...all, curr];
//   }, []);
// };

const normalizeItemsPercentage = (items: any) => {
  if (!items.length) return items;
  const total = items.reduce((sum: number, item: any) => sum + item.value, 0);

  if (total === 100) {
    return items;
  } else if (total > 100) {
    const gap = total - 100;
    const max = Math.max(...items.map((i: any) => i.value));
    const item = items.filter((f: any) => f.value === max)[0];
    item.value -= gap;
    return items;
  } else if (total < 100) {
    const gap = 100 - total;
    items[0].value = items[0].value + gap;
    return items;
  }
};

const getParamFromUrl = (param: string): string => {
  const decodedURI = decodeURIComponent(window.location.href);
  const url = new URL(decodedURI);
  const value = url.searchParams.get(param);
  return value || '';
};

export { calcPrecentage, calcTotal, normalizeItemsPercentage, getParamFromUrl };
