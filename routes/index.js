const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const users = require('./users')
const error = require('./error')


router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/error', error.routes(), error.allowedMethods())



module.exports = router
