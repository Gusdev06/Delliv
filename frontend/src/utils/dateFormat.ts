const formatDate = (dateString: string): string => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(
    undefined,
    options as Intl.DateTimeFormatOptions
  );
};

export default formatDate;
