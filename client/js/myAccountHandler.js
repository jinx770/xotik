(function() {

    localStorage.setItem('editing', '')
    window.userDetailParent = document.querySelector('.user-details') || '';
    window.listingDescription = document.querySelector('.user-listing-description') || '';

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
        <p contenteditable="true" id="userDescriptionInput">${userDetails[0].description}</p>
      </div>
    </div>
    `

    setInterval(async () => {
      let usernameInput = document.querySelector('#usernameInput').textContent
      let fullNameInput = document.querySelector('#fullName').textContent
      let emailInput = document.querySelector('#emailInput').textContent
      let userDescriptionInput = document.querySelector('#userDescriptionInput').textContent
      let phoneInput = document.querySelector('#phoneInput').textContent

      let response = await fetch('/updateUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({

            fullName: fullNameInput,
            username: usernameInput,
            phoneNo: phoneInput,
            email: emailInput,
            userDescription: userDescriptionInput

          })
      });

    }, 1000)
  }


  let myAnimals = async () => {

      // Finding the users animals
      let animalResponse = await fetch(`/findAnimal?owner=${username}`)
      let allMyAnimals = await animalResponse.json()
      console.log(allMyAnimals, ' - allMyAnimals');
      if (allMyAnimals == false){
        console.log('You have not posted an animal.');
        return false
      }

      function checkId( postId ){
          let posts = document.querySelectorAll('.user-listing')
          for (post of posts){
                let postId = post.classList;
                post.addEventListener('click', async () => {
                localStorage.setItem('editing', postId[1])
            })
          }
      }

      userListingParent.innerHTML = '';

      for (perAnimal of allMyAnimals) {
          perAnimal.license == 'true'
          ? license = `<input post-id="license${perAnimal._id}" autocomplete="off" id="license" class="checkbox editable" type="checkbox" name="licence" checked required>`
          : license = `<input post-id="license${perAnimal._id}" autocomplete="off" id="license" class="checkbox editable" type="checkbox" name="licence" required>`

          perAnimal.delivery == 'true'
          ? delivery = `<input post-id="delivery${perAnimal._id}" id="delivery" class="checkbox editable" type="checkbox" name="delivery" checked required >`
          : delivery = `<input post-id="delivery${perAnimal._id}" id="delivery" class="checkbox editable" type="checkbox" name="delivery"  required >`

        userListingParent.innerHTML += `
              <div class="user-listing ${perAnimal._id}">
                <div class="user-listing-top">
                  <div class="user-listing-details">
                    <div class="row">
                      <h4 contenteditable="true" class="editable userDetailsName" id="nameInput" post-id="name${perAnimal._id}">${perAnimal.name}</h4>
                      <h4> $ <span contenteditable="true" class="editable" id="priceInput" post-id="price${perAnimal._id}">${perAnimal.price}</span></h4>
                    </div>
                    <h5 contenteditable="true" class="editable" id="locationInput" post-id="location${perAnimal._id}">${perAnimal.location}</h5>
                    <div class="listing-checkbox user-checkbox">
                      <div class="checkbox-row">
                        ${license}
                        <label for="license">
                        <h6>License Required</h6>
                        </label>
                      </div>
                      <div class="checkbox-row">
                        ${delivery}
                        <label for="delivery">
                        <h6>Delivery Available</h6>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="user-listing-images">
                    <img src="${perAnimal.url}" alt="">
                  </div>
                </div>
                <div class="user-details-bottom">
                  <h6>About</h6>
                  <p contenteditable="true" class="editable" id="descriptionInput" post-id="description${perAnimal._id}">${perAnimal.description}</p>
                  <h6 id="deleteListingBtn">Delete Listing</h6>
                </div>
              </div>
          `

          let deleteListingBtns = document.querySelectorAll("#deleteListingBtn")

          for (deleteBtn of deleteListingBtns){
            deleteBtn.addEventListener('click', async () => {
              // console.log(perAnimal._id);
              let response = await fetch('/removeAnimal', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                  id: perAnimal._id,

                })

              });
              createAlert('Post Deleted');
              let refresh = document.querySelector('.modalDone')
              refresh.addEventListener('click', () => {
                location.reload();
                localStorage.setItem('editing', '')
              })
            })
            //event listener end
          }
      }


      // so that it doesn't spam errors when you delete a post and selectors can no longer find queries


      setInterval(function(){
        if (!localStorage.getItem('editing')){
            console.log('Click on a post to edit');
        } else {
            console.log('Editing a post');
          setInterval(async () => {
            let editing = localStorage.getItem('editing')
            let nameInput = document.querySelector(`[post-id=name${CSS.escape(editing)}]`).textContent
            let priceInput = document.querySelector(`[post-id=price${CSS.escape(editing)}]`).textContent
            let descriptionInput = document.querySelector(`[post-id=description${CSS.escape(editing)}]`).textContent
            let locationInput = document.querySelector(`[post-id=location${CSS.escape(editing)}]`).textContent
            let deliveryCheck = document.querySelector(`[post-id=delivery${CSS.escape(editing)}]`);
            let deliveryInput = deliveryCheck.checked
            let delivery = ''
            let licenseCheck = document.querySelector(`[post-id=license${CSS.escape(editing)}]`);
            let licenseInput = licenseCheck.checked
            console.log(licenseInput);
            let license = ''

            if (deliveryInput) {
              delivery = 'true'
            } else {
              delivery = 'false'
            }

            if (licenseInput) {
              license = 'true'
            } else {
              license = 'false'
            }

            let response = await fetch('/updateAnimal', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({

                id: localStorage.getItem('editing'),
                animalName: nameInput,
                // type: perAnimal.type,
                // url: perAnimal.url,
                price: priceInput,
                // rating: perAnimal.rating,
                description: descriptionInput,
                // quantity: perAnimal.quantity,
                // owner: perAnimal.owner,
                license: license,
                delivery: delivery,
                // comments: perAnimal.comments,
                location: locationInput

              })

            });

          }, 1000)
          // setInterval to update content
        }
      }, 1000)
      // setInterval for checking if there is a post currently being edited
      checkId();
  }
  // end of myAnimals

  userDetails()
  myAnimals()

}());
