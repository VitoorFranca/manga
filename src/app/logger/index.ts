import pino from "pino";

import { environment } from "app/environment";
import { isLocal } from "app/environment/isEnvironment";
export type Logger = pino.Logger;

let logger: Logger;

export const transport = isLocal
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "SYS:HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    }
  : {};

function registerLoggerHook({
  currentLogLevel,
  method,
  fn,
}: {
  currentLogLevel: number;
  method: typeof environment.LOG_LEVEL;
  fn: (args?: unknown) => void;
}) {
  const levels: pino.LevelMapping["values"] = {
    error: 50,
    warn: 40,
    info: 30,
  };

  const shouldCallHook = method in levels && levels[method] === currentLogLevel;

  if (!shouldCallHook) return;

  fn();
}

function captureLogError(logMessage: Error | string) {
  const errorMessage = logMessage instanceof Error ? logMessage?.message : logMessage;

  console.error(errorMessage);

}

export const init = (): pino.Logger => {
  if (logger) {
    return logger;
  }

  logger = pino({
    ...transport,
    level: environment.LOG_LEVEL,
    formatters: {
      level(label: string) {
        return { level: label };
      },
    },
    hooks: {
      logMethod(args, _, currentLogLevel) {
        registerLoggerHook({
          currentLogLevel,
          method: "error",
          fn: () => captureLogError(args[0]),
        });
      },
    },
  });

  return logger;
};

export default { init };
