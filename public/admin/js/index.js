// tính năng lọc theo trạng thái 
const buttonStatus = document.querySelectorAll("[button-status]"); // biến do chúng ta tự khai báo thì để trong ngoặc vuông để lấy ra 
if(buttonStatus.length > 0 ){
     
    buttonStatus.forEach(button=>{
        let url = new URL(window.location.href);
        console.log(url);
        button.addEventListener("click", ()=>{
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href;
            
            
        })
    })

}
// 

// tính năng tìm kiếm

const search = document.querySelector("#form-search");
if(search){
    const url = new URL(window.location.href);
    search.addEventListener("submit", (e)=>{
        e.preventDefault();
        console.log(e.target.keyword.value);
        const keyword = e.target.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
        
    })
}

// pagination

const buttonPagination = document.querySelectorAll("[button-pagination]");
console.log(buttonPagination);
if(buttonPagination.length > 0){
    buttonPagination.forEach(button=>{
        const url = new URL(window.location.href);
        button.addEventListener("click", ()=>{
            const page = button.getAttribute("button-pagination");
            console.log(page);
            if(page){
              url.searchParams.set("page", page);
            } else{
                url.searchParams.delete("page");
            }

            window.location.href = url.href;
            
        })
    })
}

// thay doi trang thai cua nhieu san pham
const checkBoxMulti = document.querySelector("[check-box-multi]")
if(checkBoxMulti){
    const checkAll = checkBoxMulti.querySelector("input[name='checkAll']");
    const inputIds = checkBoxMulti.querySelectorAll("input[name='id']");
    checkAll.addEventListener("click", ()=>{
        console.log(checkAll.checkeds);
        if(checkAll.checked){
            inputIds.forEach(input=>{
                input.checked = true;
            }) 
        } else {
            inputIds.forEach(input=>{
                input.checked = false;
            })
        }
        
    })

    inputIds.forEach(input=>{
        input.addEventListener("click", ()=>{
            const currentCheckbox = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if (currentCheckbox == inputIds.length){
                checkAll.checked = true;
            } else {
                checkAll.checked = false;
            }
            
        })
    })   
}
// form-change-multi xử lý xóa thay đổi vị trí checkbox
const  formChangeMulti = document.querySelector("[form-change-multi]");
console.log(formChangeMulti);
if (formChangeMulti){
    formChangeMulti.addEventListener("submit", (e)=>{
        e.preventDefault();
        const checkBoxMulti = document.querySelector("[check-box-multi]");
        const inputCheckbox = checkBoxMulti.querySelectorAll("input[name='id']:checked");
        console.log(inputCheckbox);
        // xửa lý xóa nhiều
        const changeType = e.target.elements.type.value;        
        if(changeType == "deleted-All"){
            const fromConfirm = confirm("bạn có muốn xóa tất cả không")
            if(!fromConfirm){
                return
            }
        }

        if (inputCheckbox.length > 0){
            const ids = [];
            const inputIds =document.querySelector("input[name='ids']")
            inputCheckbox.forEach(input => {
                const id = input.getAttribute("value");
                if(changeType == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);                    
                } else {
                  ids.push(id)
                }
                
            })
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();   
        }
    })
}

// xử lý thông báo trên giao diện 
const showAlert = document.querySelector("[show-alert]")
console.log(showAlert);

if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    console.log(time);
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden");
    }, time)    
    closeAlert.addEventListener("click", ()=>{        
        showAlert.classList.add("alert-hidden");
    })
}

// xử lí giao diện hiện thị ảnh lên khi uploads ảnh 
const fromChangMulti = document.querySelector("[form-change-multi]")
if(formChangeMulti){
    const uploadsImgInput = document.querySelector("[uploads-img-input]");
    const uploadsImgPreview = document.querySelector("[uploads-img-preview]");
    uploadsImgInput.addEventListener("change", (e)=>{
        console.log(e.target)
        const file = e.target.files[0];
        if(file){
           uploadsImgPreview.src = URL.createObjectURL(file)
        }
    })
}

// xử lý xóa ảnh trên giao diện
const fromChangMultis = document.querySelector("[form-change-multi]")
if (fromChangMultis){
    const uploadsImgInput = document.querySelector("[uploads-img-input]");
    const uploadsImgPreview = document.querySelector("[uploads-img-preview]");
    const deleteImg = document.querySelector("[delete-img]");
    deleteImg.addEventListener("click", ()=>{
          uploadsImgInput.value = "";
          uploadsImgPreview.src = "";
    })
}