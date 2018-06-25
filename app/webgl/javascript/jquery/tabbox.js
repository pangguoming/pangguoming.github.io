$(function(){           
	
	var navBox = $('.tabTagBox'),
	 navList = $('.tabTagList'),
	 navs = navList.children('li'),
	 upBtn = $('.uPrev'), 
	 downBtn = $('.dNext'),
	 contentBoxs = $('.tabcon');
	
	var opts = {
		moveH: 58,
		moveSpeed: 200,
		curMoveH: 0,
		curSumH: 0,
		curNavIndex: 0
	}
	
	opts.curSumH = (opts.moveH * navs.size()) - navBox.height();
	
	var navToContentBox = function () {
		navs.removeClass('current');
		contentBoxs.hide().eq(opts.curNavIndex).show();
	}
	
	var navMove = function () {
		var _arg = arguments.length > 0 ? arguments[0] : '';
		if (_arg === 'up') {
			if (-opts.curSumH === opts.curMoveH) {
				//alert('none');
				return;
			}
			opts.curMoveH -= opts.moveH;
			opts.curNavIndex += 1;
		}		
		if (_arg === 'down') {
			if (opts.curMoveH === 0) {
				//alert('none');
				return;
			}
			opts.curMoveH += opts.moveH;
			opts.curNavIndex -= 1;
		}
		
		navToContentBox();
		navs.eq(opts.curNavIndex).addClass('current');
		navList.animate({ top: opts.curMoveH + 'px' }, opts.moveSpeed);
	}
	
	upBtn.click(function () {
		navMove('down');
	});
	
	downBtn.click(function () {
		navMove('up');
	});
	
	navs.click(function () {
		opts.curNavIndex = $(this).index();
		navToContentBox();
		$(this).addClass('current');
	});
});