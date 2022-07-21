export const formatPrice = (number) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const titleShorten = (str, maxLen, separator = " ") => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

export const formatDate = (data, format) => {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const fullDate = new Date(data);
  const year = fullDate.getFullYear();
  const arrayMonth = fullDate.getMonth();
  const month = monthNames[arrayMonth];
  const date = fullDate.getDate();
  const hour = ("0" + fullDate.getHours()).slice(-2);
  const minute = ("0" + fullDate.getMinutes()).slice(-2);

  if (format === "full") {
    return `${date} ${month} ${year}, ${hour}:${minute} `;
  } else if (format === "hours") {
    return `${hour}:${minute} `;
  } else {
    return `${date} ${month}, ${year}`;
  }
};
