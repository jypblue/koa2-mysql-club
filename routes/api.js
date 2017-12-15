const router = require('koa-router')()
const userController = require('../controllers/user')
router.prefix('/api')

router.get('/user/getUserInfo', userController.getLoginUserInfo)
router.post('/user/signIn', userController.signIn)
router.post('/user/signup', userController.signUp)

module.exports = router
