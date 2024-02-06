export default function useFormatDateTime(datetimeString) {
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
  };

  const formattedDateTime = new Date(datetimeString).toLocaleString('en-US', options);
  return formattedDateTime;
}