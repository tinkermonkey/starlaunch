import { Meteor } from 'meteor/meteor'
import App from '../imports/ui/app.svelte'
import { log4js } from '../imports/api/logger'
const logger = log4js.getLogger('main.js')

Meteor.startup(() => {
    logger.info('Starting up the Meteor client')
    new App({
        target: document.getElementById('app')
    })
})