import { PipeFn } from '../core';

import { LogLevel } from './level.enum';

/**
 * String label for quick search across logs.
 * Note: '#' would be added automatically
 */
export type LogTag = string;

/**
 * Context which you could add as a first argument to any of jamLogger methods
 */
export interface LogContext {
  readonly [key: string]: unknown;
  readonly tags?: readonly LogTag[];
  readonly withStack?: boolean;
  readonly sanitize?: readonly string[];
}

export type LogEntry = {
  readonly date: Date;
  readonly level: LogLevel;
  readonly message: string,
  readonly appId?: string,
  readonly context?: LogContext;
  readonly data?: readonly unknown[];
  readonly stack?: string;
}

/**
 * Implement this API in order to receive log writes into your custom output.
 */
export interface LogOutput {
  write(e: LogEntry): void;
}

/**
 * Sets the logLevel for your particular output channel.
 */
export type LogOutputChannel = {
  readonly out: LogOutput;
  readonly level?: LogLevel;
}

export type LogMessage = {
  readonly message: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly data: readonly any[],
}

/** Log Message mapping layer, common use-case is sensitive data sanitization */
export type LogTranslator<U = unknown> = {
  readonly map: PipeFn<LogMessage, U>;
}
