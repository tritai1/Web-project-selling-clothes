const formSearch = document.querySelector("#form-search");
console.log(formSearch);
if(formSearch){
    const url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e)=>{
        const keyWord = e.target.keyword.value;
        if(keyword){
           url.searchParams.set("keyword", keyWord)
        }else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href;
        
    })
}
