const validator = require('validator')
const userModel = require('../models/user')
const userProp = require('../properties/user')

module.exports = {
  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async create( user ) {
    const result = await userModel.create(user)
    return result
  },
  /**
   *
   * @param  {object} data 查找的表单数据
   * @return {object|null} 查找结果
   */
  async getExistOne(data) {
    const result = await userModel.getExistOne({
      'email': data.email,
      'name': data.userName
    })
    return result
  },

  /**
   * 登录业务操作
   * @param  {object} data 登录表单信息
   * @return {object}      登录业务操作结果
   */
  async signIn(data) {
    const result = await userModel.getOneByUserNameAndPassword({
      'password': data.password,
      'name': user.userName
    })
    return result
  },
  /**
   * 根据用户名查找用户业务操作
   * @param {string} userName 用户名
   * @return {object|null}    查找结果
   */
  async getUserInfoByUserName( userName ) {
    const result = await userModel.getUserInfoByUserName( userName ) || {}

    const userInfo = {
      email: result.email,
      userName: result.name,
      detailInfo: result.detail_info,
      createTime: result.create_time
    }
    return userInfo
  },

  validatorSignUp( userInfo ) {
    const result = {
      success: false,
      message: '',
    }

    // 验证用户名是否符合规则返回错误提示语
    if(/[a-z0-9\_\-]{6,16}/.test(userInfo.userName) === false) {
      result.message = userProp.ERROR_USER_NAME
      return result
    }
    //验证email
    if(!validator.isEmail( userInfo.email )) {
      result.message = userProp.ERROR_EMAIL
      return result;
    }
    //验证密码
    //字母或者数字
    if(!/[\w+]{6,16}/.test( userInfo.password )) {
      result.message = userProp.ERROR_PASSWORD
      return result;
    }
    // 验证密码是否相同
    if( userInfo.password !== userInfo.confirmPassword ) {
      result.message = userProp.ERROR_PASSWORD_CONFORM
      return result
    }

    result.success = true
    return result
  }





}