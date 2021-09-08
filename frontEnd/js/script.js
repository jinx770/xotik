(function() {


// nav clicks
$('#logoBtn').click(function(){
  window.location.href='index.html';
});

$('#animalsBtn').click(function(){
  window.location.href='animal.html';
});
//
// $('#whoBtn').click(function(){
//
// })
//
// $('#trustBtn').click(function(){
//
// })

$('#listingBtn').click(function(){
  window.location.href='listing.html';
});
// header popover begins

// click on user icon
$('#user').click(function(){
  //fade in popover
    $("#headerPopover").fadeIn("slow");
    // fade in login content
    $("#loginContent").css("display", "flex");
    $("#loginContent").hide();
    $("#loginContent").fadeIn("slow");
    // remove other content
    $("#emptyCartContent").css("display", "none");
    $("#fullCartContent").css("display", "none");
});

// show create account content on click
$('#createAccountBtn').click(function(){
  // fade in create account content
  $("#createAccountContent").css("display", "flex");
  $("#createAccountContent").hide();
  $("#createAccountContent").fadeIn("slow");
  // remove other content
  $("#loginContent").css("display", "none");
});

// clicked sign up
$('#signUpBtn').click(function(){
  // fade in login content
  // will need check to see if sign up is checked out
  $("#loginContent").css("display", "flex");
  $("#loginContent").hide();
  $("#loginContent").fadeIn("slow");
  // remove other content
  $("#createAccountContent").css("display", "none");
});

// click on cart icon
$('#cart').click(function(){
  // fade in popover
    $("#headerPopover").fadeIn("slow");
    // fade in cart content
    // will need if statement to check if items in cart or not
    // fade in for empty cart
    $("#emptyCartContent").css("display", "flex");
    $("#emptyCartContent").hide();
    $("#emptyCartContent").fadeIn("slow");

    // fade in if items in cart
    // $("#fullCartContent").css("display", "flex");
    // $("#fullCartContent").hide();
    // $("#fullCartContent").fadeIn("slow");

    // remove other content
    $("#loginContent").css("display", "none");
    $("#createAccountContent").css("display", "none");
});



$('#popoverExit').click(function(){
    $("#headerPopover").fadeOut("slow");
    $("#loginContent").fadeOut("slow");
    $("#emptyCartContent").fadeOut("slow");
    $("#fullCartContent").css("display", "none");
    $("#createAccountContent").fadeOut("slow");
});




    $('#listingBtn').click(function(){
      window.location.href='listing.html';
    });
    // header popover begins


    $('#user').click(function(){
        $("#headerPopover").fadeIn("slow");
        $("#loginContent").css("display", "flex");
        $("#cartContent").css("display", "none");
    });

    $('#cart').click(function(){
        $("#headerPopover").fadeIn("slow");
        $("#cartContent").css("display", "flex");
        $("#loginContent").css("display", "none");
    });



    $('#popoverExit').click(function(){
        $("#headerPopover").fadeOut("slow");
        $("#loginContent").css("display", "none");
        $("#cartContent").css("display", "none");
    });



// ----------------------------------------------------------------------------------------------------------------------------------


    let handleHomeAnimals = async () => {

        let response = await fetch('/findAnimal')
        let data = await response.json()

        let cardParent = document.querySelector(".all-listings");
        let cards = document.querySelectorAll(".card");

        cardParent.innerHTML = ""
        for (card of data) {
            cardParent.innerHTML += `
                <div class="card">
                <div class="top-info">
                <div class="username">
                <h5>John Doe</h5>
                </div>
                <div class="rating">
                <h5>4.5#</h5>
                </div>
                </div>
                <div class="card-img">
                <button class="favourite" type="button" name="button"> <a class="fa fa-heart" href="#"></a> </button>
                <img src="${card.url}" alt="">
                </div>
                <div class="bottom-info">
                <div class="title">
                <h4>${card.name}</h4>
                </div>
                <div class="price">
                <h5>$${card.price.toLocaleString()}</h5>
                </div>
                </div>
                </div>
            `
        }

    }
    handleHomeAnimals();




    let testUser = async () => {
        input = "johnlennon"
        let result = await fetch(`/findUser?q=${input}`);
        let rawData = await result.json();

        console.log(rawData);
    }

    testUser();








})();
