const _L0 = (num: number, digits: number = 2): string => {
  let str = String(num);
  const zeros = digits - str.length;

  if (zeros <= 0) {
    return str;
  }

  for (let i = 0; i < zeros; i++) {
    str = '0' + str;
  }

  return str;
};

export default _L0;
