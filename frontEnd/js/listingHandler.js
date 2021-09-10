


    window.cache = [""]

    window.addImageListingButton = document.querySelector(".add-img-btn") || "";
    window.listingButton = document.querySelector(".listing-btn") || "";

    window.fileInput = document.querySelector(".ignore-me") || "";
    window.imageHolder = document.querySelector(".test-div-images") || "";

    imageHolder.innerHTML = "";


// ----------------------------------------------------------------------------------------------------------------------------------

    // Function that gets called when you click on the + icon
    let handleFileSelect = (e) => {

        // Loop every .5 seconds
        setInterval(() => {

            // Checks the entered input of the file popup with items in the cached array
            // Purely to avoid spam pushes to the array
            if (cache.includes(fileInput.value)) {

                // Return stops the current thread from continuing
                return

            }

            // Quick check to make sure the count of the cached array isn't over 5
            if (!cache[4]) {

                // Gets the inputted file of our input
                let file = $("input[type=file]").get(0).files[0];

                // Adds the name of the value to our cache array
                // Making sure we aren't uploading the same image
                cache.push(fileInput.value)

                // Making sure file has been successfully defined
                if (file) {

                    // Dependancy for rendering a file using a base64 converter.
                    // With this we can create images straight from our files!
                    // Which normally wouldn't be allowed by googles security zz
                    let reader = new FileReader();

                    // Event handler for when load is fired
                    reader.onload = function(){

                        // Creating a new image card with its own onclick function to remove itself if you click it
                        // Makes the id of the card, the name of the image so we can remove it later on from the cache array
                        // The source attribute gets changed to the result of our fileReaders request when we call it with readAsDataURL
                        imageHolder.innerHTML += `<div class="new-image" onclick="remove(this)" id=${fileInput.value}>
                              <div class="trash"><i class="fa fa-trash" aria-hidden="true"></i></div>
                              <img src="${reader.result}" alt=""></div>`
                    }

                    // Calling our file reader function with the file we saved early as an argument
                    reader.readAsDataURL(file);

                }

            }

        // Running every .5 seconds
        }, 500)

        if (cache[4]) {
            console.log("Max uploads reached!")
            return
        }

    }



// ----------------------------------------------------------------------------------------------------------------------------------


    // Array remove function
    // It's some online function I found, didn't make it
    function removeA(arr) {
        let what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }



// ----------------------------------------------------------------------------------------------------------------------------------



    // Remove function that gets called if you click on the image
    let remove = (el) => {

        // Irrelevant defining, didn't really needa do this but shrug
        let element = el;

        // Checking to see if the image we're removing, is cached
        // Which it will always be so we remove it using our remove array function with the ID we set in the image handler function
        cache.includes(element.id) ? removeA(cache, element.id) : null

        // Removes the element
        element.remove();

    }



// ----------------------------------------------------------------------------------------------------------------------------------



    // Little slight of hand function, since I didn't want to replace Toby's button
    // I hid an invisible input behind his button, buttons don't have a type attribute but inputs do,
    // When you click his button I force click the input which opens up the files :D
    addImageListingButton.addEventListener('click', () => {

        // Click event
        fileInput.click()

        // Function for handling our images
        handleFileSelect()

    })
