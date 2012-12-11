    //John Williams
    //Dec,06, 2012
    //ASD WK 3
    //Cast My Vote



// Wait until the DOM is ready.
$('#myorder').on('pageinit', function () {
	console.log("Home Page loaded.");

	//Variable defaults
	var candidateSelection = ["--Choose your Candidate--", "Barack Obama", "Mitt Romney", "Ron Paul", "James McCall", "Gary Johnson"];
		var sexValue;
		var termsValue = "No";
		var errMsg = $('#errors');		
		var id;
	
	//Create select field element and populate with options.
	function makeCats() {
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('select'),
			makeSelect = $('<select></select>');
			makeSelect.attr("id", "groups");
		for (var i=0, j=candidateSelection.length; i<j; i++){
			var makeOption = $('<option></option>');
			var optText = candidateSelection[i];
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
	
	 function getData() {
      console.log("testing");
     $('#contact1').empty();
        $.ajax({
            url: "_view/contacts",
            type: "GET",
            dataType: "json",
            success: function(result) {
             console.log(result);
             
             $.each(result.rows, function(index, contact){
            
                 $(''+
					'<li>'+
						'<p>'+"Name: "+ contact.value.fname + '<br />' + '</p>'+
						'<p>'+"Email: "+ contact.value.email + '<br />' + '</p>'+
						'<p>'+"Website: "+ contact.value.url + '<br />' + '</p>'+
						'<p>'+"Gender: "+ contact.value.sex + '<br />' + '</p>'+
						'<p>'+"Candidate Selection: "+ contact.value.groups + '<br />' + '</p>'+
						'<p>'+"Date of Birth: "+ contact.value.borndate + '<br />' + '</p>'+
						'<p>'+"Number of persons in household: "+ contact.value.quantity + '<br />' + '</p>'+
						'<p >'+"Additional Info: "+ contact.value.comments+ '<br />' + '</p>'+
						'<p>'+"Agree to terms: "+ contact.value.terms + '<br />' + '</p>'+
					'</li>'
                
                 ).appendTo("#contact1");
                
                });
                $('#contact1').listview('refresh');
            },	
             error: function(data) {}
      });
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
		alert("Vote Nulled!");	
	}
/*	
	function getData(){
		//toggleControls("on");
		if(localStorage.length === 0){
			//autoFillData();
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
*/	
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

	//function autoFillData(){
		//Store the JSON OBJECT in local storage
		//for(var n in json){
			//var id 			= Math.floor(Math.random()*100000001);
			//localStorage.setItem(id, JSON.stringify(json[n]));
		//}
	//}
	
	//DELETE FUNCTION
	function deleteItem(){
		var ask = confirm("Are you sure you wish to delete this order?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Vote was deleted!!!");
			window.location.reload();
		}else{
			alert("Vote was NOT deleted.");
		}
	}
	
	//CLEAR FUNCTION
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("Vote Submission is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	
	var validate = function(){
		console.log('test Validate function here');
		var myForm = $('#myorder');
			myerrorslink = $('#myerrorslink');
	
	myForm.validate({
		invalidHandler: function(form, validator){
			myerrorslink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldName +'</li>';
			}
			$('#ordererrors ul').html(html);		
		},

		
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

//$(document).on("pageshow", "#details", function() {
//Display details for a specific item (see video wk4 gotoTraining Time=30:41)
//});