const ProductPage = require("../../models/product.model")
const searchhelper = require("../../helper/search.helper");

// const models = require("../../models/product.model")

module.exports.product = async (req, res)=>{

    const find = {
        deleted: false
    }

    const search = searchhelper(req.query);

    if(search.regex){
        find.title = search.regex;
    }   

    const ojectPage = {
        curentPage: 1,
        itemPage: 4 
    }

       
    if(req.query.page){
        ojectPage.curentPage = parseInt(req.query.page);
    }

    ojectPage.skip = ((ojectPage.curentPage - 1)*4);
    
    const productPages = await ProductPage.find(find);
    const total = Math.ceil(productPages.length/ojectPage.itemPage);
    ojectPage.itemPage = total;
    


    const product = await ProductPage.find(find).sort({position: "desc"}).limit(ojectPage.itemPage).skip(ojectPage.skip);    
    
    const priceNew = product.map(item=>{
        item.discountPercentage = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
    })

    

    console.log(product);
    res.render("client/page/product/product.pug", {
        
        "product": product,
        "priceNew": priceNew,
        
    })
    
}
