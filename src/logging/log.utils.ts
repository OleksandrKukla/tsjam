import { LogContext } from './types';

export const tagsLine = (tags: readonly string[] | undefined): string => {
  return tags?.length
    ? `[${tags.map(tag => `#${tag}`).join()}]`
    : ''
}

export const stringNode = (value: string | undefined): string => {
  return value?.length
    ? `[${value}]`
    : ''
}

export const contextLine = (context: LogContext | undefined): string => {
  if (!context) {
    return '';
  }

  // eslint-disable-next-line functional/no-let
  let line = ''
  Object.keys(context).forEach(key => {
    line += key !== 'tags'
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      ? stringNode(`${context[key]}`)
      : tagsLine(context[key])
  });
  return line
}