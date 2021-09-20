(function() {
  window.userDetailParent = document.querySelector('user-details') || '';

  let myAccount = async () => {

      username = localStorage.getItem('currentSession')
      // console.log(username);

      // Finding user details
      let userResponse = await fetch(`/findUserDetails?u=${username}`)
      let userDetails = await userResponse.json();
      // console.log(userDetails);

      console.log('.user-details : \n', userDetailParent);
      // userDetailParent.innerHTML = '';
      // What is supposed to go into user-details
      // userDetailParent.innerHTML += `
      //     <div class="user-details-header">
      //       <h5>${userDetails[0].fullName}</h5>
      //     </div>
      //
      //     <div class="user-detals-content">
      //       <div class="user-details-top">
      //         <h5>Full Name</h5>
      //         <h5>email@email.com</h5>
      //         <h5>021CONTACT</h5>
      //       </div>
      //
      //       <div class="user-details-bottom">
      //         <h6>About</h6>
      //         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum placeat molestiae corrupti natus sapiente ducimus! Non vel eveniet at laudantium aperiam odit, tempora officiis illo quaerat consectetur enim facilis ducimus. <br>
      //           Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum placeat molestiae corrupti natus sapiente ducimus! Non vel eveniet at laudantium aperia.
      //         </p>
      //       </div>
      //     </div>
      // `

      // Finding the users animals
      let animalResponse = await fetch(`/findAnimal?owner=${username}`)
      let allMyAnimals = await animalResponse.json()

      userListingParent.innerHTML = '';
      // Displaying users animals
      for (userListing of allMyAnimals) {

          if (userListing.license == 'true'){
              license = 'checked';
              licenseText = "License Required"
          } else {
            license = '';
            licenseText = "License Not Required"
          }

          if (userListing.delivery == 'true'){
            delivery = 'checked';
            deliveryText = "Delivery Available";
          } else {
            delivery = '';
            deliveryText = "Delivery Not Available";
          }

          userListingParent.innerHTML += `
              <div class="user-listing">

                <div class="user-listing-top">
                  <div class="user-listing-details">
                    <div class="row">
                      <h4 contenteditable="true">${userListing.name}</h4>
                      <h4 contenteditable="true">$${userListing.price}</h4>
                    </div>
                    <h5 contenteditable="true">Location</h5>
                    <div class="listing-checkbox user-checkbox">
                      <div class="checkbox-row">
                        <input autocomplete="off" id="licence" class="checkbox" type="checkbox" id="licenceCheck" name="licence" ${license} required>
                        <label for="licence">
                          <h6>License Required</h6>
                        </label>
                      </div>
                      <div class="checkbox-row">
                        <input id="delivery" class="checkbox" type="checkbox" id="deliveryCheck" name="delivery" ${delivery} required >
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
                  <p>${userListing.description}</p>
                  <h6>Delete Listing</h6>
                </div>
              </div>
          `
      }

      console.log('flagEnd');
  }

  myAccount()

}());
