// JavaScript Document


$(document).ready(function(){

	console.log('V 1.1.6');

	$('.close-nav, .sidebar-close').click(function(){
		snapper.close();
		$('body').css('position','inherit');
	});

	var snapper = new Snap({
	  element: document.getElementById('content'),
      disable:'none'
	});

	$('.deploy-sidebar').click(function(){
		//$(this).toggleClass('remove-sidebar');
		if( snapper.state().state=="left" ){
			snapper.close();

		} else {
			snapper.open('left');
		}
		return false;
	});

    snapper.on('close', function(){
        $("body").removeClass();
    });

	$.ajax({
	        async: false,
	        type: "GET",
	        url: "http://www.titlurile-zilei.ro/getWeatherJSON",
	        dataType: "JSON",
	        success: function (e) {
	            $(".temperature").append(Math.floor(e.main.temp)+'º');
	            $(".sidebar-logo").attr('src','http://openweathermap.org/img/w/' + e.weather[0].icon + '.png');
	        }
	    });

	    $.ajax({
	        async: false,
	        type: "GET",
	        url: "http://www.titlurile-zilei.ro/appDate",
	        dataType: "HTML",
	        success: function (e) {
	            $(".data").append(e)
	        }
	    });


	    var classSun = 'favIt';
		var favTxt = 'Favorite +';

	    if (typeof window.localStorage.getItem("covers") != "undefined" && window.localStorage.getItem("covers") !== null) {

	        var e = JSON.parse(window.localStorage.getItem("covers"));
	        $.ajax({
	            async: false,
	            type: "GET",
	            url: "http://www.titlurile-zilei.ro/appCategory",
	            dataType: "JSON",
	            success: function (e) {
	                for (var t in e) {
	                    //$("#menu ul").append('<li><a href="index.html#page' + e[t].id + "\"  onclick=\"$.sidr('close', 'menu');\"></a></li>")
						$('.cats').append('<a onclick="$(\'.content\').css(\'display\',\'none\');$(\'#page'+ e[t].id +'\').fadeIn();$(\'.deploy-sidebar\').trigger(\'click\');">' + e[t].category + '<em class="unselected-sub-nav"></em></a>');
	                }
	            }
	        });

	        var switcher = 0;
	        var theCat = null;
	        var s = 0;
	        var i = JSON.parse(localStorage.getItem("favJSON"));
	        var AddClass = '';

	        for (var t in e) {

	            if (i !== null) {


		            s = 0;

		            for (var o in i) {
		                if (i[o].id === e[t].hook) {
		                    s = s + 1;
		                }
		            }

		            if (s === 0) {
		            	classSun = 'favIt';
		            	favTxt = 'Favorite +';
		            }else{
		            	classSun = 'sun_Active';
		            	favTxt = 'Added';
		            }

	            }else{
		            classSun = 'favIt';
		            favTxt = 'Favorite +';
	            }

	            if(theCat!=e[t].id){ switcher = 0; }

	            if(switcher%2){
                    AddClass = 'last-column';
                }else { AddClass = ''; }

	             $(".cat" + e[t].id).append('<div class="portfolio-item-thumb one-half '+AddClass+'"> \
	             	<p style="margin:10px 0 0 0;" > \
                        <input type="button" value="'+favTxt+'" class="sun_BTN '+classSun+'" data-id="' + e[t].hook + '" data-cover="' + e[t].cover + '"  data-name="' + e[t].name + '"> \
                    </p> \
                    <a href="http://www.titlurile-zilei.com/assets/upload/mobile/' + e[t].cover + '" class="swipebox" rel="gal' + e[t].id + '"> \
                        <img class="responsive-image" src="http://www.titlurile-zilei.com/assets/upload/mobile/' + e[t].cover + '" onError="this.onerror=null;this.src=\'images/noImg.png\';" alt="img"> \
                    </a> \
                    <h4>'+ e[t].name + '</h4> \
                </div>');

                theCat =  e[t].id;
                switcher = switcher + 1;

	        }

	    } else {

	        $.ajax({
	            async: false,
	            type: "GET",
	            url: "http://www.titlurile-zilei.ro/appCategory",
	            dataType: "JSON",
	            success: function (e) {
	                var t = 1;
	                var n = new Array();
	                var r = new Array();
	                for (var i in e) {
	                   	$('.cats').append('<a onclick="$(\'.content\').css(\'display\',\'none\');$(\'#page'+ e[i].id +'\').fadeIn();$(\'.deploy-sidebar\').trigger(\'click\');">' + e[i].category + '<em class="unselected-sub-nav"></em></a>');

                        $.ajax({
	                        async: false,
	                        type: "GET",
	                        url: "http://www.titlurile-zilei.ro/appArchive?cat=" + e[i].id,
	                        dataType: "JSON",
	                        success: function (s) {
	                        	var switcher = 0;
	                            for (var o in s) {

                                    console.log(s);
	                                if(switcher%2){
		                                var AddClass = 'last-column';
	                                }else { AddClass = '' ; }



	                                $(".cat" + e[i].id).append('<div class="portfolio-item-thumb one-half '+AddClass+'"> \
	                                								<p style="margin:10px 0 0 0;"> \
													                    <input type="button" value="Favorite +" class="sun_BTN favIt" data-id="' + s[o].hook + '" data-cover="' + s[o].cover + '"  data-name="' + s[o].name + '"> \
													                </p> \
												                    <a href="http://www.titlurile-zilei.com/assets/upload/mobile/' + s[o].cover + '" class="swipebox" rel="gal' + e[i].id + '"> \
												                        <img class="responsive-image" src="http://www.titlurile-zilei.com/assets/upload/mobile/' + s[o].cover + '" alt="img" onError="this.onerror=null;this.src=\'images/noImg.png\';"> \
												                    </a> \
												                    <h4>'+ s[o].name + '</h4> \
												                </div>');
	                                r = [{
	                                    id: e[i].id,
	                                    hook: s[o].hook,
	                                    cover: s[o].cover,
	                                    name: s[o].name
	                                }];
	                                n = $.merge(n, r);
	                                switcher = switcher + 1;
	                            }
	                            switcher = 0;
	                            t = t + 1;
	                        }
	                    });
	                }
	               window.localStorage.setItem("covers", JSON.stringify(n));
	               var s = localStorage.getItem("covers");
	            }
	        });
	    }
    $(".favIt").click(function () {
        var e = $(this).attr("data-id");
        var t = $(this).attr("data-cover");
        var nm = $(this).attr("data-name");

        if (localStorage.getItem("favJSON") === null) {
            var n = [{
                id: e,
                cover: t,
                name: nm
            }];

            $('.fixed-header').append('<a class="deploy-contact"></a>');

            $(".favList > li").remove();

            $(".favList").append('<li class="remove0"> \
                                    <div class="deleteFav" data-id="0" style="width:100%; height: 30px; background:#333333; text-align: center;"><img src="images/trash.png" width="16px" style="margin: 0 auto;margin-top: 7px;"></div>\
				                    <a href="http://www.titlurile-zilei.com/assets/upload/mobile/' + t + '" class="swipebox" rel="favorites"> \
				                        <img class="responsive-image" src="http://www.titlurile-zilei.com/assets/upload/mobile/' + t + '" alt="img"> \
				                    </a> \
				                    <em class="center-text data" style="padding-bottom: 10px; display:block; font-style: normal; color:white;">'+ nm +'</em>    \
				                     <div class="sidebar-decoration" style="width: 100%;margin-bottom: 10px;"></div>\
				                </li>');

            $('.deploy-contact').click(function(){
                //$(this).toggleClass('remove-sidebar');
                if( snapper.state().state=="right" ){
                    snapper.close();

                } else {
                    snapper.open('right');
                }
                return false;
            });

            $(".swipebox").swipebox({
                useCSS : true, // false will force the use of jQuery for animations
                hideBarsDelay : 3000 // 0 to always show caption and action bar
            });

            window.localStorage.setItem("favJSON", JSON.stringify(n));

            $('.deleteFav').click(function(){

                var obj = $(this).attr('data-id');
                var arr = JSON.parse(localStorage.getItem("favJSON"));

                var toDelete = arr.indexOf(obj);

                $('.remove'+obj).fadeOut();

                arr.splice(toDelete, 1);

                if(arr.length > 0){
                    window.localStorage.setItem("favJSON", JSON.stringify(arr));
                }else {
                    window.localStorage.removeItem("favJSON");
                }

            });

            var r = window.localStorage.getItem("favJSON");

            $(this).val('Added');

            $(this).addClass('sun_Active');

        } else {

            var n = [{
                id: e,
                cover: t,
                name: nm
            }];

            var i = JSON.parse(localStorage.getItem("favJSON"));
            var s = 0;
            for (var o in i) {
                if (i[o].id === e) {
                    s = s + 1;
                }
            }

            var theLength = i.length;

            if($(".catFav > div").length % 2){
                AddClass = 'last-column';
            }else { AddClass = ''; }

            if (s === 0) {
                var u = $.merge(i, n);
                window.localStorage.setItem("favJSON", JSON.stringify(u));
                var r = localStorage.getItem("favJSON");

                $(".favList").append('<li class="remove'+theLength+'"> \
                                    <div class="deleteFav" data-id="'+theLength+'" style="width:100%; height: 30px; background:#333333; text-align: center;"><img src="images/trash.png" width="16px" style="margin: 0 auto;margin-top: 7px;"></div>\
				                    <a href="http://www.titlurile-zilei.com/assets/upload/mobile/' + t + '" class="swipebox" rel="favorites"> \
				                        <img class="responsive-image" src="http://www.titlurile-zilei.com/assets/upload/mobile/' + t + '" alt="img"> \
				                    </a> \
				                    <em class="center-text data" style="padding-bottom: 10px; display:block; font-style: normal; color:white;">'+ nm +'</em>    \
				                     <div class="sidebar-decoration" style="width: 100%;margin-bottom: 10px;"></div>\
				                </li>')

                $('.deleteFav').click(function(){

                    var obj = $(this).attr('data-id');
                    var arr = JSON.parse(localStorage.getItem("favJSON"));

                    var toDelete = arr.indexOf(obj);

                    $('.remove'+obj).fadeOut();

                    arr.splice(toDelete, 1);

                    if(arr.length > 0){
                        window.localStorage.setItem("favJSON", JSON.stringify(arr));
                    }else {
                        window.localStorage.removeItem("favJSON");
                    }

                });

                $(".swipebox").swipebox({
                    useCSS : true, // false will force the use of jQuery for animations
                    hideBarsDelay : 3000 // 0 to always show caption and action bar
                });

                $(this).val('Added');
                $(this).addClass('sun_Active');
            }

        }
    });


    if (localStorage.getItem("favJSON") !== null) {
        $('.fixed-header').append('<a class="deploy-contact"></a>');
        var n = JSON.parse(localStorage.getItem("favJSON"));
        var switcher = 0;
        console.log(n);
        for (var t in n) {


            $(".favList").append('<li class="remove'+switcher+'"> \
                                    <div class="deleteFav" data-id="'+t+'" style="width:100%; height: 30px; background:#333333; text-align: center;"><img src="images/trash.png" width="16px" style="margin: 0 auto;margin-top: 7px;"></div>\
				                    <a href="http://www.titlurile-zilei.com/assets/upload/' + n[t].cover + '" class="swipebox" rel="favorites"> \
				                        <img class="responsive-image" src="http://www.titlurile-zilei.com/assets/upload/mobile/' + n[t].cover + '" alt="img"> \
				                    </a> \
				                    <em class="center-text data" style="padding-bottom: 10px; display:block; font-style: normal;color:white;">'+n[t].name +'</em>    \
				                     <div class="sidebar-decoration" style="width: 100%;margin-bottom: 10px;"></div>\
				                </li>');
            switcher = switcher + 1;

        }
    }else{
        $(".favList").append('<li><em class="center-text data">At the moment you haven´t add any favorite. To do so click in this button before the wished cover:</em><br><br>' +
            '<input type="button" value="Favorite +" class="sun_BTN">' +
            '</li>');
    }

    $('.deploy-contact').click(function(){
        //$(this).toggleClass('remove-sidebar');
        if( snapper.state().state=="right" ){
            snapper.close();

        } else {
            snapper.open('right');
        }
        return false;
    });

    $(".swipebox").swipebox({
        useCSS : true, // false will force the use of jQuery for animations
        useSVG : true, // false to force the use of png for buttons
        hideBarsOnMobile : false, // false will show the caption and navbar on mobile devices
        hideBarsDelay : 3000, // delay before hiding bars
        videoMaxWidth : 1140, // videos max width
        beforeOpen: function() {}, // called before opening
        afterClose: function() {} // called after closing
    });

    $('.deleteFav').click(function(){

        var obj = $(this).attr('data-id');
        var arr = JSON.parse(localStorage.getItem("favJSON"));

        var toDelete = arr.indexOf(obj);

        $('.remove'+obj).fadeOut();

        arr.splice(toDelete, 1);

        if(arr.length > 0){
            window.localStorage.setItem("favJSON", JSON.stringify(arr));
        }else {
            window.localStorage.removeItem("favJSON");
        }

    });


    FastClick.attach(document.body);

});


