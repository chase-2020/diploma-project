
const Service = require('egg').Service;
const fs = require('fs');
const utils = require('utility');
class ImagesService extends Service {

    async uploadImg() {
        const { ctx } = this;
        let { type } = ctx.request.body;
        type = type || 'abc';
        console.log(ctx.request)
        console.log('request.body is', ctx.request.body);
        // if (!type) return ctx.error('请确定你要上传的文件类型');
        if (!type) return ctx.body = '请确定你要上传的文件类型';
        const file = ctx.request.files[0];

        // 重命名文件
        const ext = file.filename.split('.').pop();
        const _file = `${new Date().getTime()}.${ext}`;
        // const _date = utils.YYYYMMDD('');
        try {
            const res = await ctx.oss.put(`fpzImage/${type}/${_file}`, file.filepath);
            // ctx.success('上传成功', res);
            return { success:true,url: `http://static.1775.net.cn/fpzImage/${type}/${_file}` }
        } catch (e) {

            ctx.error('上传错误');
            return false;
        } finally {
            //fs.unlink(file.filepath);
        }
    }
}
module.exports = ImagesService;