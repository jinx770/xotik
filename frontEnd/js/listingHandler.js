
(async () => {


    window.cache = [""]

    window.addImageListingButton = document.querySelector(".add-img-btn") || "";
    window.listingButton = document.querySelector(".listing-btn") || "";

    window.fileInput = document.querySelector(".ignore-me") || "";
    window.imageHolder = document.querySelector(".test-div-images") || "";

    imageHolder.innerHTML = "";


// ----------------------------------------------------------------------------------------------------------------------------------


    let handleFileSelect = (e) => {

        setInterval(() => {

             if (cache.includes(fileInput.value)) {
                 return
             }

             if (!cache[4]) {
                cache.push(fileInput.value)
                console.log(fileInput.value)
                imageHolder.innerHTML += `<img src="img/heo-alt.jpg" alt="">`
            }

        }, 500)

        if (cache[4]) {
            console.log("Max uploads reached!")
            return
        }

    }



// ----------------------------------------------------------------------------------------------------------------------------------



    addImageListingButton.addEventListener('click', () => {
        fileInput.click()
        handleFileSelect()
    })




})();
