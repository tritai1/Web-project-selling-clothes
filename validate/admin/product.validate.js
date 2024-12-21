module.exports.createValidate = (req, res, next)=>{
    if (!req.body.title){
        req.flash('error', `Bạn chưa nhập tiêu đề`);
        res.redirect('back')
        return;
    }
    
    next();
} 