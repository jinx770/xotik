(function() {


// nav clicks
$('#logoBtn').click(function(){
  window.location.href='index.html';
});

// $('#animalsBtn').click(function(){
//
// })
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


// Collapsible for FAQ's on Who We Are page
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
























}());
