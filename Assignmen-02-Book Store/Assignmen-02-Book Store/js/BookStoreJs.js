// Book Store 
// Assignment-02 in javaScript 
// Start time : 13  july 2016 2:42:09PM
// End time :

// All variables
var booksName  = [];//[ "javaScript" , "angular" , "html" , "css" , "jquery" , "python"];
var booksQuantity = [];
var booksPrice = [];
var booksSold = [ "angular" ,"css"];
var soldQuantity = [5, 5];
var findName = "";
// code demand at least three saler for discription see getbestBuyer
var salerName = ["Mr.Ali","Mr.Ahmed","Mr.Raza"];

var saler= '[{"name":"Mr.Ali","quantity" : "3"},{"name":"Mr.Ahmed","quantity" : "0"},{"name":"Mr.Raza","quantity" : "7"}]';
var json = JSON.parse(saler);
var result  = json;

saler

// get best buyer from json
function getBestBuyer() 
{

	var x = json.sort(function(a, b) {
    return parseFloat(a.quantity) - parseFloat(b.quantity);
	});

	//show record of best 3
	document.getElementById("bestsaler1").innerHTML = x[x.length-1].name +" sale  "+ x[x.length-1].quantity+"  Books";
	document.getElementById("bestsaler2").innerHTML = x[x.length-2].name +" sale  "+ x[x.length-2].quantity+"  Books";
	document.getElementById("bestsaler3").innerHTML = x[x.length-3].name +" sale  "+ x[x.length-3].quantity+"  Books";
}


// edit json on buying books to figure out best Buyer
function editJson(buyerName,quantityBuy)
{
	for (var i=0; i<saler.length; i++) {
	  	if (result[i].name == buyerName) 
	  	{
	    	result[i].quantity = Number(result[i].quantity) + quantityBuy;
	    	break;
	  	}
	}
}

// loading dropdown  of saler and book Names 
//udating saler
function loadDropDown( buyerid,bookNameId)
{
	//debugger;
	//dropdown for buyer's name selection
	$('select').empty();
	$('#bQuantity').val("");
	$('#bQuantityy').val("");
	//$('#saler').empty();


	var option = document.createElement("option");
	option.value = -1;
	option.text = "Select Your Name";
	buyerid.options.add(option);
	for(var i =0 ; i< salerName.length; i++)
	{
		// creating dropdown option element of select
		option = document.createElement("option");
		option.value = i;
		option.text = salerName[i];
		buyerid.options.add(option);
	}

	//dropdown for book name selection

	if(booksName.length == 0)
	{
		option = document.createElement("option");
		option.value = -1;
		option.text = "Store is empty \n Add book before buy";
		bookNameId.options.add(option);
	}
	else
	{
		option = document.createElement("option");
			option.value = -1;
			option.text = "Select Book Name";
			bookNameId.options.add(option);
		for(var i =0 ; i< booksName.length; i++)
		{
			// creating dropdown option element of select
			option = document.createElement("option");
			option.value = i;
			option.text = booksName[i];
			bookNameId.options.add(option);
		}
	}

	getBestBuyer() 

}

// will work on page load
$(document).ready(function()
{
 	loadDropDown( document.getElementById("saler"),document.getElementById("bookName"));
});

// dealing  buy Books 
function submitOrder(bookName,bquantity,bbuyer)
{
	//debugger;
	
	var index = bookName.value;
	var name = booksName[index];


	//using to find index name in SoldBook Array
	// findName is gloa=ble variable
	findName = name;
	var quantity = Number(bquantity.value); 
	
	if(index == -1 || quantity == 0 || bbuyer.value == -1 )
	{
		if(index == -1)
		{
			$("#bookName").tooltip('show');
			
		}
		else if(quantity == 0)
		{
			$("#bQuantityy").tooltip('show');
		}
		else
		{
			$("#saler").tooltip('show');
		}
		return;
	}

	if(quantity <= 0)
	{
		return;
	}

	//not enough Stock for buying
	if ((booksQuantity[index] - quantity)  < 0)
	{
		//no push will perform
		alert("Not Enought Stoke is Availabe \n  Available Quantity is : " + booksQuantity[index]);
		return;
	}
	else
	{
		//books Sold Array is empty
		if(booksSold.length > 0)
		{
			// already contain .this name in books Sold array
			if(booksSold.indexOf(name)> -1)
			{
				var indexOfElement = booksSold.findIndex(checkIndex);

				if((booksQuantity[index] - quantity) > 0)
				{
					booksQuantity[index] = booksQuantity[index] - quantity;
					soldQuantity[indexOfElement] = soldQuantity[indexOfElement] + quantity;
				}
				else if((booksQuantity[index] - quantity) == 0)
				{

					// remove name and quantity from BooksName Array and booksQuantity Array
					booksName.splice(index, 1);
					booksQuantity.splice(index, 1);
					booksPrice.splice(index,1);

					soldQuantity[indexOfElement] = soldQuantity[indexOfElement] + quantity;
						
				}
				//update json for buyer 
				editJson(salerName[bbuyer.value], Number(quantity));
			}
			else
			{
				if((booksQuantity[index] - quantity) > 0)
				{
					booksQuantity[index] = booksQuantity[index] - quantity;
				}
				else if((booksQuantity[index] - quantity) == 0)
				{

					// remove name and quantity from BooksName Array and booksQuantity Array
					booksName.splice(index, 1);
					booksQuantity.splice(index, 1);
						
				}
				booksSold.push(name);
				soldQuantity.push(quantity);

				//update json for buyer 
				editJson(salerName[bbuyer.value], Number(quantity));
			}
		}
		else
		{
			if((booksQuantity[index] - quantity) > 0)
			{
				booksQuantity[index] = booksQuantity[index] - quantity;

			}
			else if((booksQuantity[index] - quantity) == 0)
			{
				// remove name and quantity from BooksName Array and booksQuantity Array
				booksName.splice(index, 1);
				booksQuantity.splice(index, 1);
						
			}

			booksSold.push(name);
			soldQuantity.push(quantity);

			//update json for buyer 
			editJson(salerName[bbuyer.value], Number(quantity));

		}	
	}
	//reload drop drop down
	loadDropDown( document.getElementById("saler"),document.getElementById("bookName"));

	alert("Successfully Done");
}


// Adding Book Name , No of Books and Price of Books in book Store
function AddBookInStore()
{
	
	var name = (document.getElementById("bName").value).toLowerCase();
	var quantity = Number(document.getElementById("bQuantityy").value);
	var price = Number(document.getElementById("bPrice").value);

	if(quantity == 0 || price == 0 || name =="" )
	{
		if(name =="" )
		{
			$("#bName").tooltip('show');
			
		}
		else if(quantity == 0)
		{
			$("#bQuantityy").tooltip('show');
		}
		else
		{
			$("#bPrice").tooltip('show');
		}
		return;
	}

	if(booksName.indexOf(name) > -1)
	{
		findName = name;
		var indexOfName = booksName.findIndex(checkIndex);
		booksQuantity[indexOfName] = booksQuantity[indexOfName] + quantity;
	}
	else{
		booksName.push(name);
		booksQuantity.push(quantity);
		booksPrice.push(price);
	}
	loadDropDown( document.getElementById("saler"),document.getElementById("bookName"));

	document.getElementById("bName").value = null;
	document.getElementById("bQuantity").innerHTML = "";
	document.getElementById("bPrice").value = null;
	alert("Successfully Done");
}

//function use as perameter for FindIndex() function
function checkIndex(name)
{
	return  name == findName;
}


// avoid reload of page after submition of add book form
$('#AddBookForm').submit(function () {
	 return false;
});

// avoid reload of page after submition of buy book form
$('#buyBooksForm').submit(function () {
	 return false;
});

// avoid reload of page after submition of search form
$('#submitsearchForm').submit(function () {
	 return false;
});




// displaying all book on web
function ViewAllBooks()
{

	var counter = 0;

	if(booksName.length == 0)
	{
		alert("Store is empty");
		return;
	}

	var div = document.getElementById("showAllBooks");
	var htmlElements = "";
	var finalstring = "<h3 style='text-align:center'> All Available Books</h3>";
	
	for(var i = 0 ; i<booksName.length/4; i++)
	{
		for(var j = 0; j< 4 ; j++)
		{
			if(booksName[counter] == undefined) 
			{
				break;
			}
			else
			{	
				//creating div for image / price / buy Button
				htmlElements = "<div class='col-md-3' style='margin-top:15px;'><div class='row'><img src='../image/1.jpg' height='270px' width='85%' alt='image not found'/></div><div class='row'><p style='font-weight: bold; font-size: 15px;'>"+booksName[counter]+"</p> <p><span style='font-weight: bold; font-size: 13px'>Price:</span>"+booksPrice[counter]+" .$</p></div> <div class='row'><input class='btn  btn-info' type='button' data-toggle='modal' data-target='#myModal' value='Buy' ></input></div></div>";
				finalstring = finalstring + htmlElements;
				counter++;
			}	
		}	
	}

	div.innerHTML = finalstring;
	//in case user have result of search on web it will erase div of id = showResults
	document.getElementById("showResults").innerHTML = "";
}

// this block of code handle Enter event on input field
$(document).ready(function() {
  $('#searchInput').keyup(function(e) {
    if(e.keyCode === 13) {
		var bookName = $(this).val();

		search(bookName);
    }
  });

  $('#bName').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });

   $('#bQuantityy').keyup(function(e) {
   	if(document.getElementById("bQuantityy").value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById("bQuantityy").value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });

   $('#bPrice').keyup(function(e) {
   	if(document.getElementById('bPrice').value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById('bPrice').value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });

    $('#bookName').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });

   $('#bQuantity').keyup(function(e) {
   	if(document.getElementById('bQuantity').value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById('bQuantity').value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });

   $('#saler').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStore()
    }
  });


   $("#bookName").on('change',function(){
   	if(document.getElementById("bookName").value != -1)
   	{
   		document.getElementById("price").innerHTML = "Price :"+ booksPrice[document.getElementById("bookName").value]+"$";
   	}

   })

   $('#bookName').click(function(){
	if(booksName.length == 0)
	{
		if(confirm("There is no book in Store. Would you like to Add Book"))
		{
			$("#AddBookBtn").click();
		}
	}
});

});

//perform search and also displaying results
function search(bookName)
{			
	bookName = bookName.toLowerCase();
	var counter = 0;
	var flage = true;

	//in case user have All books record on web it will erase div of id = showAllBooks
	document.getElementById("showAllBooks").innerHTML = "";

	var div = document.getElementById("showResults");
	var htmlElements = "";
	var finalstring = "<h3 style='text-align:center'> Search Results</h3>";;

		for(var i = 0 ; i<booksName.length; i++)
		{
			if(booksName[i] == undefined) 
			{
				break;
			}
			else if((booksName[i]).toLowerCase().includes(bookName))
			{		
				htmlElements = "<div class='col-md-3' style='margin-top:15px;'><div class='row'><img src='../image/1.jpg' height='270px' width='85%' alt='image not found'/></div><div class='row'><p style='font-weight: bold; font-size: 15px;'>"+booksName[counter]+"</p> <p><span style='font-weight: bold; font-size: 13px'>Price:</span>"+booksPrice[counter]+" .$</p></div> <div class='row'><input class='btn  btn-info' type='button' data-toggle='modal' data-target='#myModal' value='Buy'></input></div></div>";
				finalstring = finalstring + htmlElements;
				flage = false;
			}	
			counter++;	
		}

		div.innerHTML = finalstring;

	if (flage)
	{
		if(booksName.length == 0)
		{
			alert("Store is empty");
		}
		else
		{
			alert("No Match found");
		}

	}
	else
	{
		$('html, body').animate({
        scrollTop: $("#showSearchResult").offset().top
    }, 1500);
	}

}


