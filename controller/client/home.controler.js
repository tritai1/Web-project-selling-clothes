const Product = require("../../models/product.model");
const helper = require("../../helper/search.helper")
module.exports.home = async (req, res)=>{
    
    const find = {
        deleted: false,
        status: "active"
    }
    
    const search = helper(req.query)

    if(search.regex){
        find.title = search.regex;
    }

    const product = await Product.find(find);
    res.render("client/page/home/home.pug", {
        title: "trang chủ",
        product: product,
        keyword: search.keyword
    })
}

