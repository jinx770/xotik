
(async () => {


    window.cache = []

    window.addImageListingInput = document.querySelector(".ignore-me") || "";
    window.addImageListingButton = document.querySelector(".add-img-btn") || "";
    window.listingButton = document.querySelector(".listing-btn") || "";

    window.fileInput = document.querySelector(".ignore-me") || "";
    window.uploadField = document.querySelector(".add-img-btn") || "";
    window.imageHolder = document.querySelector(".images") || "";



// ----------------------------------------------------------------------------------------------------------------------------------



    let handleFileSelect = (e) => {

        setInterval(() => {

             if (cache.includes(fileInput.value)) {
                 return
             }

            cache.push(fileInput.value)
            console.log(fileInput.value)

        }, 500)

    }



// ----------------------------------------------------------------------------------------------------------------------------------



    addImageListingButton.addEventListener('click', () => {
        addImageListingInput.click()
        handleFileSelect()
    })




})();
