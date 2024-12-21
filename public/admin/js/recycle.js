// tính năng xóa vĩnh viễn 
const deleteItem = document.querySelectorAll("[delete-item]");
if(deleteItem.length > 0){
    deleteItem.forEach(button=>{
        const formDelete = document.querySelector("#delete-item");
        const path = formDelete.getAttribute("path");
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("data-id");
            console.log(id);
            const action = path +`/${id}?_method=DELETE`;
            formDelete.action = action;
            formDelete.submit();
        })
    })
}

// tính nang update lại sản phẩm từ thùng rac
const updateitem = document.querySelectorAll("[update-item]");
if (updateitem.length > 0){

    updateitem.forEach(button=>{
        const formUpdate = document.querySelector("#update");
        const path = formUpdate.getAttribute("path");
        button.addEventListener("click", ()=>{
            const id = button.getAttribute("data-id")
            const action = path + `/${id}?_method=PATCH`;
            formUpdate.action = action;
            formUpdate.submit();
        })
    })
}

// thay đổi trạng thái 
const formChangeStatus = document.querySelectorAll("[form-change-status]");
if(formChangeStatus.length > 0){
    formChangeStatus.forEach(button=>{
        const changeMulti = document.querySelector("#change-multi");
        const path = changeMulti.getAttribute("path");
        button.addEventListener("click",()=>{
            const currentStatus = button.getAttribute("change-status");
            const id = button.getAttribute("change-id");
            
            const changeStatus = currentStatus == "active" ? "inactive" : "active";

            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            changeMulti.action = action;
            changeMulti.submit();
            
        })
    })
}