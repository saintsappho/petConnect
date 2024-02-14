export default function useFormatDateTime(datetimeString) {
  // Parse the datetime string to a Date object
  const originalDate = new Date(datetimeString);

  // Subtract 2 hours
  const modifiedDate = new Date(originalDate.getTime() + 22 * 60 * 60 * 1000);

  // Format the modified date
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };

  const formattedDateTime = modifiedDate.toLocaleString('en-US', options);
  return formattedDateTime;
}