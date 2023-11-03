$(document).ready(function() {
	resizePanel();
	var carousel_change = $(".generic-slider-change");
	carousel_change.owlCarousel({
	loop:true,
	items : 1,
	singleItem:true,
	autoplay: true,
	autoplayTimeout: 5000,
	autoplaySpeed: 1000,
	nav:true,
	navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
});



$('#relate-prod').owlCarousel({
	navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
	responsiveclass: true,
	autoplay: true,
	responsive: {
		0: {
			items: 2,
			nav: true
		},
		768: {
			items: 3,
			nav: true
		},
		1000: {
			items: 3,
			nav: true,
			loop: true
		}
		
	}
});

/*--------------Start: PRODUCT BUY HOT-------------*/
$('#relate-prod02').owlCarousel({
	navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
	responsiveclass: true,
	autoplay: true,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		768: {
			items: 1,
			nav: true
		},
		1000: {
			items: 1,
			nav: true,
			loop: true
		}
		
	}
});
/*--------------end: PRODUCT BUY HOT-------------*/

/*--------------Start: SHOW LOGO PARTNER-------------*/
$('#relate-prod03').owlCarousel({
	navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
	responsiveclass: true,
	autoplay: true,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		768: {
			items: 3,
			nav: true
		},
		1000: {
			items: 4,
			nav: true,
			loop: true
		}
		
	}
});
/*--------------end: SHOW LOGO PARTNER-------------*/



/*--------------Start: CLIENT COMMENT-------------*/
$('#relate-prod04').owlCarousel({
	navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
	responsiveclass: true,
	autoplay: true,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		768: {
			items: 2,
			nav: true
		},
		1000: {
			items: 2,
			nav: true,
			loop: true
		}
		
	}
});
/*--------------end: CLIENT COMMENT-------------*/


/*--------------Start: PRODUCT BLENDER-------------*/
$('#relate-prod05').owlCarousel({
	navText:['<i class="ti-angle-left"></i>','<i class="ti-angle-right"></i>'],
	responsiveclass: true,
	autoplay: true,
	responsive: {
		0: {
			items: 1,
			nav: true
		},
		768: {
			items: 2,
			nav: true
		},
		1000: {
			items: 3,
			nav: true,
			loop: true
		}
		
	}
});
/*--------------end: PRODUCT BLENDER-------------*/

/*
carousel_change.owlCarousel({
singleItem:true,
items : 1,
navigation:true,
navigationText: false,
pagination:true,
rewindNav:true,
rewindSpeed:1,
theme:"owl-ref",
autoPlay: 3000,
afterInit: function(elem){
var posindex = elem.attr('data-jumpto');S
elem.trigger('owl.jumpTo', parseInt(posindex));
}
});
$(".next").click(function(){
carousel_change.trigger('owl.next');
})
$(".prev").click(function(){
carousel_change.trigger('owl.prev');
})
//$('.owl-carousel .owl-item .active').css('background', '#eee top center no-repeat fixed');
*/
});
$(window).resize(function() {
resizePanel();
});
/**
*
*/
function resizePanel() {
var w = $(window).width();
var h = $(window).height();
var dynamic_h = w*0.366;
$('.slider_panel').css('height', dynamic_h+'px');
}
