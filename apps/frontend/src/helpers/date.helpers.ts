const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function formatDate(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const now = new Date();
  const calculatedDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (calculatedDays === 0) {
    return `Today ${hours}:${minutes}`;
  } else if (calculatedDays === 1) {
    return `Yesterday ${hours}:${minutes}`;
  } else if (calculatedDays <= 7) {
    return `${days[date.getDay()]} ${hours}:${minutes}`;
  } else {
    return `${date.getDate()} ${months[date.getMonth()]} ${hours}:${minutes}`;
  }
}
