$(document)
	.ready(function () {

		// ------------------------------------------ //
		// HOME SLIDER
		// ------------------------------------------ //

		var slides = $('.slider__slide');
		var slides_active = 'slider__slide--active';
		slides.hide();
		$('.slider__slide--active').show();

		if ($(window).width() > 768) {

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
function initMap() {
	var map = new google
		.maps
		.Map(document.getElementById('map'), {
			zoom: 10,
			scrollwheel: false,
			center: {
				lat: -33.9,
				lng: 151.2
			}
		});
	setMarkers(map);
}

var beaches = [
	[
		'Bondi Beach', -33.890542, 151.274856, 4
	],
	[
		'Coogee Beach', -33.923036, 151.259052, 5
	],
	[
		'Cronulla Beach', -34.028249, 151.157507, 3
	],
	[
		'Manly Beach', -33.80010128657071, 151.28747820854187, 2
	],
	['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
	var image = {
		url: 'images/map/map__icon--representations-icon.svg',
		size: new google
			.maps
			.Size(45, 45),
		origin: new google
			.maps
			.Point(0, 0),
		anchor: new google
			.maps
			.Point(0, 32)
	};
	var shape = {
		coords: [
			1,
			1,
			1,
			20,
			18,
			20,
			18,
			1
		],
		type: 'poly'
	};
	for (var i = 0; i < beaches.length; i++) {
		var beach = beaches[i];
		var marker = new google
			.maps
			.Marker({
				position: {
					lat: beach[1],
					lng: beach[2]
				},
				map: map,
				icon: image,
				shape: shape,
				title: beach[0],
				zIndex: beach[3]
			});
	}
}
