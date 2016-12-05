// ------------------------------------------ //
// MISC
// ------------------------------------------ //
$(function() {

	/* touch */
	var support_touch = ('ontouchend' in document);
	if(support_touch)
		$('body').addClass('touch-content');





	/* js-input-number */
	$(document).on("change keyup input click", ".js-input-number", function() {
		if(this.value.match(/[^0-9]/g))
			this.value = this.value.replace(/[^0-9]/g, '');
	});





	/* datepicker */
	if($('.time-group').length > 0) {
		$('.time-group').datepicker({
			inputs: $('.datepicker'),
			autoclose: true,
			format: "dd.mm.yy",
			language: "ru",
			todayHighlight: true,
			toggleActive: true
		});

		$(document).on('click', '.js-toggle-datepicker', function() {
			var input = $(this).parents('.time-control').find('input');

			if($(this).parents('.time-control').hasClass('filled')) {
				input.datepicker('clearDates');
				$(this).parents('.time-group').find('.datepicker').datepicker('update');
			} else
				input.focus();

			return false;
		});

		$(document).on('change', '.time-control .datepicker', function() {
			if($(this).val() != '')
				$(this).parents('.time-control').addClass('filled');
			else $(this).parents('.time-control').removeClass('filled');
		});
	}





	/* filter */
	$('.js-catalog-filter .filter-section.disabled .collapse').on('show.bs.collapse', function() {
		return false;
	});

	$(document).on('change', '.js-catalog-filter input[type="checkbox"]', function() {
		var chbxGroup = $(this).parents('.filter-section');
		var chbxCnt = chbxGroup.find('input[type="checkbox"]:enabled:checked').length;

		chbxGroup.toggleClass('active', chbxCnt > 0);
	});

	$(document).on('change', '.js-catalog-filter input', function() {
		$('.js-catalog-filter .input-block .catalog-filter-result').remove();
		var resultBlock = $(this).parents('.js-catalog-filter').find('.catalog-filter-result').clone();
		$(this).parents('.input-block').append(resultBlock).find('.catalog-filter-result').show(0, function() {
			setTimeout(function() {
				$('.js-catalog-filter .input-block .catalog-filter-result').fadeOut(500, function() {
					$(this).remove();
				});
			}, 3500);
		});
	});





	/* search */
	$(document).on('change input focus', '.js-search-form .form-control', function() {
		if($(this).val() != '') {
			$(this).parents('.search-block').addClass('active js-active-block');
			$(this).parents('.search-block').find('.search-result').addClass('visible-block');
		} else {
			$(this).parents('.search-block').find('.search-result').removeClass('visible-block');
		}
	});
	$(document).on('click', '.js-hide-search', function() {
		$(this).parents('.search-result').removeClass('visible-block');
	});





	/* js-add-product */
	$(document).on('change input focus', '.js-add-product-form .form-control', function() {
		if($(this).val() != '') {
			$(this).parents('.add-product-form').addClass('active js-active-block');
			$(this).parents('.add-product-form').find('.add-product-result').addClass('visible-block');
		} else {
			$(this).parents('.add-product-form').find('.add-product-result').removeClass('visible-block');
		}
	});





	/* hint */
	/* $(document).on('click', '.js-toggle-hint', function(){
		if (!$(this).parents('.hint').hasClass('active')){
			if ($('.hint.active').length){
				$('.hint.active').removeClass('active js-active-block').find('.popover').fadeOut(150);
			}
			$(this).parents('.hint').addClass('active js-active-block').find('.popover').fadeIn(150);

			$('body').addClass('toggle-block-open');
		}
		else {
			$(this).parents('.hint').removeClass('active js-active-block').find('.popover').fadeOut(150);

			$('body').removeClass('toggle-block-open');
		}

		event.preventDefault();
	});
	$(document).on('toggleBlock', '.hint', function(event){
		$(this).find('.popover').fadeOut(150);
	}); */

	if($('.hint .js-toggle-hint').length > 0) {
		$('.hint .js-toggle-hint').popover({
			html: true,
			trigger: 'manual',
			//	placement: 'top',
			content: function() {
				return $(this).parents('.hint').find('.hint-content').html();
			},
			template: '<div class="popover" role="tooltip"><div class="arrow"></div><a class="icon icon-close close js-close-hint"></a><div class="popover-content"></div></div>'
		});
		$(document).on('click', '.js-toggle-hint', function() {
			if(!$(this).parents('.hint').hasClass('active')) {
				if($('.hint.active').length) {
					$('.hint.active').removeClass('active js-active-block').find('.js-toggle-hint').popover('hide');
				}
				$(this).popover('show').parents('.hint').addClass('active js-active-block');
			} else {
				$(this).popover('hide').parents('.hint').removeClass('active js-active-block');
			}
		});
		$(document).on('click', '.js-close-hint', function() {
			var popoverID = $(this).parents('.popover').attr('id');
			$('[aria-describedby="' + popoverID + '"]').trigger('click');
		});
		$(document).on('toggleBlock', '.hint', function(event) {
			$(this).find('.js-toggle-hint').popover('hide');
		});
	}





	/* js-toggle-block-activity */
	$(document).on('click', '.js-toggle-block-activity', function() {
		var target = $(this).data('target');

		if(!$(target).hasClass('js-active-block')) {
			if(!$(target).closest('.js-active-block').length)
				$('.js-active-block').removeClass('active js-active-block').trigger('toggleBlock');
			else
				$(target).closest('.js-active-block').find('.js-active-block').removeClass('active js-active-block').trigger('toggleBlock');

			$('body').removeClass('toggle-block-open');
		}

		if(target != undefined) {
			$(target).toggleClass('active').toggleClass('js-active-block').trigger('toggleBlock');

			$('body').toggleClass('toggle-block-open');
		}

		event.preventDefault();
		//return false;
	});

	/* js-active-block */
	$(document).on('click', function(event) {
		if($(event.target).hasClass('js-toggle-block-activity') || $(event.target).closest('.js-toggle-block-activity').length)
			return;

		if($(event.target).closest('.js-active-block').length) {
			$(event.target).closest('.js-active-block').find('.js-active-block').removeClass('active js-active-block').trigger('toggleBlock');
			return;
		}
		$('.js-active-block').removeClass('active js-active-block').trigger('toggleBlock');
		$('body').removeClass('toggle-block-open');

		event.stopPropagation();
	});

	// останавливает всплытие события к родительским элементам
	$(document).on('toggleBlock', '*', function(event) {
		event.stopPropagation();
	});





	/* js-toggle-text */
	$(document).on('click', '.js-toggle-text', function() {
		var text = $(this).data('text');
		if(text != undefined) {
			var tmp = $(this).text();
			$(this).text(text).data('text', tmp);
		}
	});





	/* Для разукраски input[type="file"]*/
	$('input[type="file"].uploadpicker').each(function() {
		var field = $(this);
		var required = field.is('[required]');
		var disabled = field.is('[disabled]');
		var placeholder = field.attr('placeholder');
		field
			.addClass('upload-field-overlay')
			.removeAttr('required')
			.wrap('<span class="widget-upload-field' + (disabled ? ' disabled' : '') + '"/>')

		var wrapper = field.parent();
		wrapper
			.prepend('<input class="upload-field-value form-control" type="text"' + (required ? ' required="required"' : '') + (disabled ? ' disabled="disabled"' : '') + ' placeholder="Файл не выбран" />')
			.prepend('<span class="icon icon-file"></span><span class="upload-field-btn">' + (placeholder ? placeholder : 'Прикрепить файл') + '</span>');

		field.bind('change', function() {
			var values = [this.value.split(/[\/\\]/).pop()];
			if(this.files) {
				values = [];
				for(var i = 0; i < this.files.length; i++) {
					values.push(this.files[i].name);
				}
			}
			var parts = $(this).val();
			wrapper.find('.upload-field-value').val(values.join(', '));
		});
	});

	/* selectFix */
	if($.fn.selectFix) {
		$('select').selectFix({
			'container-max-height': 200,
			'arrow': true,
			'type': 'vertical'
		});
	}
	var mobileNot = $();
	$('html').on('click', '*', function(event) {
		var mobile = $('.js-mobile.opened');
		if($(this).closest('.js-mobile').length) {
			mobileNot = mobileNot.add($(this).closest('.js-mobile'));
			//	event.stopPropagation();
		}
		mobile = mobile.not(mobileNot);
		mobile.removeClass('opened');
		setTimeout(function() {
			mobileNot = $();
		}, 500);
	});
});


// ------------------------------------------ //
// GOOGLE MAP
// ------------------------------------------ //
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: {
			lat: -33.9,
			lng: 151.2
		}
	});

	setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var beaches = [
	['Bondi Beach', -33.890542, 151.274856, 4],
	['Coogee Beach', -33.923036, 151.259052, 5],
	['Cronulla Beach', -34.028249, 151.157507, 3],
	['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
	['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
	// Adds markers to the map.

	// Marker sizes are expressed as a Size of X,Y where the origin of the image
	// (0,0) is located in the top left of the image.

	// Origins, anchor positions and coordinates of the marker increase in the X
	// direction to the right and in the Y direction down.
	var image = {
		url: 'images/beachflag.png',
		// This marker is 20 pixels wide by 32 pixels high.
		size: new google.maps.Size(20, 32),
		// The origin for this image is (0, 0).
		origin: new google.maps.Point(0, 0),
		// The anchor for this image is the base of the flagpole at (0, 32).
		anchor: new google.maps.Point(0, 32)
	};
	// Shapes define the clickable region of the icon. The type defines an HTML
	// <area> element 'poly' which traces out a polygon as a series of X,Y points.
	// The final coordinate closes the poly by connecting to the first coordinate.
	var shape = {
		coords: [1, 1, 1, 20, 18, 20, 18, 1],
		type: 'poly'
	};
	for(var i = 0; i < beaches.length; i++) {
		var beach = beaches[i];
		var marker = new google.maps.Marker({
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
