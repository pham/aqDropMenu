(function($) {
$.fn.aqDropMenu = function($arry, $options) {
	var _o = $.extend({
		stylized: true,
		spacer: 2,
		lineHeight: '1em',
		imgSrc: 'data:image/gif;base64,' +
			'R0lGODlhCwAKAKIGAFNTU1RUU1xcXEZGRjk5OTAwMP///wAAACH5BAE' +
			'AAAYALAAAAAALAAoAAAMVaLrcriVKuYi9pI29XwDAowhiaZ4JADs='
	}, $options);

	var _left_margin = function($ob) {
		var _menu = $('.aqDropMenu', $ob),
			_w = $ob.outerWidth(),
			_l = $ob.position().left;

		if (_l + _menu.outerWidth() > $(window).width()) {
			return _l - (_menu.outerWidth() - _w);
		}
		return _l;
	};

	return this.each(function() {
		var _ob = $(this),
			_menu = $('.aqDropMenu', this),
			_first = false,
			_i;

		if (!_menu.length) {
			if (_o.stylized) {
				$('<img\/>')
					.attr('src', _o.imgSrc)
					.css({paddingLeft: 2})
					.appendTo(this);
			}

			_menu = $('<div style="display:none" class="aqDropMenu"><\/div>')
				.appendTo(this);

			_first = true;
		}

		var _fg = _o.fg || _ob.css('color'),
			_bg = _o.bg || _ob.css('backgroundColor'),
			_bot = parseInt(_ob.css('paddingBottom')
				.replace(/px$/, ''), 10) + 1,
			_mar = parseInt(_ob.css('paddingLeft')
				.replace(/px$/, ''), 10),
			_off = navigator.userAgent.match(/MSIE/) ? _mar : 0;

		if (_first) {
			_ob
			.css({
				whiteSpace: 'nowrap',
				cursor: 'pointer',
				marginLeft: _o.spacer
			})
			.hover(
				function() {
					$(this).addClass('aqDropMenuButton')
						.css({backgroundColor: _fg, color: _bg});
				},
				function() {
					$(this).removeClass('aqDropMenuButton')
						.css({backgroundColor: _bg, color: _fg});
				}
			);

			_off = _off - _o.spacer;

			_menu.hover(
				function() { $(this).show(); },
				function() {
					$(this)
						.slideUp('fast')
						.removeAttr('checkd');
				}
			)
			.css({
				position: 'absolute',
				marginTop: _bot,
				padding: Math.abs(_mar / 2),
				backgroundColor: _fg,
				color: _bg
			});


			_ob.click(function() {
				var _cur = _menu.attr('checkd');

				_ob.parent().find('[checkd=1]')
					.removeAttr('checkd').fadeOut('fast');

				if (!_cur) {
					_menu
					.slideDown('fast')
					.attr('checkd', 1)
					.css({
						minWidth: _ob.outerWidth(),
						top: _ob.position().top + _ob.outerHeight() - _bot,
						left: _left_margin(_ob) - _off
					});
				}
			});
		} else {
			_menu.find('A').remove();
		}

		for (_i = 0; _i < $arry.length; _i++) {
			_menu.append('<a href="' + $arry[_i][1] + '">' +
				$arry[_i][0] + '<\/a>');

			if ($arry[_i][2] === '-') {
				_menu.find('A:last')
					.css('borderTop', '1px solid ' + _bg);
			} else if ($arry[_i][2] === '*') {
				_menu.find('A:last').css('fontWeight', 'bold');
			}
		}

		_menu.find('A').hover(
			function() {
				$(this).css({ backgroundColor: _bg, color: _fg });
			},
			function() {
				$(this).css({ backgroundColor: _fg, color: _bg });
			}
		)
		.css({
			lineHeight: _o.lineHeight,
			textDecoration: 'none',
			backgroundColor: _fg,
			color: _bg,
			padding: Math.abs(_mar),
			display: 'block'
		});

		if ($.isFunction(_o.cb)) {
			_menu.find('A').click(function() {
				_menu.fadeOut();
				_o.cb($(this).attr('href'), $(this).html());
				return false;
			});
		}

		return true;
	});
};
})(jQuery);
