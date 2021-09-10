


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

                let file = $("input[type=file]").get(0).files[0];
                cache.push(fileInput.value)

                if (file) {

                  let reader = new FileReader();
                  reader.onload = function(){
                      imageHolder.innerHTML += `<div class="new-image" onclick="remove(this)" id=${fileInput.value}>
                      <div class="trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
                      <img src="${reader.result}" alt=""></div>`
                  }

                  reader.readAsDataURL(file);

                  console.log(cache)
                }

            }

        }, 500)

        if (cache[4]) {
            console.log("Max uploads reached!")
            return
        }

    }



// ----------------------------------------------------------------------------------------------------------------------------------



    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }



// ----------------------------------------------------------------------------------------------------------------------------------



    let remove = (el) => {

        let element = el;
        console.log(cache)

        cache.includes(element.id) ? removeA(cache, element.id) : "asd"

        element.remove();

    }



// ----------------------------------------------------------------------------------------------------------------------------------



    addImageListingButton.addEventListener('click', () => {
        fileInput.click()
        handleFileSelect()
    })
