
        
        var openspeed = 300;
		var closespeed = 300;
        $(function () {
            // Stack initialize
            $('.stack>img').click(function () {
				
                if ($(this).hasClass('closed')) {
                    var vertical = 0;
                    var horizontal = 0;
                    var $el = $(this);
                    $el.next().children().each(function () {
                        $(this).animate({ top: '-' + vertical + 'px', left: horizontal + 'px' }, openspeed);
                        vertical = vertical + 55;
                        horizontal = (horizontal + .75) * 2;
                    });
                    $el.next().animate({ top: '0px', left: '0px' }, openspeed).addClass('openStack').find('li a>img').animate({ width: '50px', marginLeft: '9px' }, openspeed);
                    $(this).removeClass('closed');
                } else {
					
                    $(this).next().removeClass('openStack').children('li').animate({ top: '0px', left: '0px' }, closespeed);
                    $(this).next().find('li a>img').animate({ width: '79px', marginLeft: '0' }, closespeed);
                    $(this).addClass('closed');
                }
            }
	    );

            $("#sofabox").click(function () {
                $('.stack>img').next().removeClass('openStack').children('li').animate({ top: '0px', left: '0px' }, closespeed);
                $('.stack>img').next().find('li a>img').animate({ width: '79px', marginLeft: '0' }, closespeed);
                $(this).parent().prev().click();
                $(".objectbox").css({
                    left: ($("body").width() - $(".objectbox").width()) / 2 + "px",
                    top: ($(window).height() - $(".objectbox").height()) / 2 - 80 + "px",
                    display: "block"
                });
            });

            $(".objectboxclose").click(function () {
                $(".objectbox ").css("display", "none");
            });
			
			
			// Right control bar 
			$("#objconmov").click(function () {
				ThreeDEnvironment.objcontrol(77);
            });
			$("#objconzoo").click(function () {
				 ThreeDEnvironment.objcontrol(90);
            });
			$("#objconrota").click(function () {
				 ThreeDEnvironment.objcontrol(69);
            });
			$("#objconcop").click(function () {
				 ThreeDEnvironment.objcontrol(86);
            });
			$("#objcondel").click(function () {
				 ThreeDEnvironment.objcontrol(46);
            });
        });

        function closeobjbox() {
            $(".objectbox ").css("display", "none");
        }
