const router = require('koa-router')();
const Sequelize = require('sequelize');
const { User, Sign } = require(__rootPath + '/handleModel');
const config = require(__rootPath +  '/public/js/config');
const DateUtils = require(__rootPath + '/public/js/DateUtils');

router.prefix('/user');

router.post('/sign', async (ctx, next) => {
  const { id, username } = ctx.session.user;
  const signRecord = await Sign.findAll({
    where: { uid: id },
    attributes: ['uid', 'username', 'sign_at']
  })
  const now = Date.now();
  const oneDayTime = 24 * 60 * 60 * 1000;
  const todayRangeTime = new DateUtils(now).getTodayRangeTime();

  signRecord.filter(record => record)

  Sign.upsert({
    uid: id,
    username,
    sign_at: now
  })
  // const info = await User.findOne({
  //   where: { id },
  //   attributes: ['username', 'is_today_sign', 'cnt_sign', 'sign_at']
  // })
  // const {
  //   is_today_sign: isTodaySign,
  //   sign_at: signAt
  // } = info;

  // if (
  //   info.is_today_sign &&
  //   Date.now() < new DateUtils(updatedAt).getTodayRangeTime().end
  // ) {
  //   Object.assign(ctx, {
  //     error_code: config.USER_OPERATION_ERROR,
  //     error_message: '今日已签到'
  //   })
  //   return false;
  // }

  // const data = User.update({
  //   'is_today_sign': 1,
  //   'cnt_sign': Sequelize.literal('`cnt_sign` + 1')
  // }, {where: { id }});

  // if (info) {
  //   Object.assign(ctx, {
  //     error_code: config.SUCCESS,
  //     body: {}
  //   })
  // } else {
  //   Object.assign(ctx, {
  //     error_code: config.SQL_UPDATE_ERROR,
  //     error_message: '更新字段错误'
  //   })
  // }
})

module.exports = router;