//filtering articles
export const filterArticles = (arr, filters) => {
  let sectionArr = [], specArr = [];

  if (filters.section) {
    sectionArr = arr
      .filter(o => o.section === filters.section);
  } else {
    sectionArr = arr;
  };

  if (filters.speciality) {
    specArr = sectionArr
      .filter(o => o.speciality === filters.speciality);
  } else {
    specArr = sectionArr;
  };

  if (filters.audience) {
    return specArr
      .filter(o => o.audience === filters.audience);
  } else {
    return specArr;
  };
};
