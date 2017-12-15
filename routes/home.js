const router = require('koa-router')()
const index = require('../controllers/index')
router.prefix('/')



module.exports = router.get('/', index)
