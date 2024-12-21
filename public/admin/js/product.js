const ChangeStatus = document.querySelectorAll("[form-change-status]");
console.log(ChangeStatus);
if(ChangeStatus.length > 0){
    const formStatusChange = document.querySelector("[form-status-change]")
    const path = formStatusChange.getAttribute("path")
    ChangeStatus.forEach(button => {
        button.addEventListener("click", ()=>{

            const statusCurrent = button.getAttribute("change-status");
            const id = button.getAttribute("change-id");
            console.log(statusCurrent);
            console.log(id);
            
            const changeStatusCurrent = statusCurrent == "active" ? "inactive" : "active";
            const action = path + `/${changeStatusCurrent}/${id}?_method=PATCH`
            console.log(changeStatusCurrent);
            
            formStatusChange.action = action;
            formStatusChange.submit()
        
        })
    })
}

// tính năng xóa sản phẩm
const deleteItem = document.querySelectorAll("[delete-item]")
console.log(deleteItem);
if(deleteItem){
    deleteItem.forEach(button=>{
        const formDelete = document.querySelector("[form-delete]");
        const path = formDelete.getAttribute("path")
        button.addEventListener("click", ()=>{
            const isconfirm = confirm("Bạn có muốn xóa sản phẩm này không")
            if(isconfirm){
                const id = button.getAttribute("data-id");
                console.log(id);
                
                const action = `${path}/${id}?_method=PATCH`;
                console.log(action);
                formDelete.action = action;
                formDelete.submit();
            }
        })
    })
}


