$(function() {

	$('#my-menu').mmenu({
		extensions: ['theme-black', 'effect-menu-slide', 'pagedim-black', 'position-right'],
		navbar: {
			title: '<img src="img/logo-1.svg" alt="Салон красоты Смитлер">'
		}
	});

	var api = $('#my-menu').data('mmenu');
	api.bind('open:finish', function() {
		$('.hamburger').addClass('is-active');
	});
	api.bind('close:finish', function() {
		$('.hamburger').removeClass('is-active');
	});

		// фикс, выравнивает размеры в карусели (см. ниже function carouselService())
	$('.carousel-services').on('initialized.owl.carousel', function(){
		setTimeout(function(){
			carouselService();
		}, 50)
	});
	 //опции карусели
	 $('.carousel-services').owlCarousel({
	 	// loop: true,
	 	nav: true,
	 	smartSpeed: 700,
	 	navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
	 	responsiveClass: true,
	 	dots: false,
	 	responsive: {
	 		0: {
	 			items:1
	 		},
	 		1200: {
	 			items:2	
	 		},	 		
	 		1400: {
	 			items:3
	 		}
	 	}
	 });

	 function carouselService() {
	 	$('.carousel-services-item').each(function(){
	 		var ths  = $(this),
	 		thsh = ths.find('.carousel-services-content').outerHeight();
	 		ths.find('.carousel-services-image').css('min-height', thsh);
	 	});	
	 }carouselService();
//выделяет "span-ом" 2 слово в заголвках 3 уровня. В карусели.
	$('.carousel-services-composition .h3').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
	});
//выделяет "span-ом" 1 слово в заголвках 2 уровня. В секциях.
	$('section .h2').each(function() {
		var ths = $(this);
		ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
	});

	$('select').selectize();

	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartsSpeed: 700,
		nav: false,
		autoHeight: true,
	});

	$('.partners').owlCarousel({
		loop: true,
		nav: true,
		pagination: true,
		smartSpeed: 700,
		navText: ['<i class="fas fa-angle-double-left"></i>', '<i class="fas fa-angle-double-right"></i>'],
		responsiveClass: true,
		dots: false,
		responsive: {
			0: {
				items:1
			},
			768: {
				items:2	
			},
			992: {
				items:3	
			},			 		
			1200: {
				items:4
			}
		}
	});

	// Кнопка наверх	(в 1 части скрывает кнопку, 2 часть анимирует и выполняет действие)
	$(window).scroll(function(){
		if ($(this).scrollTop() > $(this).height()) {
			$('.top').addClass('active');
		} else {
			$('.top').removeClass('active');
		}
	}); 
	$('.top').click(function(){
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

		//E-mail Ajax Send
	$("form.callback").submit(function() { //Change (изменить) на form.callback)
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change (изменить) нужен путь желательно наверно от корня
			data: th.serialize()
		}).done(function() {
			$(th).find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success').removeClass('active').fadeOut();
				// Done Functions
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

	//Resize Window
	function onResize(){
			$('.carousel-services-content').equalHeights();
	}onResize();
	window.onresize = function() {onResize();carouselService();};
});


	$(window).on('load', function(){
		$('.preloader').delay(1000).fadeOut('slow');
	});