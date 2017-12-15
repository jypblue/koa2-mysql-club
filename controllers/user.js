const userService = require('../services/user')
const userProp = require('../properties/user')


module.exports = {
  /**
   * 登录操作
   * @param {object} ctx 上下文对象
   */
  async signIn(ctx) {
    const data = ctx.request.body
    const result = {
      success: false,
      message: '',
      data: null,
      code: ''
    }

    const userResult = await userService.signIn( data )

    // 登录结果
    if( userResult ) {
      if(data.userName === userResult.name) {
        result.success = true
      } else {
        result.message = userProp.FAIL_USER_NAME_OR_PASSWORD_ERROR
        result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
      }
    } else {
      result.code = 'FAIL_USER_NO_EXIST'
      result.message = userProp.FAIL_USER_NO_EXIST
    }

    if(data.source === 'form' && result.success === true) {
      // 存入session
      let session = ctx.session;
      session.isLogin = true
      session.userName = userResult.name
      session.userId = userResult.id

      // 返回首页
      ctx.redirect('/')
    } else {
      ctx.body = result;
    }

  },
  /**
   * 注册操作
   * @param {object} ctx 上下文对象
   */
  async signUp( ctx ) {
    const data = ctx.request.body;
    const result = {
      success: false,
      message: '',
      data: null
    }

    const validateResult = userService.validatorSignUp( data )

    if(validateResult.success === false) {
      ctx.body = validateResult
      return
    }

    // 是否已经注册过
    const existOne = await userService.getExistOne(data)
    console.log(existOne)

    if(existOne) {
      if(existOne.name === data.userName) {
        result.message = userProp.FAIL_USER_NAME_IS_EXIST
        ctx.body = result
        return
      }

      if(existOne.email === data.email) {
        result.message = userProp.FAIL_EMAIL_IS_EXIST
        ctx.body = result
        return
      }
    }

    const userResult = await userService.create({
      email: data.email,
      name: data.userName,
      password: data.password,
      create_time: +new Date(),
      level: 1
    })

    console.log(userResult)

    if(userResult && userResult.insertId * 1 > 0) {
      result.success = true
    } else {
      result.message = userProp.ERROR_SYS
    }
    ctx.body = result
  },

  /**
   * 获取用户信息
   * @param {object} ctx 上下文对象
   */
  async getLoginUserInfo( ctx ) {
    const session = ctx.session;
    const isLogin = session.isLogin;
    const userName = session.userName;
    console.log('session=', session);

    const result = {
      success: false,
      message: '',
      data: null
    }

    if( isLogin === true && userName) {
      const userInfo = await userInfoService.getUserInfoByUserName(
        userName
      )
      if(userInfo) {
        result.data = userInfo;
        result.success = true;
      } else {
        result.message = userCode.FAIL_USER_NO_EXIST;
      }
    } else {
      // TODO
    }

    ctx.body = result;
  },
  /**
   * 检验永华是否登录
   * @param {*Object} ctx 上下文对象
   */
  validateLogin(ctx) {
    const result = {
      success: false,
      message: userCode.FAIL_USER_NO_LOGIN,
      data: null,
      code: 'FAIL_USER_NO_LOGIN'
    }
    const session = ctx.session;
    if( session && session.isLogin === true) {
      result.success = true;
      result.message = '';
      result.code = '';
    }
    return result;
  }
}