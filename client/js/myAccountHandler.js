(function() {

    window.userDetailParent = document.querySelector('.user-details') || '';
    window.listingDescription = document.querySelector('.user-listing-description') || '';
    window.editableDetails = document.querySelectorAll('.editable') || '';

  // Finding user details
  let userDetails = async () => {
    username = localStorage.getItem('currentSession')
    let userResponse = await fetch(`/findUserDetails?u=${username}`)
    let userDetails = await userResponse.json();
    userDetailParent.innerHTML = '';
    userDetailParent.innerHTML = `
        <div class="user-details-header">
          <h5 id="usernameInput">${userDetails[0].username}</h5>
        </div>

        <div class="user-detals-content">
          <div class="user-details-top">
            <h5 contenteditable="true" id="fullName">${userDetails[0].fullName}</h5>
            <h5 contenteditable="true" id="emailInput">${userDetails[0].email}</h5>
            <h5 contenteditable="true" id="phoneInput">${userDetails[0].phoneNo}</h5>
          </div>

          <div class="user-details-bottom">
            <h6>About</h6>
            <p contenteditable="true" id="descriptionInput">${userDetails[0].description}</p>
          </div>
        </div>
    `

    setInterval(async () => {
      let usernameInput = document.querySelector('#usernameInput').textContent
      let fullNameInput = document.querySelector('#fullName').textContent
      let emailInput = document.querySelector('#emailInput').textContent
      let descriptionInput = document.querySelector('#descriptionInput').textContent
      let phoneInput = document.querySelector('#phoneInput').textContent

      let response = await fetch('/updateUser', {
          method: 'post',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            fullName: fullNameInput,
            username: usernameInput,
            phoneNo: phoneInput,
            email: emailInput,
            description: descriptionInput

          })
      });

    }, 1000)
  }


  let myAnimals = async () => {

    // Finding the users animals
    let animalResponse = await fetch(`/findAnimal?owner=${username}`)
    let allMyAnimals = await animalResponse.json()
    if (allMyAnimals == false){
      console.log('You have not posted an animal.');
    }


    userListingParent.innerHTML = '';
    // Displaying users animals

    for (userListings of allMyAnimals) {
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
                    <h4 class="editable userDetailsName" contenteditable id="nameInput">${userListings.name}</h4>
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
              <div class="user-details-bottom">
                <h6>About</h6>
                <p contentEditable>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pharetra eros eget dolor accumsan, nec efficitur mi maximus. Praesent dictum nec diam ut bibendum. Donec pretium dui a dolor vehicula maximus. Curabitur rutrum ex id mattis sollicitudin. Curabitur consectetur volutpat turpis ac scelerisque. Sed ut dui lorem. Aliquam convallis sem in ipsum fringilla bibendum. Duis eget elit in urna convallis fringilla. Fusce eget nisi laoreet, pellentesque libero at, tincidunt felis. Nam malesuada rhoncus ligula non vehicula.</p>
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
        }, 1000)

        let deleteListingBtns = document.querySelectorAll("#deleteListingBtn")

        for (deleteBtn of deleteListingBtns){
          deleteBtn.addEventListener('click', async () => {
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
            createAlert('Post Deleted');
            let refresh = document.querySelector('.modalDone')
            refresh.addEventListener('click', () => {
              location.reload();
            })
          })
          //event listener end
        }
    }
    // end of loop
  }

  userDetails()
  myAnimals()

}());
