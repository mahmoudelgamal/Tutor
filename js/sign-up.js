
//start multi stepper

// jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({
		opacity: 0
	}, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')',
				'position': 'absolute'
			});
			next_fs.css({
				'left': left,
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({
		opacity: 0
	}, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'left': left
			});
			previous_fs.css({
				'transform': 'scale(' + scale + ')',
				'opacity': opacity
			});
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function () {
	return false;
})


//start choose file customize
$('input[type="file"]').wrap('<div class="custom-input-file"></div>');
$('.custom-input-file').prepend('<span>Upload your file here</span>');
$('.custom-input-file').append('<i class="fas fa-upload"></i>')
$('input[type="file"]').change(function(){
	$(this).prev('span').text($(this).val());
})
// start validiation
 



//start dynamic add skill

			
$("#addSkill").click(function () {
	$(this).after('<div class="add-input-skill"><div class="row"><div class="col-6"><div class="form-group"><input type="text" placeholder="type skill you want" class="form-control i-add-skill" id="cSkill"></div></div><div class="col-6"><div class="btn-add addCustom" id="addCustom" style ="    width: 52px;cursor:pointer">Add<i class="fas fa-plus"></i></div></div></div></div>');
//	var iSkill = $(".add-skill").html();
//	$(this).before(iSkill)
})
$(document).on('click', '.addCustom' ,function () {
    var inputValue = $(".i-add-skill").val();
	if(! inputValue.length == 0){
	$('<div class="c-box"><div class="custom-control custom-checkbox mb-3 form-group m-custom" style="position: relative;bottom: 5px;dispaly:inline"><input type="checkbox" class="custom-control-input form-control " checked id="customCheck55" name=""><label class="custom-control-label  c-label" for="customCheck55">' + inputValue +'</label></div></div>').appendTo(".check-skill");
		}
	$('.add-input-skill').hide();
})

//
/// headline validiation
$("#validate").click(function(){
    var inputStr = $("#head").val();
    if(inputStr.length<120)
        $("#error_msg").html("Enter at least 120 chars in the input box");
    else
		$("#error_msg").hide();
        $(".form_elem").submit();      
});
$("#head").keyup(function(){
	var inputStr = $(this).val().length;
	var minChars = 120;
	var remChars = minChars - inputStr;
	$('.rem-message').html('<span style="position: relative;bottom: 33px;left: 40%;font-size: 14px;color: #e20b0b;">'+ remChars + " " + 'chars remain </span> ');
	if(inputStr >= minChars){
		$('.rem-message').hide();
		$("#error_msg").hide();
	}
});

///text area validiation
$("#validate").click(function(){
    var inputStr = $("#textarea").val();
    if(inputStr.length<500)
        $("#error_text").html("Enter at least 500 chars in the input box");
    else
		$("#error_text").hide();
        $(".form_elem").submit();      
})
$("#textarea").keyup(function(){
	var inputStr = $(this).val().length;
	var minChars = 500;
	var remChars = minChars - inputStr;
	$('.rem-text-message').html('<span style="position: relative;bottom: 41px;left: 39%;font-size: 14px;color: #e20b0b;">'+ remChars + " " + 'chars remain </span> ');
	if(inputStr >= minChars){
		$('.rem-text-message').hide();
		$("#error_text").hide();
	}
});

//valdiate
		var valide = $.validator.setDefaults({
			submitHandler: function() {
				$("#next").addClass("next");
				console.log("5444");
				alert("ljnjk")
			}
		});
document.getElementById("next").addEventListener("click", valide);
		$("#msform").validate({
			rules: {
				username: {
					required: true,
				},
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 5
				},
				confirm_password: {
					required: true,
					minlength: 5,
					equalTo: "#password"
				}

			},
			messages: {
				username: {
					required: "please enter you user name",
				},
				email: {
					required: "please enter your email",
					email: "please enter valid mail"
				},
				password: {
					required: "please provide password",
					minlength: "must be at least 5 chars long"
				},
				confirm_password: {
					required: "please provide password",
					minlength: "must be at least 5 chars long",
					equalTo: "please enter the same password above"
				}
			}


		});


