(function($){

	var containerking= $('.slick__king')
	var containerwin = $(".win__slick")
	var containerdetails = $(".slick__details")
	var containerCuriosityText = $(".slick-curiosity_text")
	var containerCuriosityImg = $(".slick-curiosity_img")
	var containerCuriositymob = $(".slick__mob_curiosity")
	
	
	containerCuriosityText.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		asNavFor: '.slick-curiosity_img',
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		prevArrow: $('.curiosity-nav').find('.slick-prev'),
        nextArrow: $('.curiosity-nav').find('.slick-next'),
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerCuriosityImg.slick({
		autoplay: false,
		asNavFor: '.slick-curiosity_text',
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		prevArrow: $('.curiosity-nav').find('.slick-prev'),
        nextArrow: $('.curiosity-nav').find('.slick-next'),
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerCuriositymob.slick({
		autoplay: false,
		asNavFor: '.slick-curiosity_text',
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: true,
		prevArrow: $('.curiosity-nav').find('.slick-prev'),
        nextArrow: $('.curiosity-nav').find('.slick-next'),
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerwin.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	});

	containerdetails.slick({
		autoplay: false,
		asNavFor: '.slick__details',
		autoplaySpeed: 1000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: false,
		dots: false,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 2,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				
			}
			
			}]
	});

	var produtos = [113502,114348,114386,114390,114394];

    var template_produtos =
		'<div class="item">' +
			'<a class="link">' +
				'<div class="foto"><span class="discount d-none"></span>' +
					'<span class="thumb">' +
						'<img class="lozad img-fluid" src="assets/img/pixel-2.png">' +
					'</span>' +
				'</div>' +
				'<div class="tags"></div>' +
				'<h2 class="title"></h2>' +
				'<div class="price"></div>' +
				'<div class="product-variants">' +
					'<div class="variants-slider"></div>' +
				'</div>' +
				'<div class="product-actions"></div>' +
			'</a>' +
		'</div>';

    var vitrine = $('#vitrine-fut');

	
	$.getJSON('https://www.futfanatics.com.br/web_api/products?id=' + produtos.join(","), '', function (data) {
		if (data) {
			var variants = [];

			data.Products.forEach(function(dataProduct){

				var product = dataProduct.Product

				if (product.available != 0) {
					var template = jQuery(template_produtos);

					var link = product.url.https;
					var img = product.ProductImage[0].thumbs[180].https;
					var title = product.name;
					var pricePromo = product.promotional_price;
					var price = product.price;
					var percentDiscount = 100 - (pricePromo/price) * 100;
					var payment = product.payment_option;
					var personalization = product.Properties['Permite Personalização'] == 'Sim' ? true : false;
					var release = product.release == "1" ? true : false;

					template.find('.link').attr('href', link);
					template.find('.foto span img').attr('src', img);
					template.find('.title').html(title);

					if (percentDiscount < 100) {
						template.find('.foto .discount').html('▾ ' + percentDiscount.toFixed() + '%').removeClass('d-none');
					}

					// lozad('.lozad', {
					//     load: function(target)
 
					//             target.src = target.dataset.src;
					//             target.onload = function() {
					//                 target.classList.add('fadein');
					//             }
					//     }
					// }).observe();

					if (release && pricePromo != 0 && personalization) {
						template.find('.tags').html('<span class="lancamento">Lançamento</span> <span class="oferta">Oferta</span>');
					} else if (pricePromo != 0 && personalization) {
						template.find('.tags').html('<span class="oferta">Oferta</span> <span class="personalize">Personalize</span>');
					} else if (product.release && pricePromo != 0) {
						template.find('.tags').html('<span class="lancamento">Lançamento</span><span class="oferta">Oferta</span>');
					} else {

						if (release) {
							template.find('.tags').html('<span class="lancamento">Lançamento</span>');
						} else if (pricePromo != 0) {
							template.find('.tags').html('<span class="oferta">Oferta</span>');
						} else if (personalization) {
							template.find('.tags').html('<span class="personalize">Personalize</span>');
						}
					}

					if (pricePromo != 0) {
						template.find('.price').html('<div class="old-price">R$ ' + price.replace('.', ',') + '</div><div class="current-price">R$ ' + pricePromo.replace('.', ',') + '</div>');
					} else {
						template.find('.price').html('<div class="current-price">R$ ' + price.replace('.', ',') + '</div>');
					}
					if (payment) {
						template.find('.price').append('<div class="installments">' + payment.replace('Sem juros', '').replace('desconto', 'desconto via PIX') + '</div>');
					}

					
					// variants[0].forEach(function(row){
					//     if (row) {
					//         template.find('.variants-slider').append(
					//             '<div class="variants-item">' +
					//                 '<button type="button" data-variant="'+ row.Variant.id +'">' + 
					//                     row.Variant.Sku[0].value + 
					//                 '</button>' +
					//             '</div>'
					//         );
					//     }
					// });

					// template.find('.product-actions').html(
					//     '<a href="#" class="bt_comprar d-flex justify-content-center" title="Adicionar este item ao seu carrinho">' +
					//         '<i></i>' +
					//         '<span>Comprar</span>' +
					//     '</a>'
					// );

	//                vitrine.append(template);
					vitrine.slick('slickAdd', template);
				}
			});

			// jQuery.ajax({
			//     url: "https://www.futfanatics.com.br/web_api/variants?product_id=" + product.id,
			//     //context: document.body,
			//     async: false,
			//     method: "GET",
			//     crossDomain: true,
			//   }).done(function(data) {
			//       console.log("Data:",data);
			//     variants.push(data.Variants);
			//   });
				
			
		}
	});

	vitrine.html('');


	if (isMobile()) {
		vitrine.slick({
			autoplay: false,
			infinite: false,
			speed: 500,
			arrows: true,
			dots: true,
			slidesToShow: 2,
			slidesToScroll: 2,
	//        lazyLoad: 'ondemand',
			prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="sprite icon-arrow-left"></i></button>',
			nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="sprite icon-arrow-right"></i></button>',
		});

	} else {

		vitrine.slick({
			autoplay: false,
			infinite: false,
			speed: 500,
			arrows: true,
			dots: true,
			slidesToShow: 5,
			slidesToScroll: 5,
	//        lazyLoad: 'ondemand',
			prevArrow: '<button class="slick-prev slick-arrow" type="button"><i class="sprite icon-arrow-left"></i></button>',
			nextArrow: '<button class="slick-next slick-arrow" type="button"><i class="sprite icon-arrow-right"></i></button>',
		});

	}
    
	



	function copyToClipboard(element) {
		var $temp = $("<input>");
		$("body").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	}

	$('.name-cupom').on('click', function() {
		var $el = $(this)
		copyToClipboard($el .find('.cupom'));
		$($el).addClass('copied');
		setTimeout(function() {
			$($el).removeClass('copied');
		}, 3000);
	});

	$('.c-modalVote form').on('submit', function(event) {
		console.log('clickou');
		event.preventDefault();

		var form = $(this);
		var formData = form.serialize();
		var url = 'https://apiinfra.futfanatics.app/voto-top10';
		// var url = 'http://localhost/api-infra/voto-top10';

		form.find('.msg-resp').html('').removeClass('text-success text-danger text-info').slideUp();

		if (!form.find('select').val()) {
			form.find('.msg-resp').html('Escolha o seu time.').addClass('text-info').slideDown();
			return false;
		}

		console.log(formData);
	
		$.post(url, formData, function(response) {
			if (response.status) {
				form.find('.msg-resp').html('Boa jogada, e-mail cadastrado com sucesso!').addClass('text-success').slideDown();

				setTimeout(function() {
					var selected = $('.list-camisas .item.selected');

					$('#modal-votar').modal('hide');
					$('.col-content').addClass('d-none');
					$('.col-cupom').addClass('active');
					$('html, body').animate({
                		scrollTop: ($('#voto-concluido').offset().top - $('#header').height() - $('.header-nav').height() - 50)
                		// scrollTop: 0
            		}, 800);
				}, 1000);
			} else {
				form.find('.msg-resp').html('Desculpe-nos, ocorreu um erro ao cadastrar.').addClass('text-danger').slideDown();
				console.log('Error form dinamize: ' + response.error_msg.result);
			}
		}).fail(function(response) {
			form.find('.msg-resp').html(response.responseJSON.errorMsg).addClass('text-danger').slideDown();
		});

		return false;
	});

	$('.title-idols').on('click',function(){
		$('.title-idols').addClass('active');
		$('.content-title').addClass('active');
		$('.content-about').removeClass('active');
		$('.about').removeClass('active');
	});

	$('.about').on('click',function(){
		$('.about').addClass('active');
		$('.content-about').addClass('active');
		$('.content-title').removeClass('active');
		$('.title-idols').removeClass('active');
	})

	$('.see-more').on('click', function() {
		console.log($(this).siblings('.content-history').hasClass('active'));

		multiSlideAdaptiveHeight($('.slick__history'));

		if (!$(this).siblings('.content-history').hasClass('active')) {
			$(this).html('Mostrar menos -');
			$(this).siblings('.content-history').addClass('active');
		} else { 
			$(this).html('Mostrar mais +');
			$(this).siblings('.content-history').removeClass('active');
		}
		return false;
	});

	$('.slick__history').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		if (window.innerWidth < 768) {

			$('html, body').animate({
                scrollTop: $(this).offset().top - 102
            }, 800);
		}
	});


	containerking.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		prevArrow: $('.slick-nav_king').find('.slick-prev'),
        nextArrow: $('.slick-nav_king').find('.slick-next'),
		adaptiveHeight: true,
		slidesToShow: 5,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var current = currentSlide + 1;
		$('.slick-nav_shirt').find('.slick-numbers .current').html(current < 10 ? "0" + current : current)}
);

	



	containerhistory.slick({
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnFocus: false,
		pauseOnHover: false,
		arrows: true,
		dots: false,
		adaptiveHeight: true,
		prevArrow: $('.slick-nav_historia').find('.slick-prev'),
        nextArrow: $('.slick-nav_historia').find('.slick-next'),
		slidesToShow: 1,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,

						}
			
			}]
	}).on('afterChange', function(event, slick, currentSlide, nextSlide){
		var current = currentSlide + 1;
		$('.slick-nav_historia').find('.slick-numbers .current').html(current < 10 ? "0" + current : current)}
);
	
    function multiSlideAdaptiveHeight(slider) {

        var activeSlides = [];
        var tallestSlide = 0;
        
        setTimeout(function() {
        
            $('.slick-track .slick-active', slider).each(function(item) {
                activeSlides[item] = $(this).outerHeight();
            });
        
            activeSlides.forEach(function(item) {
            	if (item > tallestSlide) {
					tallestSlide = item;
				}
			});
        
			$('.slick-list', slider).height(tallestSlide);
        }, 10);
    }


	function isMobile() {
		if (window.innerWidth > 991) {
			return false;
		}
		return true;
	}
	

})(jQuery);

