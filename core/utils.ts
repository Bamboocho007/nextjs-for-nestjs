export const addClass = (...classList: string[]) => {
  const list = classList.filter(c => c)
  const joinedList = list.join(' ')
  return joinedList;
}