$.fn.selectFix = function (e) {
	var t = this;
	if (!t.length)
		return !1;
	var a = {},
		i = [],
		c = [];
	e = $.extend({
		"container-max-height": 200,
		"container-max-width": !1,
		"track-y-min-height": 20,
		"track-x-min-width": !1,
		"track-y-height": !1,
		"track-x-width": !1,
		arrow: !0,
		delta: 5,
		search: !1
	}, e || {}),
	a.isTouchable = function () {
		var e = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
		return this.isTouchable = function () {
			return e
		},
		e
	},
	a.setMultipleVal = function (e) {
		var t = "";
		e.checkbox.length && e
			.checkbox
			.each(function (e) {
				$(this).is(":checked")
					? ($(this).closest("label").addClass("selected"), t += "<span>" + $(this).closest("label").find("span").html() + '<span data-id="' + e + '">&times;</span></span>')
					: $(this)
						.closest("label")
						.removeClass("selected")
			}),
		"" == t && (t = "Выберите"),
		e
			.currentValue
			.html(t)
	},
	t.each(function (t) {
		if (!$(this).hasClass("selectfix")) {
			var l = "";
			console.log($(this).filter(":disabled").length),
			$(this)
				.filter(":disabled")
				.length && (l = " disabled"),
			i[t] = {},
			c[t] = {},
			i[t].select = $(this),
			i[t].options = $(this).find("option"),
			i[t]
				.select
				.addClass("selectfix");
			var s = "";
			e["container-max-width"] && (s += "max-width: " + e["container-max-width"] + "px;"),
			i[t]
				.select
				.wrap('<div class="selectfix-container js-mobile' + l + '" style="' + s + '" />'),
			i[t].container = i[t]
				.select
				.parent(),
			a.isTouchable() && i[t]
				.container
				.addClass("touch"),
			i[t]
				.container
				.append('<div class="selectfix-current-value' + l + '" unselectable="on" />'),
			i[t].currentValue = i[t]
				.container
				.find(".selectfix-current-value"),
			i[t]
				.container
				.append('<div class="selectfix-border" />'),
			i[t].border = i[t]
				.container
				.find(".selectfix-border"),
			i[t]
				.border
				.append('<div class="selectfix-list" data-id="' + t + '" />'),
			i[t].list = i[t]
				.border
				.find(".selectfix-list"),
			i[t].checkbox = $();
			var n = !1,
				r = 0;
			i[t]
				.select
				.attr("multiple") && (n = !0);
			var h = "",
				o = "";
			i[t]
				.options
				.each(function (e) {
					if (h = "", o = "", $(this).is(":selected")) {
						r++,
						h = " selected",
						o = " checked";
						var a = $(this).html();
						i[t]
							.select
							.data("label") && (a = i[t].select.data("label") + " " + a),
						n || i[t]
							.currentValue
							.html(a)
					}
					if (n) {
						var c = $('<label class="selectfix-value' + h + '" data-index="' + e + '" unselectable="on"><input type="checkbox" value="' + $(this).val() + '"' + o + " /><span>" + $(this).html() + "</span></label>");
						i[t].checkbox = i[t]
							.checkbox
							.add(c.find("input"))
					} else
						var c = $('<div class="selectfix-value' + h + '" data-index="' + e + '" unselectable="on">' + $(this).html() + "</div>");
					c.data("text", $(this).html()),
					i[t]
						.list
						.append(c),
					$(this).data("index", e)
				}),
			n && a.setMultipleVal(i[t]);
			var d = 0,
				u = i[t]
					.list
					.find(".selectfix-value.selected");
			u.length && (d = i[t].border.css("padding-top").replace("px", "") - u.position().top),
			$.fn.scrollPane && i[t]
				.list
				.scrollPane({
					"container-max-height": e["container-max-height"],
					"container-max-width": e["container-max-width"],
					"track-y-min-height": e["track-y-min-height"],
					"track-x-min-width": e["track-x-min-width"],
					"track-y-height": e["track-y-height"],
					"track-x-width": e["track-x-width"],
					"scroll-bottom": !1,
					arrow: e.arrow,
					type: "vertical",
					delta: e.delta,
					"scroll-to-y": d
				}),
			i[t].value = i[t]
				.list
				.find(".selectfix-value"),
			(e.search || i[t].select.data("search")) && (i[t].border.prepend('<div class="selectfix-search"><input type="text" value="" name="search" /></div>'), i[t].search = i[t].border.find(".selectfix-search"), i[t].search.find("input").keyup(function () {
				var a = $(this).val();
				i[t]
					.value
					.show(),
				i[t]
					.value
					.each(function () {
						a.length > 0 && $(this)
							.data("text")
							.toUpperCase()
							.indexOf(a.toUpperCase()) < 0
							? ($(this).hide(), $(this).html($(this).data("text")))
							: $(this).html($(this).data("text").replace(RegExp(a, "ig"), "<b>$&</b>"))
					});
				var c = i[t]
						.value
						.filter(".selected:visible"),
					l = 0;
				c.length && (l = 1 * i[t].list.css("margin-top").replace("px", "") - 1 * i[t].value.filter(".selected").position().top),
				$.fn.scrollPane && i[t]
					.list
					.scrollPane({
						"container-max-height": e["container-max-height"],
						"container-max-width": e["container-max-width"],
						"track-y-min-height": e["track-y-min-height"],
						"track-x-min-width": e["track-x-min-width"],
						"track-y-height": e["track-y-height"],
						"track-x-width": e["track-x-width"],
						"scroll-bottom": !1,
						arrow: e.arrow,
						type: "vertical",
						delta: e.delta,
						"scroll-to-y": l
					})
			})),
			i[t]
				.currentValue
				.not(".disabled")
				.click(function () {
					i[t]
						.container
						.toggleClass("opened")
				}),
			n
				? (i[t].checkbox.change(function () {
					var e = [];
					i[t]
						.checkbox
						.each(function () {
							if ($(this).is(":checked")) {
								e.push($(this).val())
							}
						}),
					i[t]
						.select
						.val(e)
						.trigger("change")
				}), i[t].currentValue.on("click", "span span", function (e) {
					i[t]
						.options
						.eq($(this).data("id"))
						.attr("selected", !1)
						.prop("selected", !1),
					i[t]
						.select
						.trigger("change"),
					e.stopPropagation()
				}))
				: i[t]
					.value
					.click(function () {
						$(this).hasClass("disabled") || i[t]
							.select
							.val(i[t].options.eq($(this).data("index")).val())
							.trigger("change")
					}),
			i[t]
				.select
				.change(function () {
					if (n)
						i[t].checkbox.prop("checked", !1),
						i[t].options.each(function (e) {
							$(this).is(":selected") && i[t]
								.checkbox
								.eq(e)
								.prop("checked", !0)
						}),
						a.setMultipleVal(i[t]);
					else {
						var e = $(this).find("option:selected"),
							c = e.html();
						i[t]
							.select
							.data("label") && (c = i[t].select.data("label") + " " + c),
						i[t]
							.currentValue
							.html(c),
						i[t]
							.container
							.removeClass("opened"),
						i[t]
							.value
							.removeClass("selected"),
						i[t]
							.value
							.eq(e.data("index"))
							.addClass("selected")
					}
				})
		}
	})
};
