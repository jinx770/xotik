


// ------------------------------------------------------------------------------------------------------------------------------------
// -- DECLARATIONS
// ------------------------------------------------------------------------------------------------------------------------------------

// Predefining variables
window.url;
window.cache = ['']
window.currentSession = localStorage.getItem('currentSession')

let getElements = () => {

    window.addImageListingButton = document.querySelector('.add-img-btn') || '';
    window.listingButton = document.querySelector('.listing-btn') || '';

    window.fileInput = document.querySelector('.ignore-me') || '';
    window.uploadImage = document.querySelector('.uploaded-image') || '';
    window.imageHolder = document.querySelector('.test-div-images') || '';
    window.loginIcon = document.querySelector('.fa-user')

    window.nameInput = document.querySelector('#name').value
    window.typeInput = document.querySelector('#type').value
    window.locationInput = document.querySelector('#location').value
    window.priceInput = document.querySelector('#price').value
    window.licenseInput = document.querySelector('#licence').checked
    window.deliveryInput = document.querySelector('#delivery').checked
    window.descriptionInput = document.querySelector('#description').value
    window.listingInputs = document.querySelectorAll('.listing-input') || '';

}

// Refreshing elements
getElements();

// Uhhhh
uploadImage.style.visibility = 'hidden'


// ------------------------------------------------------------------------------------------------------------------------------------
// -- FILE HANDLER
// ------------------------------------------------------------------------------------------------------------------------------------

// Function that gets called when you click on the + icon
let handleFileSelect = (e) => {

    // Loop every .5 seconds
    setInterval(() => {

        // Gets the inputted file of our input
        let file = $('input[type=file]').get(0).files[0];

        // Making sure file has been successfully defined
        if (file) {

            // Dependancy for rendering a file using a base64 converter.
            // With this we can create images straight from our files!
            // Which normally wouldn't be allowed by googles security zz
            let reader = new FileReader();

            // Event handler for when load is fired
            reader.onload = function() {


                // The source attribute gets changed to the result of our fileReaders request when we call it with readAsDataURL
                uploadImage.src = reader.result
                uploadImage.style.visibility = 'visible'
                url = reader.result


                // Clearing the input so it doesn't loop add the current value to the array - thanks toby for letting me know
                fileInput.value = ''

            }

            // Calling our file reader function with the file we saved early as an argument
            reader.readAsDataURL(file);

        }

        // Running every .5 seconds
    }, 500)


}

// Little slight of hand function, since I didn't want to replace Toby's button
// I hid an invisible input behind his button, buttons don't have a type attribute but inputs do,
// When you click his button I force click the input which opens up the files :D
addImageListingButton.addEventListener('click', () => {

    // Click event
    fileInput.click()

    // Function for handling our images
    handleFileSelect()

})



// ------------------------------------------------------------------------------------------------------------------------------------
// -- VALIDATE UPLOAD
// ------------------------------------------------------------------------------------------------------------------------------------

// Function for returning true/false if user is currently logged in when they press the button
let verifyLogin = () => {

    // Checking to see if theyre signed in by looking for string we store in localstorage if theyre signed out
    if (currentSession == 'null') {

        // If theyre signed out then alert them to login in
        createAlert('Please login first!')

        // Open the login UI
        loginIcon.click()

        // Return false to prevent the user from making a request when they click the button
        return false

    } else {

        // Return true as they're currently logged in
        return true

    }

}

// Function to make sure our inputs are validated
let validateInputs = () => {

    // Creating an empty array of trues and falses for each input
    let results = []

    // Function for checking whitespace so no empty inputs with just a space exist
    let isEmpty = str => !str.trim().length;

    // Function for checking every item in an array is equal to true
    let checker = arr => arr.every(v => v === true);

    // Looping over all elements with 'listing-input' as a class
    for (let i = 0; i < listingInputs.length; i++) {

        // Getting the values
        let input = listingInputs[i].value

        // Creating a variable that calls our check if empty function as true or false
        let result = isEmpty(input) ? false : true

        // Pushing all the results of our true/false input checker to an empty array
        results.push(result)

    }

    // Calling our function for checking if every item in an array matches
    // Returning nothing if it does to allow for it to continue
    // If they don't all match to true, then it'll alert you to correct your inputs
    checker(results) ? '' : createAlert('Please make sure all inputs are filled in!')

    // Returning true/false
    return checker(results)

}


// ------------------------------------------------------------------------------------------------------------------------------------
// -- POST METHOD
// ------------------------------------------------------------------------------------------------------------------------------------

// If listing button is pressed
listingButton.addEventListener('click', async () => {

    // Verify that the user is logged in and all fields are filled out
    if (verifyLogin() && validateInputs()) {

        console.log(verifyLogin, validateInputs)

        // Refresh fields
        getElements();

        // Create response for animal
        let response = await fetch('/createAnimal', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                name: nameInput,
                type: typeInput,
                url: url,
                price: parseInt(priceInput),
                rating: `${Math.floor(Math.random() * 11)}/10`,
                description: descriptionInput,
                quantity: 10,
                owner: currentSession,
                license: licenseInput,
                delivery: deliveryInput,
                comments: [],
                location: locationInput

            })

        });

        // Alert successful
        createAlert('Success!')

        //Refreshes for new listing
        let refresh = document.querySelector('.modalDone')
        // refresh.addEventListener('click', () => {
        //   window.location.href = "listing.html";
        // })

    }

});
