

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

getPageElements()

let seeMyPost = async (e) => {
    let cardId = e.getAttribute('data-id')
    localStorage.setItem('cardId', cardId)
    window.location.href = '/animalTemplate.html'
}

let userDetails = async () => {

    username = localStorage.getItem('currentSession')
    let userResponse = await fetch(`/findUserDetails?u=${username}`)
    let userDetails = await userResponse.json();

    userDetailParent.innerHTML = '';
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
    updateAcc();
}

let updateAcc = () => {
    setInterval(async () => {
        getPageElements();
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

let removeListing = async (e) => {
    objectId = e.getAttribute('data-id')
    let response = await fetch('/removeAnimal', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: objectId,
        })
    });
    createAlert('Post Deleted');
    let refresh = document.querySelector('.modalDone')
    refresh.addEventListener('click', () => {
        location.reload();
    })
}

let updateListingCard = async () => {

    getPageElements()

    for (item of allListings) {

        let int = item.getAttribute("data-id")
        let currentItem = allMyAnimals[int]

        let individualName = document.querySelector(`#animalName${int}`)
        let individualPrice = document.querySelector(`#animalPrice${int}`)
        let individualLocation = document.querySelector(`#animalLocation${int}`)
        let individualDescription = document.querySelector(`#animalDescription${int}`)

        let response = await fetch('/updateAnimal', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
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

let myAnimals = async () => {

    let username = localStorage.getItem('currentSession')
    let animalResponse = await fetch(`/findAnimal?owner=${username}`)
    window.allMyAnimals = await animalResponse.json()

    let i = 0;

    if (allMyAnimals == false) {
        userListingParent.innerHTML += `
            <div style="width:100%; text-align:center; margin-top:60px; ">
                <h5> No listings to display, perhaps upload some? </h5>
            </div>

        `
    } else {

        userListingParent.innerHTML = '';

        for (userListings of allMyAnimals) {
            userListings.license == 'true' ?
                license = 'checked' :
                license = ''

            userListings.delivery == 'true' ?
                delivery = 'checked' :
                delivery = ''

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
            i++;
        }
    }
}

let updateLoop = setInterval(function() {
    localStorage.currentSession === "null"
        ? window.location.href = "/index.html"
        : null
    updateListingCard();
}, 700);


userDetails();
myAnimals();
