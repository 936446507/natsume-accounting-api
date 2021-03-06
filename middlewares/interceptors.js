const config = require('../public/javascripts/config');

const allowApis = ['/user/login', '/user/register']

const interceptors = async (ctx, next) => {
  const {originalUrl: url, request } = ctx;
  const isAllow = allowApis.some(api => url.includes(api));
  const session = ctx.session;

  if (!isAllow && (!session.user || !session.user.is_login)) {
    ctx.error_code = config.NO_LOGIN;
    ctx.error_message = 'no login!';
  } else {
    ctx.request.body = request.query || request.body;
    await next();
  }

}

module.exports = interceptors;