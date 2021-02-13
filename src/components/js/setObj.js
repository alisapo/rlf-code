export const setObj = (name, value, data) => {
  let obj = {};

  if (!value) {
    return obj = {
      ...data,
      [name]: true
    };
  };

  if (value === 'all') {
    return obj = {
      ...data,
      [name]: ''
    };
  };

  return obj = {
    ...data,
    [name]: value,
  };
};
