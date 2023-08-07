import { Bugfender } from '@bugfender/sdk'

const NextBugfender = {
    init: () => {
        Bugfender.init({
            appKey: process.env.NEXT_PUBLIC_BUGFENDER_API_KEY,
        })
    },

    log: (...messages) => {
        Bugfender.log(messages.join( ))
    },

    warn: (...messages) => {
        Bugfender.warn(messages.join( ))
    },

    error: (...messages) => {
        Bugfender.error(messages.join( ))
    },


}

export default NextBugfender;