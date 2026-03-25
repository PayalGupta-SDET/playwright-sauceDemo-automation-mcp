/**
 * Logger Utility
 * Provides styled console logging for better test execution visibility
 */

enum LogLevel {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  DEBUG = 'DEBUG',
}

export class Logger {
  private static formatTimestamp(): string {
    return new Date().toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

  private static log(level: LogLevel, message: string, data?: any): void {
    const timestamp = this.formatTimestamp();
    const prefix = `[${timestamp}] [${level}]`;

    switch (level) {
      case LogLevel.SUCCESS:
        console.log(`✅ ${prefix} ${message}`, data || '');
        break;
      case LogLevel.ERROR:
        console.error(`❌ ${prefix} ${message}`, data || '');
        break;
      case LogLevel.WARNING:
        console.warn(`⚠️  ${prefix} ${message}`, data || '');
        break;
      case LogLevel.DEBUG:
        console.debug(`🐛 ${prefix} ${message}`, data || '');
        break;
      case LogLevel.INFO:
      default:
        console.log(`ℹ️  ${prefix} ${message}`, data || '');
    }
  }

  static info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  static success(message: string, data?: any): void {
    this.log(LogLevel.SUCCESS, message, data);
  }

  static error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  static warning(message: string, data?: any): void {
    this.log(LogLevel.WARNING, message, data);
  }

  static debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }
}
