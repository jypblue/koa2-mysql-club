const dbUtils = require('../utils/db-util')

module.exports = {

  /**
   * 数据库创建用户表
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create( model ) {
    const result = await dbUtils.insertData('user', model)
    return result
  },

  /**
   * 查找一个存在用户的数据
   * @param  {object} options 查找条件参数
   * @return {object!null}    查找结果
   */
  async getExistOne( options ) {
    const sql = `
    SELECT * from user where email="${options.email}" or name="${options.name} limit 1
    `
    const result = await dbUtils.query(sql)
    if( Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   * 根据用户名和密码查找用户
   * @param  {object} options 用户名密码对象
   * @return {object|null}    查找结果
   */
  async getOneByUserNameAndPassword( options ) {
    const sql = `
    SELECT * from user where password="${options.password}" and name="${options.name}" limit 1
    `
    const result = await dbUtils.query(sql)
    if(Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },
  /**
   * 根据用户名查找用户信息
   * @param  {string} userName 用户帐号名称
   * @return {object|null}     查找结果
   */
  async getUserInfoByUserName( userName ) {
    const result = await dbUtils.select(
      'user',
      userName
    )
    if(Array.isArray(result) && result.length > 0) {
      result = result[0]
    } else {
      result = null
    }
    return result
  },


}