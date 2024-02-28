export const keyExtractor = (item, index) => 'item_' + item?.id + '_' + index;

export function capitalizeFirstLetter(message: string) {
  return message.charAt(0).toUpperCase() + message.slice(1);
}
