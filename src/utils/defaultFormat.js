export const formatPrice = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const titleShorten = (str, maxLen, separator = " ") => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};
