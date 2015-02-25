$(document).ready(function(){

	// read the cookie and set the value.
	var cookie1 = readCookie("user1");
	if(cookie1){
		$("#text").find("p").css("color",cookie1);
	}

	var cookie2 = readCookie("user2");
	if(cookie2=="Hide Descriptions"){
		$("#text").find("p").hide();
	}
	if(cookie2=="Show Descriptions"){
		$("#text").find("p").show();
	}

	var cookie3 = readCookie("user3");
	if(cookie3){
		$("#text").find("p").css('font-size', cookie3 + "px");
	}

	var cookie4 = readCookie("user4");
	if(cookie4=="Pokemon, Return!"){
		$("#text").find("img").replaceWith("<img src = 'img/pokeball.jpg' class = 'pokedex-icon'/>");
	}
	if(cookie4=="Pokemon, Go!"){
		for(var i=0; i<9; i++){
			
			$("#text").find("#pokemon-"+i).find("img").replaceWith("<img src = 'img/pokemon-" + i +".jpg' class = 'pokedex-icon'/>");
		}
	}


	// Font color change
	$("#color").on('click', function(){

		// get the color value
		var color = $("input[type='radio']:checked", "#controlForm").val();

		// for each of the paragraphs in text
		$("#text").find("p").css("color",color);

	});


	// Text Display
	// use name selector for the input.
	var signal_display = 0;

	$("input[name='hideAll']").on('click', function(){
		
		// if click on hide button, hide text.
		$("#text").find("p").hide();
		signal_display = 1;
	});

	$("input[name='showAll']").on('click', function(){
		
		// if click on show button, show text.
		$("#text").find("p").show();
		signal_display = 2;
	});

	

	// Font size change
	$("#font").on('keyup', function(){

		//get the value when user input
		var value = $("input[name='font']").val();

		//message
		if(! $.isNumeric(value)){

			$("#sizeWarning").html("Font size must be number.");

		}else if(value<8 || value>80){

			// if font-size doesn't meet the requirement, show warning.
			$("#sizeWarning").html("Font size must be bigger than 8 and smaller than 80");

		}

		else{

			// if font-size meets requirement, change the font size and disable the warning.
			$("#text").find("p").css('font-size', value + "px");
			$("#sizeWarning").html("");

		}

	});	


	// Image Altering
	var signal_image = 0;

	$("input[name='pokemonReturn']").on('click', function(){

		signal_image=1;
		// replace the pokemon with pokeball.
		$("#text").find("img").replaceWith("<img src = 'img/pokeball.jpg' class = 'pokedex-icon'/>");

	});
	

	$("input[name='pokemonGo']").on('click', function(){

		signal_image=2;
		//find the image need to be replaced and replace it with pokemon-i.jpg.
		for(var i=0; i<9; i++){
			
			$("#text").find("#pokemon-"+i).find("img").replaceWith("<img src = 'img/pokemon-" + i +".jpg' class = 'pokedex-icon'/>");
		}

	});



	// search functionality
	$("#search").bind('keyup', function(){

		// for each of the paragraphs in main text
		$("#text").find("p").each(function(){
			//retrieve the current HTML
			var currentString = $(this).html();
			//console.log(currentString);

			//Remove existing highlights
			currentString = replaceAll(currentString, "<span class=\"matched\">","");
			currentString = replaceAll(currentString, "</span>","");

			// add in new highlights
			currentString = replaceAll(currentString, $("#search").val(), "<span class=\"matched\">$&</span>");

			// replace the current HTML with highlighted HTML
			$(this).html(currentString);
		});
	});


	// TODO: replace functionality
	$('#replace').on('click', function(){
		
		currentString = replaceAll(currentString, "<span class=\"matched\">","");
		currentString = replaceAll(currentString, "</span>","");
		
		// get the original text and new text.
		var old = $("input[id='original']").val();
		var replace = $.trim($("input[id='newtext']").val());

		// delete the html tags in the replace.
		var StrippedReplace = replace.replace(/(<([^>]+)>)/ig,"");
		
		// if old is empty, do nothing.
		if(!old==""){
			//replace
			$("#text").children().each(function(){
				//retrieve the current HTML
				var currentString = $(this).html();
				
				// call the function
				currentString = replaceAll(currentString, old, StrippedReplace);

				// replace the current HTML with highlighted HTML
				$(this).html(currentString);
			});
		}
		
	})
	// EXTRA CREDIT: form submission
	// hint: set values for both hidden fields, so that those values can be used later
	
	
	// EXTRA CREDIT: apply previous formatting settings
	// hint: readCookie might be useful
	// readCookie taken from http://www.quirksmode.org/js/cookies.html
	// readCookie returns value, or null if cookie has not been set
	$("input[name='savebutton']").on('click', function(){
		
		//font-color
		var color = $("input[type='radio']:checked", "#controlForm").val();
		createCookie("user1", color, 7);

		//text-display
		if (signal_display==1) {
			var hide = $("input[name='hideAll']").val();
			createCookie("user2", hide, 7);
		};

		if (signal_display==2) {
			var show = $("input[name='showAll']").val();
			createCookie("user2", show, 7);
		};

		//font-size
		var value = $("input[name='font']").val();
		createCookie("user3", value, 7);

		//image
		if (signal_image==1) {
			createCookie("user4", $("input[name='pokemonReturn']").val(), 7);
		};
		if (signal_image==2) {
			createCookie("user4", $("input[name='pokemonGo']").val(), 7);
		};

	});


	// create cookie
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	// read cookie
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	
});

/* Replaces all instances of "replace" with "with_this" in the string "txt"
   using regular expressions -- SEE BELOW */
function replaceAll(txt, replace, with_this) {
	return txt.replace(new RegExp(replace, 'g'),with_this);
}

// taken from Yahoo UI
function isNumber(o) {
    return typeof o === 'number' && isFinite(o);
}