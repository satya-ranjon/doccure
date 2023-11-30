const timeFormat = (data) => {
  const time = new Date(data);
  const timeFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return timeFormat.format(time);
};

export default timeFormat;
