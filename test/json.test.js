
const supertest = require('supertest');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

app.use(router.routes()).use(router.allowedMethods())

router.get('/test', async (ctx, next) => {
    ctx.body = {
        title: 'test'
    };
})

test('验证接口的返回格式是不是 json', async () => {
    const res = await supertest(app.callback()).get('/test');
    expect(res.body).toEqual({
        title: 'test'
    });
    expect(res.body.title).toBe('test');
});