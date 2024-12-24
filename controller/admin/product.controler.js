const ProductPage = require("../../models/product.model");
const searchHelper = require("../../helper/search.helper");
const statusHelper = require("../../helper/statusFillter.helper")
const path = require('../../config/system');
const system = require("../../config/system");
module.exports.product = async (req, res)=>{  
    
    let statusFillter = statusHelper(req.query)

    let find = {
        deleted: false,
    }
    if(req.query.status){
        find.status = req.query.status;
    }

    //
    const search = searchHelper(req.query);
    if (search.regex){
        find.title = search.regex;
    }
    // let keyword = " "

    // if (req.query.keyword){
    //     keyword = req.query.keyword;

    //     const regex = new RegExp(keyword, "i");
    //     find.title = regex;
    // }

    // /pagination
    const ojecPagination = {
        currentPage: 1,
        pageItem: 4
    }
    if(req.query.page){
        ojecPagination.currentPage = parseInt(req.query.page);
    }
    ojecPagination.skip = ((ojecPagination.currentPage - 1)*4);

    const products = await ProductPage.find(find);
    console.log(products.length);
    
    const total = Math.ceil(products.length/ojecPagination.pageItem);
    console.log(total);
    
    ojecPagination.total = total;
        

    const product = await ProductPage.find(find).sort({position: "desc"}).limit(ojecPagination.pageItem).skip(ojecPagination.skip);
    // console.log(product);
    
    res.render('admin/pages/product/product.pug',{
        title: "Product",
        "product": product,
        buttonAll: statusFillter,
        keyword: search.keyword,
        pagination: ojecPagination
    })
    
}

// tinh nang thay doo trang thai cua mot san pham
module.exports.changeStatus = async (req, res)=>{
    const currenstatus = req.params.status;
    const id = req.params.id;
    await ProductPage.updateOne({_id: id}, {status: currenstatus})
    req.flash('success', `Thay đổi trạng thái thành công`);
    res.redirect('back')

}

// tinhs nang thay doi trang thai cau nhieu san pham
module.exports.changeMulti = async (req, res)=>{
    console.log(req.body);
    
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    console.log(type);
    console.log(ids);
    
    switch (type) {
        case "active":
            await ProductPage.updateMany({_id: {$in: ids}}, {status: "active"});
            req.flash('success', `Thay đổi trạng thái ${ids.length} sản phẩm thành công`);
            break;
        case "inactive": 
            await ProductPage.updateMany({_id: {$in: ids}}, {status: "inactive"});
            req.flash('success', `Thay đổi trạng thái ${ids.length} sản phẩm thành công`); // form thông báo 
            break;
        case "deleted-All": // tính năng xóa nhiều 
            await ProductPage.updateOne({_id: ids}, 
                {
                    deleted: true,
                    deletyedAt: new Date()
                })
                req.flash('success', `xóa sản phẩm thành công`);
            break;
        case "change-position": 
             for(const item of ids){
                let [id, position] = item.split("-");
                position = parseInt(position);
                await ProductPage.updateOne({_id: id}, {position: position}) 
                req.flash('success', `Thay đổi vị trí ${ids.length} thành công`)
             }    
             break;
        default:
            break;
    }

    res.redirect('back') 
}

// tính năng xóa 
module.exports.deleteItem = async (req, res)=>{
    const id = req.params.id;
    console.log(id);
    
    await ProductPage.updateOne({_id: id}, 
        {
            deleted: true,
            deletyedAt: new Date()
        })  // ở đây nó sẽ xóa đi vĩnh viễn và xóa luôn ở trong database 

    res.redirect("back");
}

module.exports.recycle = async (req, res)=>{
    let find  = {
        deleted: true
    }

    const ojectPage  = {
        currentPage: 1,
        pageItem: 4
    }

    if(req.query.page){
        ojectPage.currentPage = req.query.page
    }

    ojectPage.skip = ((ojectPage.currentPage - 1)*4)

    const productpage = await ProductPage.find(find);
    const total = Math.ceil((productpage.length/ojectPage.pageItem));
    ojectPage.total = total;

    const product = await ProductPage.find(find).limit(ojectPage.pageItem).skip(ojectPage.skip);


    res.render("admin/pages/product/recycle.pug",{
        title: "recycle",
        product: product,
        pagination: ojectPage
    })
}

module.exports.recycleDelete = async(req, res)=>{
    const id = req.params.id;
    await ProductPage.deleteOne({_id: id});
    res.redirect("back")
}

module.exports.update = async (req, res)=>{
    const id = req.params.id;
    await ProductPage.updateOne({_id: id}, 
        {
            deleted: false,
            deletyedAt: new Date()
        });
    req.flash('success', `cập nhật sản phẩm thành công`);
    res.redirect("back");
}

module.exports.changeMultiRecycle = async (req, res)=>{
    const status = req.params.status;
    const id = req.params.id;
    await ProductPage.updateOne({_id: id}, {status: status})
    req.flash('success', `Thay Đổi Trạng thái sản phẩm thành công`);
    res.redirect("back");
}

module.exports.create = (req, res)=>{
    res.render("admin/pages/product/create.pug",{
        title: "create"
    })
}

module.exports.createProduct = async (req, res)=>{
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const countProduct = await ProductPage.countDocuments();
        req.body.position = countProduct + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    
    const product = new ProductPage(req.body);
    await product.save();
    res.redirect(`${path.firstPath}/product`)
}

module.exports.editProduct = async (req, res) => {
    try {
        console.log(req.params.id);
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await ProductPage.findOne(find);
        console.log(product);
        
        res.render("admin/pages/product/edit.pug", {
            title: "edit",
            product: product
        })
    } catch (error) {
      res.redirect(`${path.firstPath}/product`)  
    }
}
module.exports.editAndUpdate = async (req, res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.position = parseInt(req.body.position);
    req.body.stock = parseInt(req.body.stock);
    if (req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    console.log(req.body);
    
    try {
        await ProductPage.updateOne({_id: id}, req.body);
        req.flash("success", "chỉnh sửa thành công");
        res.redirect("back")
    } catch (error) {
        req.flash("error", "chỉnh sửa thất bại");
        res.redirect(`${system.firstPath}/product`)
    }
}

module.exports.detail = async (req, res)=>{
    const id = req.params.id
    const find = {
        deleted: false,
        _id: id,
        status: "active"
    }
    try {
        const product = await ProductPage.findOne(find);
        res.render("admin/pages/product/detail.pug", {
            title: product.title,
            product: product
        })
    } catch (error) {
        req.flash("error", "truy cập thất bại")
    }
}