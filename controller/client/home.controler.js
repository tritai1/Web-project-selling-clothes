module.exports.home = (req, res)=>{
    res.render("client/page/home/home.pug", {
        title: "trang chủ",
    })
}
