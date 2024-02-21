/*
 * 秒数转换分钟
 * */
export function transformSecond(second: number): string {
  return `${Math.floor(second / 60)}:${Math.floor(second % 60)}`;
}
