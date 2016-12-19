$(document)
	.ready(function () {

		// ------------------------------------------ //
		// HOME SLIDER
		// ------------------------------------------ //
		var slides = $('.slider__slide');
		var slides_active = 'slider__slide--active';
		slides.hide();
		$('.slider__slide--active').show();

		if ($(window).width() > 1200) {

			$('.js-projects-slider:nth-child(1)')
				.hover(function () {
					slides
						.removeClass(slides_active)
						.fadeOut(0)
						.hide();
					$('.slider__slide:nth-child(1)')
						.addClass(slides_active)
						.fadeIn(800)
						.show();
				});

			$('.js-projects-slider:nth-child(2)').hover(function () {
				slides
					.removeClass(slides_active)
					.fadeOut(0)
					.hide();
				$('.slider__slide:nth-child(2)')
					.addClass(slides_active)
					.fadeIn(800)
					.show();
			});

			$('.js-projects-slider:nth-child(3)').hover(function () {
				slides
					.removeClass(slides_active)
					.fadeOut(0)
					.hide();
				$('.slider__slide:nth-child(3)')
					.addClass(slides_active)
					.fadeIn(800)
					.show();
			});

			$('.js-projects-slider:nth-child(4)').hover(function () {
				slides
					.removeClass(slides_active)
					.fadeOut(0)
					.hide();
				$('.slider__slide:nth-child(4)')
					.addClass(slides_active)
					.fadeIn(800)
					.show();
			});

			$('.js-projects-slider:nth-child(5)').hover(function () {
				slides
					.removeClass(slides_active)
					.fadeOut(0)
					.hide();
				$('.slider__slide:nth-child(5)')
					.addClass(slides_active)
					.fadeIn(800)
					.show();
			});
		};

		// ------------------------------------------ //
		// INPUT[TYPE="FILE"]
		// ------------------------------------------ //
		$('input[type="file"].uploadpicker').each(function () {
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

		// ------------------------------------------ //
		// SELECTFIX
		// ------------------------------------------ //
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
	});

// ------------------------------------------ //
// GOOGLE MAP
// ------------------------------------------ //
var locations = [
	[
		'3', 57.354645, 32.252347, 3, "./images/map/map__icon--factories-icon.svg"
	],
	[
		'2', 57.354645, 35.252347, 2, "./images/map/map__icon--offices-icon.svg"
	],
	['1', 57.354645, 38.252347, 1, "./images/map/map__icon--representations-icon.svg"]
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
