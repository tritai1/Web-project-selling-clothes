module.exports = (query)=>{
   
    let buttonAll = [
        {
            name:"Tất cả ",
            class: "",
            status:""
        },
        {                                // trả các tính năng ra từ back end nếu sau này có thêm nhiều tính năng khác thì cũng thêm vào từ phía be
            name:"Hoạt động",
            class: "",
            status:"active"
        },
        {
            name:"Dừng hoạt động",
            class: "",
            status:"inactive"
        },
    ]
    
    if(query.status){
        const index = buttonAll.findIndex(item=> item.status == query.status); // duyển qua tứng vị trí trong mảng và lấy ra phần tử trừng status
        buttonAll[index].class ="active"; // khi lắng nghe sự kiện thig nếu trùng nhau thì tự động add cái class active vào 
    } else {
        const index = buttonAll.findIndex(item=> item.status == ""); // nếu kiểm tra trả về một chuỗi rổng thì cũng tự động thêm vào 1 class active
        buttonAll[index].class ="active";
    }
    return buttonAll;
}