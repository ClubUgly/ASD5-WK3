    //John Williams
    //Oct 25, 2012
    //ASD WK 4
    //Cast My Vote


//JSON DATA
$(function(){
	$('#myxhr').empty();
	$.ajax({
		url:	'xhr/data.json',
		type: 'GET',
		dataType:	'json',
		success: function(response){
			for(var i=0, j=response.contact1.length; i<j; i++){
				var cont = response.contact1[i];
				$(''+
					'<div class="contact">'+
						'<p>'+ 'Name: ' + cont.fname +'</p>'+
						'<p>'+ 'Email: ' + cont.email +'</p>'+
						'<p>'+ 'Website: ' + cont.url +'</p>'+
						'<p>'+ 'Gender: ' + cont.sex +'</p>'+
						'<p>'+ 'Candidate Selection: ' + cont.groups +'</p>'+
						'<p>'+ 'Date of Birth: ' + cont.borndate +'</p>'+
						'<p>'+ 'Number of persons in household: ' + cont.quantity +'</p>'+
						'<p>'+ 'Additional Info: ' + cont.comments +'</p>'+
						'<p>'+ 'Agree to terms: ' + cont.terms +'</p>'+'<hr />'+
					'</div>'
				).appendTo('#myxhr');
				console.log(response);
			};
		}
	});

});

//XML DATA
$(function(){
	$('#myxhr2').empty();	
	$.ajax({
		url:	'xhr/data.xml',
		type: 'GET',
		dataType:	'xml',
		success: function(xml){			
				$(xml).find("item").each(function(){
    				var fname = $(this).find('fname').text();
    				var email = $(this).find('email').text();
    				var url = $(this).find('url').text();
    				var sex = $(this).find('sex').text();
    				var groups = $(this).find('groups').text();
    				var borndate = $(this).find('borndate').text();
    				var quantity = $(this).find('quantity').text();
    				var comments = $(this).find('comments').text();
    				var terms = $(this).find('terms').text();
    				
    			 $(''+
						'<div class="contact">'+
							'<p>'+ 'Name: ' + fname +'</p>'+
							'<p>'+ 'Email: '+ email +'</p>'+
							'<p>'+ 'Website: '+ url +'</p>'+
							'<p>'+ 'Gender: ' + sex +'</p>'+
							'<p>'+ 'Candidate Selection: ' + groups +'</p>'+
							'<p>'+ 'Date of Birth: ' + borndate +'</p>'+
							'<p>'+ 'Number of persons in household: ' + quantity +'</p>'+
							'<p>'+ 'Additional Info: ' + comments +'</p>'+
							'<p>'+ 'Agree to terms: ' + terms +'</p>'+
						'</div><hr />'		
				).appendTo('#myxhr2');
				console.log(xml);
				
			
				});
			}
	});

});

//CSV DATA
$(function(){
	$('#myxhr3').empty();
	$.ajax({
		url:	'xhr/data.csv',
		type: 'GET',
		dataType:	'text',
        success: function(data) {       
         		var allTextLines = data.split(/\r\n|\n/);
     			var headers = allTextLines[0].split(',');
     			var lines = [];


					for (var i=1; i<allTextLines.length; i++) {
						var data = allTextLines[i].split(',');
						if (data.length == headers.length) {
							var votes = [];
							
							for (var j=0; j<headers.length; j++) {
									votes.push(data[j]); //puts each voter into the array.
							}
							lines.push(votes); // puts the voter array into the main array.
						}

					}
					for (var v=0; v<lines.length; v++){
							var avote = lines[v];
					$(''+
								'<div class="contact">'+
								'<p>'+ 'Name: ' + avote[0] +'</p>'+
								'<p>'+ 'Email: ' + avote[1] +'</p>'+
								'<p>'+ 'Website: ' + avote[2] +'</p>'+
								'<p>'+ 'Gender: ' + avote[3] +'</p>'+
								'<p>'+ 'Candidate Selection: ' + avote[4] +'</p>'+
								'<p>'+ 'Date of Birth: ' + avote[5] +'</p>'+
								'<p>'+ 'Number of persons in household: ' + avote[6] +'</p>'+
								'<p>'+ 'Additional Info: ' + avote[7] +'</p>'+
								'<p>'+ 'Agree to terms: ' + avote[8] +'</p>'+
								'</div><hr />'
							).appendTo('#myxhr3');
					console.log(lines);	
					}						
							
			}
		});

});


// Wait until the DOM is ready.
$('#myorder').on('pageinit', function () {
	console.log("Home Page loaded.");

	//Variable defaults
	var CandidateSelection = ["--Choose your Candidate--", "Barack Obama", "Mitt Romney", "Ron Paul", "James McCall", "Gary Johnson"],
		sexValue,
		termsValue = "No",
		errMsg = $('#errors');
		
		var id;
	
	//Create select field element and populate with options.
	function makeCats() {
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('select'),
			makeSelect = $('<select></select>');
			makeSelect.attr("id", "groups");
		for (var i=0, j=CandidateSelection.length; i<j; i++){
			var makeOption = $('<option></option>');
			var optText = CandidateSelection[i];
			makeOption.attr("value", optText);
			makeOption.html = optText;
			makeSelect.append(makeOption);
		}
		//selectLi.appendChild(makeSelect);
	}
	
	//find value of selected radio buttons.
	function getSelectedRadio(){
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				sexValue = radios[i].value;
			}
		}
	}
	
	function getCheckboxValue(){
		if($('terms').checked){
			termsValue = $('terms').value;
		}else{
			termsValue = "No";
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$('#myorder').addClass("none");
				$('#clear').addClass("inline");
				$('#displayLink').addClass("none");
				$('#addNew').addClass("inline");
				break;
			case "off":
				$('#myorder').addClass("block");
				$('#clear').addClass("inline");
				$('#displayLink').addClass("inline");
				$('#addNew').addClass("none");
				$('#items').addClass("none");				
				break;
			default:
				return false;		
		}
	}
	
	function storeData(key){
		//if there is no key, this means this is a brand new item and we need a new key
		console.log('storeData');
		//if(!key){
			var id = Math.floor(Math.random()*100000001);		
		//}else{
			//set the id to the existing key were editing so that it will save over the data
			//the key is the same key thats been passed along from the editSubmit even handle
			//to the validate function, and then passed here into the storeData function.
		//	id = key;
		//}
		// collect all form field values and store in an object
		// object properties contain array with the form label and input value
		getSelectedRadio();
		getCheckboxValue();
		var item 			= {};
			item.fname		= ["Name:", $('#fname').val()];
			item.email		= ["Email:", $('#email').val()];
			item.url 		= ["Home Page:", $('#url').val()];
			item.sex		= ["Sex:", sexValue];			
			item.borndate 	= ["Date of Birth:", $('#borndate').val()];
			item.groups	 	= ["Flower Type:", $('#groups').val()];
			item.quantity	= ["Quantity:", $('#quantity').val()];
			item.comments 	= ["Additional Info:", $('#comments').val()];
			item.terms 		= ["TOS:", $('#terms').val()];
			//save data into local storage: Use Stringify to convert our object to string
		localStorage.setItem(id, JSON.stringify(item));
		alert("Shopping Info Saved!");	
	}
	
	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			autoFillData();
			alert("There is no data in Local Storage so default data was added.");
		}
		//write data from local storage to the browser
		var makeDiv = $('<div></div>');
		makeDiv.attr("id", "items");
		var makeList = $('<ul></ul>');
		makeDiv.append(makeList);
		$('#showdata').append(makeDiv);
		$('#items').addClass = ("block");
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = $('<li></li>');
			var linksLi = $('<li></li>');
			makeList.append(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object by usig JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = $('<ul></ul>');
			makeli.append(makeSubList);
			getImage(obj.group[1], makeSubList);
			for(var n in obj){
				var makeSubli = $('<li></li>');
				makeSubList.append(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.html = optSubText;
				makeSubList.append(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); // Create our edit and delete buttons/links for each item in local storage.
		}
	}
	
	//get the image for the right category being displayed
	function getImage(catName, makeSubList){
		var imageLi = $('<li></li>');
		makeSubList.append(imageLi);
		var newImg = $('<img />');
		var setSrc = newImg.attr("src", "images/candidates/"+ catName + ".png");
		imageLi.append(newImg);
	}
	
	// make item links
	//create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit signle item link
		var editLink = $('<a></a>');
		editLink.href = "#";
		editLink.key = key;
		var editText = $("Edit Order");
		editLink.on("click", editItem);
		editLink.html = editText;
		linksLi.append(editLink);
		
		//add a line break
		var breakTag = $('<br />');
		linksLi.append(breakTag);
		
		//add delete single item link
		var deleteLink = $('<a></a>');
		deleteLink.href = "href", "#";
		deleteLink.key = key;
		var deleteText = $("Delete Order");
		deleteLink.on("click", deleteItem);
		deleteLink.html = deleteText;
		linksLi.append(deleteLink);
	}
	
	function editItem(){
		//grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//show the form
		toggleControls("off");
		
		//populate the form fields with current localStorage values.
		$('#fname').val(item.fname[1]);
		$('#email').val(item.email[1]);
		$('#url').val(item.url[1]);
		var radios = document.forms[0].sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].val() == "Male" && item.sex[1] == "Male"){
				radios[i].attr("checked", "checked");
			}else if(radios[i].val() == "Female" && item.sex[1] == "Female"){
				radios[i].attr("checked", "checked");
			}
		}
		$('#borndate').val(item.borndate[1]);
		$('#groups').val(item.groups[1]);
		$('#quantity').val(item.quantity[1]);
		$('#comments').val(item.comments[1]);
		if(item.terms[1] == "Yes"){
			$('#terms').attr("checked", "checked");
		}
		
		//remove the initial listener from the input save order button
		save.removeEventListener("click", storeData);
		//change submit button value to edit button
		$('#submit').val("Edit Order");
		var editSubmit = $('#submit');
		//save the key value established in this function as a property of the edit submit event.
		//so we can use that value when we save the data we edited.
		editSubmit.on("click", validate);
		editSubmit.key = this.key;
	}

	function autoFillData(){
		//Store the JSON OBJECT in local storage
		for(var n in json){
			var id 			= Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//DELETE FUNCTION
	function deleteItem(){
		var ask = confirm("Are you sure you wish to delete this order?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Order was deleted!!!");
			window.location.reload();
		}else{
			alert("Order was NOT deleted.");
		}
	}
	
	//CLEAR FUNCTION
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("Shopping order is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	
	var validate = function(){
		console.log('test')
		var myForm = $('#myorder');
	//		myerrorslink = $('#myerrorslink');
	
	myForm.validate({
		invalidHandler: function(form, validator){},
			//myerrorslink.click();
		//	var html = '';
		//	for(var key in validator.submitted){
		//		var label = $('label[for^="'+ key +'"]').not('[generated]');
		//		var legend = label.closest('fieldset').find('.ui-controlgroup-label');
		//		var fieldName = legend.length ? legend.text() : label.text();
		//		html += '<li>' + fieldName +'</li>';
		//	};
		//	$('#ordererrors ul').html(html);
		
		submitHandler: function(){
			var data = myForm.serializeArray();
			//parseMyOrder(data);
			storeData(data);
		}
	});
};

	makeCats();
	
	//Set Link & Submit Click Events
	var displayLink = $('#displayLink');
	displayLink.on("click", getData);
	var clearLink = $('#clear');
	clearLink.on("click", clearLocal);
	var save = $('#submit');
	save.on("click", validate);

});

var parseMyOrder = function(data){
	// uses form data here;
	console.log(data);

};

$(document).ready(function(){


});