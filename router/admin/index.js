const routerAdmin = require('./admin.router')
const productRouter = require('./product.router')
const systemPath = require('../../config/system')
const PATH_URL = systemPath.firstPath;
module.exports = (app)=>{

    app.use('/', routerAdmin)
    
    try {
       app.use(PATH_URL+'/product', productRouter)
       console.log("thanh cong");
       

    } catch (error) {
        console.log(error, 'that bai');
        
    }
}