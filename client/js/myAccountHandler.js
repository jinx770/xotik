(function(){



  window.userDetailParent = document.querySelector('.user-details') || '';
  // window.saveUpdatesBtn = document.querySelector('#saveUpdatesBtn') || '';



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
    for (userListing of allMyAnimals) {


      console.log(allMyAnimals);
      userListing.license == 'true'
        ? license = 'checked'
        : license = ''



        userListing.delivery == 'true'
        ? delivery = 'checked'
        : delivery = ''



      userListingParent.innerHTML += `
            <div class="user-listing">
              <div class="user-listing-top">
                <div class="user-listing-details">
                  <div class="row">
                    <h4 contenteditable="true" class="editable userDetailsName">${userListing.name}</h4>
                    <h4> $ <span contenteditable="true" class="editable">${userListing.price}</span></h4>
                  </div>
                  <h5 contenteditable="true" class="editable">${userListing.location}</h5>
                  <div class="listing-checkbox user-checkbox">
                    <div class="checkbox-row">
                      <input autocomplete="off" id="licence" class="checkbox editable" type="checkbox" id="licenseCheck" name="licence" ${license} required>
                      <label for="licence">
                      <h6>License Required</h6>
                      </label>
                    </div>
                    <div class="checkbox-row">
                      <input id="delivery" class="checkbox editable" type="checkbox" id="deliveryCheck" name="delivery" ${delivery} required >
                      <label for="delivery">
                      <h6>Delivery Available</h6>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="user-listing-images">
                  <img src="${userListing.url}" alt="">
                </div>
              </div>
              <div class="user-listing-description">
                <p contenteditable="true" class="editable">${userListing.description}</p>
                <span id="listingHandler"><h6 id="deleteListingBtn">Delete Listing</h6></span>
              </div>
            </div>
        `


          detail.addEventListener('input', async () => {
            listingHandler.innerHTML = `
              <h6 id="saveUpdatesBtn">Save Updates</h6>
            `
            saveUpdatesBtn.addEventListener('click', async () => {
              listingHandler.innerHTML = `
                  <h6 id="deleteListingBtn">Delete Listing</h6>
              `
              updateListingDetails()
            })
          })

    }
    // end of loop



    listingDescription = document.querySelector('.user-listing-description')
    listingHandler = document.querySelector('#listingHandler')
    savedUpdatesBtn = document.querySelector('#saveUpdatesBtn') || '';
    window.editableDetails = document.querySelectorAll('.editable') || '';



    console.log(editableDetails[0].textContent);



    // for (detail of editableDetails){
    //   detail.addEventListener('input', async () => {
    //     listingHandler.innerHTML = `
    //       <h6 id="saveUpdatesBtn">Save Updates</h6>
    //     `
    //     saveUpdatesBtn.addEventListener('click', async () => {
    //       listingHandler.innerHTML = `
    //           <h6 id="deleteListingBtn">Delete Listing</h6>
    //       `
    //       updateListingDetails()
    //     })
    //   })
    // }
    //
    // updateListingDetails = async () => {
    //   let name = editableDetails[0].textContent;
    //   let price = editableDetails[1].textContent; //needs to be changed to number parseInt, parseFloat, number
    //   let location = editableDetails[2].textContent;
    //   let description = editableDetails[3].textContent;
    //
    //   licenseCheck = document.querySelector('#licenseCheck');
    //
    //   license == 'checked'
    //   ? licenseDB = 'true'
    //   : licenseDB = 'false'
    //
    //   delivery == 'checked'
    //   ? deliveryDB = 'true'
    //   : deliveryDB = 'false'
    //
    //   console.log(name, price, location, description, licenseDB, deliveryDB);
    //   console.log('saved!');
    //
    //   // let response = await fetch('/updateAnimal', {
    //   //     method: 'POST',
    //   //     headers: {
    //   //         'Content-Type': 'application/json'
    //   //     },
    //   //     body: JSON.stringify({
    //   //
    //   //         name: name,
    //   //         type: typeInput,
    //   //         // url: url,
    //   //         price: parseInt(price),
    //   //         rating: `${Math.floor(Math.random() * 11)}/10`,
    //   //         description: description,
    //   //         quantity: 10,
    //   //         // owner: currentSession,
    //   //         license: licenseInput,
    //   //         delivery: deliveryInput
    //   //         // comments: []
    //   //
    //   //     })
    //   // });
    //
    //
    //
    // }
    // end of update listing


    console.log('end of func');
  }
    //myAccount function Ends

    myAccount()

}());
