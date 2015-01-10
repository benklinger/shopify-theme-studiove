$(document).ajaxCart();
$('a').each(function() {
   var a = new RegExp('/' + window.location.host + '/');
   if(!a.test(this.href)) {
       $(this).click(function(event) {
           event.preventDefault();
           event.stopPropagation();
           window.open(this.href, '_blank');
       });
   }
});

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});
$(".btn-products").click(function(){
    var $this = $(this);
  $(".row .products .col-md-3:nth-child(n+5)").slideToggle();
  $this.toggleClass('.btn-products');
  if($this.hasClass('.btn-products')){
      $this.text('Less Clocks...');         
  } else {
      $this.text('More Clocks...');
  }
});