export default (obj: any) => {
  const definedValues = Object.keys(obj).filter(
    (key) => obj[key] !== undefined,
  );

  const urlParams = definedValues
    .map((key) => {
      const value = obj[key];

      if (Array.isArray(value)) {
        return value.map((val) => `${key}=${val}`).join('&');
      }

      return `${key}=${value}`;
    })
    .join('&');

  return urlParams ? `?${urlParams}` : '';
};
