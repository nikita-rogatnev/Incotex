$(document)
	.ready(function () {

		// ------------------------------------------ //
		// ADD SWIPE TO SLIDERS
		// ------------------------------------------ //
		if ($(".carousel").length) {
			$(".carousel").swipe({
				//Generic swipe handler for all directions
				swipeLeft: function (event, direction, distance, duration, fingerCount) {
					$(this)
						.parent()
						.carousel('next');
				},
				swipeRight: function () {
					$(this)
						.parent()
						.carousel('prew');
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold: 0
			});
		};

		// ------------------------------------------ //
		// HOME SLIDER
		// ------------------------------------------ //
		if ($(".slider").length) {
			if ($(window).width() > 991) {
				$(document)
					.on('mouseenter', '.js-projects-slider', function () {
						changeSlide($(this).index());
					});
			};

			function changeSlide(index) {
				if (!$('.slider__slide').eq(index).hasClass('slider__slide--active')) {
					$('.slider__slide')
						.stop(true, true)
						.removeClass('slider__slide--active')
						.fadeOut(800);

					$('.slider__slide')
						.eq(index)
						.addClass('slider__slide--active')
						.fadeIn(800);
				}
			};
		};

		// ------------------------------------------ //
		// INPUT[TYPE="FILE"]
		// ------------------------------------------ //
		if ($('input[type="file"].uploadpicker').length) {
			$('input[type="file"].uploadpicker')
				.each(function () {
					var field = $(this);
					var required = field.is('[required]');
					var disabled = field.is('[disabled]');
					var placeholder = field.attr('placeholder');
					field
						.addClass('upload-field-overlay')
						.removeAttr('required')
						.wrap('<span class="widget-upload-field' + (disabled
							? ' disabled'
							: '') + '"/>')
					var wrapper = field.parent();
					wrapper.prepend('<input class="upload-field-value form-control" type="text"' + (required
						? ' required="required"'
						: '') + (disabled
						? ' disabled="disabled"'
						: '') + ' placeholder="Файл не выбран" />').prepend('<span class="icon icon-file"></span><span class="upload-field-btn">' + (placeholder
						? placeholder
						: 'Прикрепить файл') + '</span>');
					field.bind('change', function () {
						var values = [
							this
								.value
								.split(/[\/\\]/)
								.pop()
						];
						if (this.files) {
							values = [];
							for (var i = 0; i < this.files.length; i++) {
								values.push(this.files[i].name);
							}
						}
						var parts = $(this).val();
						wrapper
							.find('.upload-field-value')
							.val(values.join(', '));
					});
				});
		};

		// ------------------------------------------ //
		// SELECTFIX
		// ------------------------------------------ //
		if ($("select").length) {
			if ($.fn.selectFix) {
				$('select').selectFix({'container-max-height': 200, 'arrow': true, 'type': 'vertical'});
			}
			var mobileNot = $();
			$('html').on('click', '*', function (event) {
				var mobile = $('.js-mobile.opened');
				if ($(this).closest('.js-mobile').length) {
					mobileNot = mobileNot.add($(this).closest('.js-mobile'));
					//	event.stopPropagation();
				}
				mobile = mobile.not(mobileNot);
				mobile.removeClass('opened');
				setTimeout(function () {
					mobileNot = $();
				}, 500);
			});
		}

		// ------------------------------------------ //
		// DOUBLE RANGE
		// ------------------------------------------ //
		if ($(".js-range-slider").length) {
			var $range = $(".js-range-slider"),
				$from = $(".js-from"),
				$to = $(".js-to"),
				range,
				min = 0,
				max = 2000,
				from,
				to;

			var updateValues = function () {
				$from.prop("value", from);
				$to.prop("value", to);
			};

			$range.ionRangeSlider({
				type: "double",
				min: min,
				max: max,
				prettify_enabled: false,
				grid: false,
				decorate_both: false,
				hide_min_max: true,
				hide_from_to: true,

				onChange: function (data) {
					from = data.from;
					to = data.to;

					updateValues();
				}
			});

			range = $range.data("ionRangeSlider");

			var updateRange = function () {
				range.update({from: from, to: to});
			};

			$from.on("change", function () {
				from = +$(this).prop("value");
				if (from < min) {
					from = min;
				}
				if (from > to) {
					from = to;
				}

				updateValues();
				updateRange();
			});

			$to.on("change", function () {
				to = +$(this).prop("value");
				if (to > max) {
					to = max;
				}
				if (to < from) {
					to = from;
				}

				updateValues();
				updateRange();

			});
		}

	});

// ------------------------------------------ //
// GOOGLE MAP
// ------------------------------------------ //
if ($("#map").length) {
	var locations = [
		[
			'<article class="map__project-item"><h1>Наименование объекта</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 57.354645, 32.252347, 3, "./images/map/map__icon--factories-icon.png"
		],
		[
			'<article class="map__project-item"><h1>Наименование объекта</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 57.354645, 35.252347, 2, "./images/map/map__icon--offices-icon.png"
		],
		['<article class="map__project-item"><h1>Наименование объекта</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 57.354645, 38.252347, 1, "./images/map/map__icon--representations-icon.png"]
	];

	var map = new google
		.maps
		.Map(document.getElementById('map'), {
			zoom: 6,
			scrollwheel: false,
			center: new google
				.maps
				.LatLng(57.354645, 38.252347),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	var infowindow = new google
		.maps
		.InfoWindow();

	var marker,
		i;

	for (i = 0; i < locations.length; i++) {
		marker = new google
			.maps
			.Marker({
				position: new google
					.maps
					.LatLng(locations[i][1], locations[i][2]),
				icon: locations[i][4],
				title: locations[i][0],
				optimized: false,
				map: map
			});

		google
			.maps
			.event
			.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
	}

	google
		.maps
		.event
		.addListener(infowindow, 'domready', function () {

			// Reference to the DIV which receives the contents of the infowindow using jQuery
			var iwOuter = $('.gm-style-iw');

			iwOuter
				.parent()
				.parent()
				.css({top: "96px", left: '-210px'});

			/* The DIV we want to change is above the .gm-style-iw DIV.
	    * So, we use jQuery and create a iwBackground variable,
	    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
	    */
			var iwBackground = iwOuter.prev();

			iwBackground
				.children(':nth-child(1)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(2)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(3)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(4)')
				.css({'display': 'none'});

		});
};

// ------------------------------------------ //
// GOOGLE MAP /about.html
// ------------------------------------------ //
if ($("#map2").length) {
	var locations = [
		[
			'<article class="map__project-item"><h1><a href="project.html">Освещение улицы</a></h1><span>Россия, г. Волгоград</span><small>Сдача работ: 2014</small><a href="project.html"><img src="./images/catalog/projects/project__item-1.jpg" alt="project item" width="300" height="120"></a></article>', 57.354645, 32.252347, 3, "./images/map/flag__red.png"
		],
		[
			'<article class="map__project-item"><h1><a href="project.html">Освещение улицы</a></h1><span>Россия, г. Волгоград</span><small>Сдача работ: 2014</small><a href="project.html"><img src="./images/catalog/projects/project__item-1.jpg" alt="project item" width="300" height="120"></a></article>', 57.354645, 35.252347, 2, "./images/map/flag__red.png"
		],
		['<article class="map__project-item"><h1><a href="project.html">Освещение улицы</a></h1><span>Россия, г. Волгоград</span><small>Сдача работ: 2014</small><a href="project.html"><img src="./images/catalog/projects/project__item-1.jpg" alt="project item" width="300" height="120"></a></article>', 57.354645, 38.252347, 1, "./images/map/flag__blue.png"]
	];

	var map = new google
		.maps
		.Map(document.getElementById('map2'), {
			zoom: 6,
			scrollwheel: false,
			center: new google
				.maps
				.LatLng(57.354645, 38.252347),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	var infowindow = new google
		.maps
		.InfoWindow();

	var marker,
		i;

	for (i = 0; i < locations.length; i++) {
		marker = new google
			.maps
			.Marker({
				position: new google
					.maps
					.LatLng(locations[i][1], locations[i][2]),
				icon: locations[i][4],
				title: locations[i][0],
				optimized: false,
				map: map
			});

		google
			.maps
			.event
			.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
	}

	google
		.maps
		.event
		.addListener(infowindow, 'domready', function () {

			// Reference to the DIV which receives the contents of the infowindow using jQuery
			var iwOuter = $('.gm-style-iw');

			iwOuter
				.parent()
				.parent()
				.css({top: "96px", left: '-197px'});

			/* The DIV we want to change is above the .gm-style-iw DIV.
	    * So, we use jQuery and create a iwBackground variable,
	    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
	    */
			var iwBackground = iwOuter.prev();

			iwBackground
				.children(':nth-child(1)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(2)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(3)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(4)')
				.css({'display': 'none'});

		});
}

// ------------------------------------------ //
// GOOGLE MAP /parters.html
// ------------------------------------------ //
if ($("#map3").length) {
	var locations = [
		[
			'<article class="map__project-item"><h1>Наименование компании</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 57.354645, 32.252347, 3, "./images/map/flag__red.png"
		],
		[
			'<article class="map__project-item"><h1>Наименование компании</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 56.454645, 34.452347, 3, "./images/map/flag__blue.png"
		],
		['<article class="map__project-item"><h1>Наименование компании</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 54.554645, 33.752347, 3, "./images/map/flag__red.png"]
	];

	var map = new google
		.maps
		.Map(document.getElementById('map3'), {
			zoom: 6,
			scrollwheel: false,
			center: new google
				.maps
				.LatLng(57.354645, 38.252347),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	var infowindow = new google
		.maps
		.InfoWindow();

	var marker,
		i;

	for (i = 0; i < locations.length; i++) {
		marker = new google
			.maps
			.Marker({
				position: new google
					.maps
					.LatLng(locations[i][1], locations[i][2]),
				icon: locations[i][4],
				title: locations[i][0],
				optimized: false,
				map: map
			});

		google
			.maps
			.event
			.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
	}

	google
		.maps
		.event
		.addListener(infowindow, 'domready', function () {

			// Reference to the DIV which receives the contents of the infowindow using jQuery
			var iwOuter = $('.gm-style-iw');

			iwOuter
				.parent()
				.parent()
				.css({top: "96px", left: '-197px'});

			/* The DIV we want to change is above the .gm-style-iw DIV.
		    * So, we use jQuery and create a iwBackground variable,
		    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
		    */
			var iwBackground = iwOuter.prev();

			iwBackground
				.children(':nth-child(1)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(2)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(3)')
				.css({'display': 'none'});

			iwBackground
				.children(':nth-child(4)')
				.css({'display': 'none'});

		});
}

// ------------------------------------------ //
// GOOGLE MAP /contacts.html
// ------------------------------------------ //
if ($("#map4").length) {
	var locations = [
		['<article class="map__project-item"><h1>Наименование компании</h1><span>109382, г.Москва, ул.Люблинская, д.72, оф.7</span><span class="dealers-list__contacts" style="display:block; margin-top:20px;"><span>Телефон: +7 (499) 703-01-83</span><span>Директор: +7 916 629-45-01</span><span>Сайт: <a href="#">www.company.ru</a></span></span></article>', 57.354645, 38.252347, 1, "./images/map/flag__red.png"]
	];

	var map = new google
		.maps
		.Map(document.getElementById('map4'), {
			zoom: 6,
			scrollwheel: false,
			center: new google
				.maps
				.LatLng(57.354645, 38.252347),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

	var infowindow = new google
		.maps
		.InfoWindow();

	var marker,
		i;

	for (i = 0; i < locations.length; i++) {
		marker = new google
			.maps
			.Marker({
				position: new google
					.maps
					.LatLng(locations[i][1], locations[i][2]),
				icon: locations[i][4],
				title: locations[i][0],
				optimized: false,
				map: map
			});

		google
			.maps
			.event
			.addListener(marker, 'click', (function (marker, i) {
				return function () {
					infowindow.setContent(locations[i][0]);
					infowindow.open(map, marker);
				}
			})(marker, i));
	}
}

google
	.maps
	.event
	.addListener(map, "click", function (event) {
		infowindow.close();
	});
