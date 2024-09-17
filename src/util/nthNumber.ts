const nthNumber = (number: number) => {
  if (Number.isNaN(Number(number))) return 'N/A';
  if (number > 3 && number < 21) return number + 'th';
  switch (number % 10) {
    case 1:
      return number + 'st';
    case 2:
      return number + 'nd';
    case 3:
      return number + 'rd';
    default:
      return number + 'th';
  }
};
export default nthNumber;
