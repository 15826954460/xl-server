module.exports = (router) => {
  // 首页
  router.get('/', async (ctx, next) => {
    const session = ctx.session;
    if (!session.viewNum) {
      session.viewNum = 0;
    }
    session.viewNum+=1;
    ctx.body = {
      title: 'koas json',
      viewNum: session.viewNum,
    }
  })
}
