import { Meteor } from 'meteor/meteor';
import { log4js } from 'log4js';

if (Meteor.isServer()) {
    // Pick up the server directory to store the log file in the /logs folder
    log4js.configure({
        appenders: {
            out: { type: 'stdout', layout: { type: 'colored' }, pattern: '%d %p %c %f:%l %m%n' },
            app: { type: 'file', layout: { type: 'colored' }, pattern: '%d %p %c %f:%l %m%n', filename: 'app.log' }
        },
        categories: {
            default: { appenders: ['out', 'app'], level: 'debug' }
        }
    });
} else {
    log4js.configure({
        appenders: {
            console: { type: 'console', layout: { type: 'colored' }, pattern: '%d %p %c %f:%l %m%n' },
        },
        categories: {
            default: { appenders: ['console'], level: 'debug' }
        }
    });
}

const logger = log4js.getLogger('logger.js');
logger.info('Logging initialized');

export { log4js}