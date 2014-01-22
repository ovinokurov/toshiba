$(function(){

    var $container = $('#container');


	var eLitJson = "jSon/elitInhance.json";
	//$('i').append(eLitJson);

	var classColor="blue";
	
	$.getJSON(eLitJson, function(jd) {
		$.each(jd, function( index, eLit ) {
			$.each( eLit, function( i, val ) {
				$('#container').append('<div class=\"clickDiv ' +val.Category+ ' text-box" id=\"div-'+i+'\"><div id='+i+' class=\"divChk\"><p><input class="chkBox" type="checkbox" value=\"'+i+'\"></p></div><div class=\"divText\"><p>'+ val.Description + '</p><p>'+val.Item+'</p><div class=\"icon_box\"><img class=\"bet_time\" src=\"images\\icon_'+val.Category+'.png\"></div></div></div>');
			});			  
		});
		
		$container.isotope({});
		
		
		  var $optionSets = $('#options .option-set'),
			  $optionLinks = $optionSets.find('a');

		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			//alert($this.hasClass('selected'));
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  alert("key: " + key + " value: " + value);
			  alert('start');
			  $container.isotope( options );
			  alert('done');
			}
			
			return false;
		  });
		
		var checkClicked = false;
		$(':checkbox').click(function(e) {
			checkClicked = true;
			var chkBoxVal = $(this).val();
			if(this.checked){
				$(this).parent().parent().parent().addClass( "box");
				AdditemArray(chkBoxVal);
			}else{
				$(this).parent().parent().parent().removeClass("box");
				RemoveitemArray(chkBoxVal);
			}
			window.location.replace("#?selectedItems="+selectedItems);
		});


		$('a').click(function(e) {
			var value = $(this).attr('data-option-value');
			var image = $(this).children().attr('src');

			
			$("#general").attr("src","images/general.png");
			$("#hardware").attr("src","images/hardware.png");
			$("#software").attr("src","images/software.png");
			$("#general").attr("src","images/general.png");
			$("#wave").attr("src","images/wave.png");
			$("#partner").attr("src","images/partner.png");
			$("#mobile").attr("src","images/mobile.png");
			

			switch(value) {
				case ("*"):
					$(this).children().attr("src","images/general_dn.png");
				break;
				case (".Hardware"):
					$(this).children().attr("src","images/hardware_dn.png");
				break;
				case (".Software"):
					$(this).children().attr("src","images/software_dn.png");
				break;
				case (".General"):
					$(this).children().attr("src","images/general_dn.png");
				break;
				case (".Wave"):
					$(this).children().attr("src","images/wave_dn.png");
				break;
				case (".Partner"):
					$(this).children().attr("src","images/partner_dn.png");
				break;
				case (".Mobile"):
					$(this).children().attr("src","images/mobile_dn.png");
				break;
				
				
			}
			
			$container.isotope({});
			var options = {},
				key = 'filter',
				value = value;
				
				options[ key ] = value;
				$container.isotope( options );


		window.location.replace("#?selectedItems="+selectedItems);		
		});
		
		$('.clickDiv').click(function(e) {
			if(!checkClicked){
				var isChecked = $(this).children().children().first().children()[0].checked;
				var chkBoxVal = $(this).children().children().first().children().val();
				
				if(isChecked){
					$(this).children().children().first().children().attr('checked', false);
					$(this).removeClass("box");
					RemoveitemArray(chkBoxVal);
				}else{
					$(this).children().children().first().children().attr('checked', true);
					$(this).addClass( "box");
					AdditemArray(chkBoxVal);
				}
			}else{
				checkClicked=false;
			}
			
			window.location.replace("#?selectedItems="+selectedItems);
			
		});
	  });
	

	//userInfo
	
	$('#btnSend').click(function(e) {
		$('.userInfo').show();
		$('.grayout').show();
	});
	
	$('#btnDone').click(function(e) {
		var errorMSG = ""
		
		fname = $("#fName");
		fname_regex = /^[a-zA-Z]+$/
		if (!fname.val().match(fname_regex)) {
		   errorMSG = "Not valid first name"+"\n";
		   $(fname).addClass('redBorder');
		}else{
			$(fname).removeClass('redBorder');
		}
		
		lname = $("#lName");
		lname_regex = /^[a-zA-Z]+$/
		if (!lname.val().match(fname_regex)) {
		   errorMSG += "Not valid last name"+"\n";
		   $(lname).addClass('redBorder');
		}else{
			$(lname).removeClass('redBorder');
		}
		
		email_address = $('#email');
		email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

		if(!email_regex.test(email_address.val())){ 
			errorMSG +="Not valid email"+"\n"; 
			e.preventDefault(); 
			$(email_address).addClass('redBorder');  
		}else{
			$(email_address).removeClass('redBorder'); 
		}
		
		if (errorMSG.length>0){
			alert(errorMSG);
		}else{
			window.location.replace("#?selectedItems="+selectedItems+"&fname="+fname.val()+"&lname="+lname.val()+"&email="+email_address.val());
			$('.userInfo').hide();
			$('#idGrayout').addClass('expanded').addClass('expanded');
		}

	});
	
	$('#btnCancel').click(function(e) {
			$('.userInfo').hide();
			window.location.replace("#?cancel=true");
			$('#idGrayout').addClass('expanded').addClass('expanded');
	});
	
	
	var selectedItems = [];
	function AdditemArray(item)
	{
		var i = selectedItems.indexOf(item);
		if(i != -1) {
			selectedItems.splice(i, 1);
		}
		selectedItems.push(item);
	}
	
	function RemoveitemArray(item)
	{
		var i = selectedItems.indexOf(item);
		if(i != -1) {
			selectedItems.splice(i, 1);
		}
	}
 });