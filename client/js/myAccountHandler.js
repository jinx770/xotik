(function() {



    window.username = localStorage.getItem('currentSession')
    window.userDetailParent = document.querySelector('.user-details') || '';
    window.listingDescription = document.querySelector('.user-listing-description') || '';
    window.editableDetails = document.querySelectorAll('.editable') || '';



    let myAccount = async () => {

        let userResponse = await fetch(`/findUserDetails?u=${username}`)
        let userDetails = await userResponse.json();
        userDetailParent.innerHTML = '';
        userDetailParent.innerHTML += `
            <div class="user-details-header">
              <h5>${userDetails[0].username}</h5>
            </div>
            <div class="user-detals-content">
              <div class="user-details-top">
                <h5>John Lennon</h5>
                <h5>thebeatles@gmail.com</h5>
                <h5>(021) 081 74096</h5>
              </div>
              <div class="user-details-bottom">
                <h6>About</h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra eros eget dolor accumsan, nec efficitur mi maximus. Praesent dictum nec diam ut bibendum. Donec pretium dui a dolor vehicula maximus. Curabitur rutrum ex id mattis sollicitudin. Curabitur consectetur volutpat turpis ac scelerisque. Sed ut dui lorem. Aliquam convallis sem in ipsum fringilla bibendum. Duis eget elit in urna convallis fringilla. Fusce eget nisi laoreet, pellentesque libero at, tincidunt felis. Nam malesuada rhoncus ligula non vehicula.</p>
              </div>
            </div>
        `

        // Finding the users animals
        let animalResponse = await fetch(`/findAnimal?owner=${username}`)
        let allMyAnimals = await animalResponse.json()
        console.log(typeof allMyAnimals)

        userListingParent.innerHTML = '';

        // Displaying users animals

        if (allMyAnimals) {

            for (userListings of allMyAnimals) {

                userListings.license == 'true' ? license = 'checked' : license = ''
                userListings.delivery == 'true' ? delivery = 'checked' : delivery = ''

                userListingParent.innerHTML += `
                    <div class="user-listing">
                        <div class="user-listing-top">
                            <div class="user-listing-details">
                                <div class="row">
                                    <h4 contenteditable="true" class="editable userDetailsName" id="nameInput">${userListings.name}</h4>
                                    <h4> $ <span contenteditable="true" class="editable" id="priceInput">${userListings.price}</span></h4>
                                </div>
                                <h5 contenteditable="true" class="editable" id="locationInput">${userListings.location}</h5>
                                <div class="listing-checkbox user-checkbox">
                                    <div class="checkbox-row">
                                        <input autocomplete="off" id="licence" class="checkbox editable" type="checkbox" name="licence" ${license} required>
                                        <label for="licence">
                                            <h6>License Required</h6>
                                        </label>
                                    </div>
                                    <div class="checkbox-row">
                                        <input id="delivery" class="checkbox editable" type="checkbox" name="delivery" ${delivery} required >
                                        <label for="delivery">
                                            <h6>Delivery Available</h6>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="user-listing-images">
                                <img src="${userListings.url}" alt="">
                            </div>
                        </div>
                        <div class="user-listing-description">
                            <p contenteditable="true" class="editable" id="descriptionInput">${userListings.description}</p>
                            <span id="listingHandler"><h6 id="deleteListingBtn">Delete Listing</h6></span>
                        </div>
                    </div>
                `

                setInterval(async () => {

                    let nameInput = document.querySelector('#nameInput').textContent
                    let priceInput = document.querySelector('#priceInput').textContent
                    let descriptionInput = document.querySelector('#descriptionInput').textContent
                    let locationInput = document.querySelector('#locationInput').textContent
                    let deliveryCheck = document.querySelector('#delivery');
                    let deliveryInput = JSON.stringify(deliveryCheck.checked)
                    let licenseCheck = document.querySelector('#license');
                    let licenseInput = JSON.stringify(license.checked)

                    let response = await fetch('/updateAnimal', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: userListings._id,
                            name: nameInput,
                            type: userListings.type,
                            url: userListings.url,
                            price: priceInput,
                            rating: userListings.rating,
                            description: descriptionInput,
                            quantity: userListings.quantity,
                            owner: userListings.owner,
                            license: licenseInput,
                            delivery: deliveryInput,
                            comments: userListings.comments,
                            location: locationInput
                        })
                    });

                }, 500)
                let deleteListingBtn = document.querySelector("#deleteListingBtn")
                deleteListingBtn.addEventListener('click', async () => {
                    // console.log(userListings._id);
                    let response = await fetch('/removeAnimal', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({

                            id: userListings._id,

                        })

                    });
                    location.reload();
                })
            }
        } else {
            userListingParent.innerHTML = '';
            userListingParent.innerHTML += `
            <h5 style="position:relative; padding-top:100px; padding-bottom:100px;"> You don't have any listings. Create some! </h5>
            `
            // createAlert("You don't have any animals ;(")
        }
    }

    myAccount()

}());
