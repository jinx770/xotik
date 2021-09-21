(function(){



  window.userDetailParent = document.querySelector('.user-details') || '';
  window.listingDescription = document.querySelector('.user-listing-description') || '';
  window.editableDetails = document.querySelectorAll('.editable') || '';



  let myAccount = async () => {

    username = localStorage.getItem('currentSession')

    // Finding user details
    let userResponse = await fetch(`/findUserDetails?u=${username}`)
    let userDetails = await userResponse.json();
    userDetailParent.innerHTML = '';
    userDetailParent.innerHTML = `
    <div class="user-details-header">
      <h5>${userDetails[0].username}</h5>
    </div>



    <div class="user-detals-content">
      <div class="user-details-top">
        <h5>${userDetails[0].fullName}</h5>
        <h5>${userDetails[0].email}</h5>
        <h5>${userDetails[0].phoneNo}</h5>
      </div>



      <div class="user-details-bottom">
        <h6>About</h6>
        <p>${userDetails[0].description}</p>
      </div>
    </div>
    `



    // Finding the users animals
    let animalResponse = await fetch(`/findAnimal?owner=${username}`)
    let allMyAnimals = await animalResponse.json()
    if (allMyAnimals == false){
      console.log('You have not posted an animal.');
    }


    userListingParent.innerHTML = '';
    // Displaying users animals

    for (userListings of allMyAnimals) {
      console.log(userListings);
      userListings.license == 'true'
        ? license = 'checked'
        : license = ''

        userListings.delivery == 'true'
        ? delivery = 'checked'
        : delivery = ''

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

          console.log(userListings._id, nameInput);

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
        },1000)

    }
    // end of loop

    console.log('end of func');
  }
  //myAccount function Ends

    myAccount()

}());
