import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { createLogger, format, transports } from 'winston';

const logDir = join(__dirname, '../../logs');
const isDevEnv = process.env.NODE_ENV === 'develop';
const isTestEnv = process.env.NODE_ENV === 'test';

// Create the log directory if it does not exist
if (!existsSync(logDir)) {
	mkdirSync(logDir);
}
const debugLog = join(logDir, 'debug.log');
const testsLog = join(logDir, 'tests.log');
const errorsLog = join(logDir, 'errors.log');
const exceptionsLog = join(logDir, 'exceptions.log');
const rejectionsLog = join(logDir, 'rejections.log');

const Logger = createLogger({
	format: format.simple()
});

if (isDevEnv) {
	Logger.add(
		new transports.Console({
			level: 'debug',
			format: format.combine(format.colorize(), format.simple())
		})
	);

	Logger.add(
		new transports.File({
			filename: debugLog,
			level: 'debug',
			format: format.combine(
				format.timestamp(),
				format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
			)
		})
	);
} else {
	Logger.add(
		new transports.File({
			filename: isTestEnv ? testsLog : errorsLog,
			level: 'error',
			format: format.json()
		})
	);

	Logger.exceptions.handle(
		new transports.File({
			filename: isTestEnv ? testsLog : exceptionsLog,
			format: format.json()
		})
	);

	Logger.rejections.handle(
		new transports.File({
			filename: isTestEnv ? testsLog : rejectionsLog,
			format: format.json()
		})
	);
}

export default Logger;
