const ProductPage = require("../../models/product.model")
const searchhelper = require("../../helper/search.helper");
const e = require("method-override");

// const models = require("../../models/product.model")

module.exports.product = async (req, res)=>{
    try {
        const find = {
            deleted: false
        }
    
        const search = searchhelper(req.query);
    
        if(search.regex){
            find.title = search.regex;
        }   
    
        const ojectPage = {
            curentPage: 1,
            itemPage: 6
        }
    
           
        if(req.query.page){
            ojectPage.curentPage = parseInt(req.query.page);
        }
    
        ojectPage.skip = (ojectPage.curentPage - 1)*6;
        
        const productPages = await ProductPage.find(find);
        const total = Math.ceil(productPages.length/ojectPage.itemPage);
        ojectPage.totalPage = total;
        
    
    
        const product = await ProductPage.find(find).sort({position: "desc"}).limit(ojectPage.itemPage).skip(ojectPage.skip);    
        
        const priceNew = product.map(item=>{
            item.discountPercentage = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        })
        console.log(product);
        res.render("client/page/product/product.pug", {
            
            product: product,
            priceNew: priceNew
            
        })
    } catch (error) {
        console.log(error);
        
    }
}

module.exports.detail = async (req, res)=>{

    const find = {
        deleted: false,
        slug: req.params.slug
    }
    try {
        const product = await ProductPage.findOne(find)
        res.render("client/page/product/detail.pug",{

            title: product.slug,
            product: product
    
        })
    } catch (error) {
        
    }
    
}
