import { ChatMessage } from '../App';

/**
 * This helper function puts messages into the map
 * grouping them by the date key depending on the time
 * interval between them i.e. if the time interval
 * between messages is more than passed argument,
 * the next message creates another group
 */
export function groupMessagesByTime(
  messages: ChatMessage[],
  timeIntervalInMinutes = 10
) {
  const messagesGrouped = new Map<Date, ChatMessage[]>();

  let dateKey = messages[0].date;
  let messagesUnderDateKey = [messages[0]];

  for (let i = 1; i < messages.length; i++) {
    const timeDifference =
      (messages[i].date.getTime() - messages[i - 1].date.getTime()) /
      (1000 * 60);

    if (timeDifference > timeIntervalInMinutes) {
      messagesGrouped.set(dateKey, messagesUnderDateKey);

      dateKey = messages[i].date;
      messagesUnderDateKey = [messages[i]];
    } else {
      messagesUnderDateKey.push(messages[i]);
    }
  }
  messagesGrouped.set(dateKey, messagesUnderDateKey);

  return messagesGrouped;
}
