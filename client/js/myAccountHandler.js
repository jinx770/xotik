


// ------------------------------------------------------------------------------------------------------------------------------------
// -- DECLARATIONS
// ------------------------------------------------------------------------------------------------------------------------------------

let getPageElements = () => {

    window.usernameInput = document.querySelector('#usernameInput') || '';
    window.fullNameInput = document.querySelector('#fullName') || '';
    window.emailInput = document.querySelector('#emailInput') || '';
    window.userDescription = document.querySelector('#userDescription') || '';
    window.phoneInput = document.querySelector('#phoneInput') || '';

    window.animalName = document.querySelector('#animalName') || '';
    window.animalPrice = document.querySelector('#animalPrice') || '';
    window.animalLocation = document.querySelector('#animalLocation') || '';
    window.animalDescription = document.querySelector('#animalDescription') || '';

    window.deliveryCheck = document.querySelector('#delivery') || '';
    window.licenseCheck = document.querySelector('#license') || '';

    window.deliveryInput = JSON.stringify(deliveryCheck.checked) || '';
    window.licenseInput = JSON.stringify(licenseCheck.checked) || '';

    window.userDetailParent = document.querySelector('.user-details') || '';
    window.listingDescription = document.querySelector('.user-listing-description') || '';
    window.editableDetails = document.querySelectorAll('.editable') || '';

    window.allListings = document.querySelectorAll('.user-listing') || '';

}

// Updating dom
getPageElements()



// ------------------------------------------------------------------------------------------------------------------------------------
// -- ACC DETAILS
// ------------------------------------------------------------------------------------------------------------------------------------

// Function for getting user details and updating them later
let userDetails = async () => {

    // Getting stuff from localstorage
    username = localStorage.getItem('currentSession')

    // Checking the current user against the database
    let userResponse = await fetch(`/findUserDetails?u=${username}`)

    // Returning data
    let userDetails = await userResponse.json();

    // Uploading data as dynamic html
    userDetailParent.innerHTML = '';

    // Since we're adding an attribute called contenteditable, it means a user can type on the headers
    // We then loop save the headers as the new content
    userDetailParent.innerHTML += `
        <div class='user-details-header'>
          <h5 id='usernameInput'>${userDetails[0].username}</h5>
        </div>
        <div class='user-detals-content'>
          <div class='user-details-top'>
            <h5 contenteditable='true' id='fullName'>${userDetails[0].fullName}</h5>
            <h5 contenteditable='true' id='emailInput'>${userDetails[0].email}</h5>
            <h5 contenteditable='true' id='phoneInput'>${userDetails[0].phoneNo}</h5>
          </div>
          <div class='user-details-bottom'>
            <h6>About</h6>
            <p contenteditable='true' id='userDescription'>${userDetails[0].description}</p>
          </div>
        </div>
    `

    // Func that updated details every second
    updateAcc();

}

// Loop function we call when the divs get created for user details
let updateAcc = () => {

    // Loop to loop fire a post request to update the fields that've been changed
    setInterval(async () => {

        // Refreshing to make sure inputs are up-to-date and accurate
        getPageElements();

        // Post req for user details
        let response = await fetch('/updateUser', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                fullName: fullNameInput.textContent,
                username: usernameInput.textContent,
                phoneNo: phoneInput.textContent,
                email: emailInput.textContent,
                description: userDescription.textContent

            })

        });

    }, 1000)

}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- USER ANIMAL LISTINGS
// ------------------------------------------------------------------------------------------------------------------------------------

// For removing an animal from the database when clicked on
let removeListing = async (e) => {

    // Getting id of the animal we click on, to search
    objectId = e.getAttribute('data-id')

    // Searching with delete method
    let response = await fetch('/removeAnimal', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: objectId,
        })
    });

    // Creating alert message for status
    createAlert('Post Deleted');

    // Modal "done button"
    let refresh = document.querySelector('.modalDone')

    // Event for refreshing the page when listing is removed
    refresh.addEventListener('click', () => {

        // Reloads
        location.reload();
    })
}

// Loop called to update the database
let updateListingCard = async () => {

    // Gets most recent version of inputs and divs
    getPageElements()

    // For loop running through all of our animal divs in dom
    for (item of allListings) {

        // Getting a number to make sure each id is different
        let int = item.getAttribute("data-id")

        // Getting relative item in array depending on its location in the array
        // With the int value we defined.
        let currentItem = allMyAnimals[int]

        // Getting values from each independant element using int as a way to seperate them
        // Without the int, we'd be collecting the same testContent for each item
        // Meaning updating one, means updating all with the same info
        let individualName = document.querySelector(`#animalName${int}`)
        let individualPrice = document.querySelector(`#animalPrice${int}`)
        let individualLocation = document.querySelector(`#animalLocation${int}`)
        let individualDescription = document.querySelector(`#animalDescription${int}`)

        // Looping the request to the database with the new text content
        let response = await fetch('/updateAnimal', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                id: currentItem._id,
                name: individualName.textContent,
                type: currentItem.type,
                url: currentItem.url,
                price: individualPrice.textContent,
                rating: currentItem.rating,
                description: individualDescription.textContent,
                quantity: currentItem.quantity,
                owner: currentItem.owner,
                license: licenseInput,
                delivery: deliveryInput,
                comments: currentItem.comments,
                location: individualLocation.textContent

            })

        })

    }

}

// Function for listing all animals
let myAnimals = async () => {

    // Getting current users name
    let username = localStorage.getItem('currentSession')

    // Searching database with the owner field as username
    let animalResponse = await fetch(`/findAnimal?owner=${username}`)

    // Getting all animals with the owner field set to the username,
    // If nothing is found it will return false
    window.allMyAnimals = await animalResponse.json()

    let i = 0;

    // If nothing found
    if (allMyAnimals == false) {

        // Message saying no listings, try uploading some
        userListingParent.innerHTML += `
            <div style="width:100%; text-align:center; margin-top:60px; ">
                <h5> No listings to display, perhaps upload some? </h5>
            </div>

        `

    } else {

        // Clearing animal listings div
        userListingParent.innerHTML = '';

        // Looping individual animals from all animals
        for (userListings of allMyAnimals) {

            // Checks for licence since they're stored as true or false, and we need checked
            userListings.license == 'true' ?
                license = 'checked' :
                license = ''

            // Same applies, check to reference a boolean and switch to a state
            userListings.delivery == 'true' ?
                delivery = 'checked' :
                delivery = ''

            // Creating div for each item thats returned by our earlier search
            userListingParent.innerHTML += `
                    <div class='user-listing' data-id='${i}'>
                      <div class='user-listing-top'>
                        <div class='user-listing-details'>
                          <div class='row'>
                            <h4 class='editable userDetailsName' data-id='${i}' contenteditable id='animalName${i}'>${userListings.name}</h4>
                            <h4> $ <span contenteditable class='editable' data-id='${i}' id='animalPrice${i}'>${userListings.price}</span></h4>
                          </div>
                          <h5 contenteditable class='editable' data-id='${i}' id='animalLocation${i}'>${userListings.location}</h5>
                          <div class='listing-checkbox user-checkbox'>
                            <div class='checkbox-row'>
                              <input autocomplete='off' id='licence' class='checkbox editable' type='checkbox' name='licence' ${license} required>
                              <label for='licence'>
                              <h6>License Required</h6>
                              </label>
                            </div>
                            <div class='checkbox-row'>
                              <input id='delivery' class='checkbox editable' type='checkbox' name='delivery' ${delivery} required >
                              <label for='delivery'>
                              <h6>Delivery Available</h6>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class='user-listing-images'>
                          <img src='${userListings.url}' alt=''>
                        </div>
                      </div>
                      <div class="user-listing-description">
                        <p id='animalDescription${i}' data-id='${i}' contenteditable> ${userListings.description} </p>
                        <div>
                            <span id="listingHandler" style="display:flex;">
                                <h6 id="seeMyPostBtn" style="margin-right:10px;" data-id="${userListings._id}" onclick="seeMyPost(this)">View Listing</h6>
                                <h6 id="deleteListingBtn" data-id="${userListings._id}" onclick="removeListing(this)">Delete Listing</h6>
                            </span>
                        </div>
                      </div>
                    </div>
                `
            // Adding 1 for our rerefence of int
            i++;
        }
    }
}



// ------------------------------------------------------------------------------------------------------------------------------------
// -- OTHER THINGS
// ------------------------------------------------------------------------------------------------------------------------------------

// Function that takes you to the post of the item you click on
let seeMyPost = async (e) => {
    let cardId = e.getAttribute('data-id')
    localStorage.setItem('cardId', cardId)
    window.location.href = '/animalTemplate.html'
}

// Loop checks to see the user is signed in incase they sign out on the listing page
// Takes them back home
let updateLoop = setInterval(function() {
    localStorage.currentSession === "null" ?
        window.location.href = "/index.html" :
        null
    updateListingCard();
}, 700);

// Calls
userDetails();
myAnimals();
