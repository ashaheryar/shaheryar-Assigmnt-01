// Book Store 
// Assignment-02 in javaScript 



//.............................read me before tests review...........................
//book name should not conntain "abc" tests requirment	// AddBook_spec.js  case 02
//there should be one book name "css" tests requirment // AddBook_spec.js case 03
//.................required input for search_spec.js................................
///......................var booksName  = ["css"]...............var booksQuantity = [1];............var booksPrice = [2];


//boosname should empty  test requirment // search_spec.js  case 01 
//.................required input for search_spec.js................................
///......................var booksName  = []...............var booksQuantity = [];............var booksPrice = [];


// there should be css books more than 2  //submitOrder_spec.js  case 02
//there should not html book in booksSold array and should be in booksName quantity 2 index 2 //submitOrder_spec.js case 04
//......................................required input for submitOrder_spec.js/...................................
//.................var booksName  = ["css","html"].............var booksQuantity = [3,2];.....var booksPrice = [2,13];


// All variables
var booksName  = ["css"];
var booksQuantity = [1];
var booksPrice = [1];
var booksSold = [ "angular" ,"css"];
var soldQuantity = [5, 5];
var findName = "";
// code demand at least three saler for discription see getbestBuyer
var salerName = ["Mr.Ali","Mr.Ahmed","Mr.Raza"];

var saler= '[{"name":"Mr.Ali","quantity" : "3"},{"name":"Mr.Ahmed","quantity" : "0"},{"name":"Mr.Raza","quantity" : "7"}]';
var json = JSON.parse(saler);
var jsonresult  = json;



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
	  	if (jsonresult[i].name == buyerName) 
	  	{
	    	jsonresult[i].quantity = Number(jsonresult[i].quantity) + quantityBuy;
	    	break;
	  	}
	}
}

// validation should perform search or not
function shouldSearch(searchString)
{
	var finalstring = "<h3 style='text-align:center'> Search Results</h3>";
	var flage = true;
	var htmlElements = "";

	if(booksName.length == 0)
	{
		alert("Store is empty");
		return false;
	}

	for(var i = 0 ; i<booksName.length; i++)
	{
		if(booksName[i] == undefined) 
		{
			break;
		}
		else if((booksName[i]).toLowerCase().includes(searchString))
		{		
			htmlElements = "<div class='col-md-3' style='margin-top:15px;'><div class='row'><img src='../image/1.jpg' height='270px' width='85%' alt='image not found'/></div><div class='row'><p style='font-weight: bold; font-size: 15px;'>"+booksName[i]+"</p> <p><span style='font-weight: bold; font-size: 13px'>Price:</span>"+booksPrice[i]+" .$</p></div> <div class='row'><input class='btn  btn-info' type='button' data-toggle='modal' data-target='#myModal' value='Buy'></input></div></div>";
			finalstring = finalstring + htmlElements;
			flage = false;
		}	
	}
	if (flage)
	{
		alert("No Match found");
		return false;
	}

	return finalstring;
}

// calling shouldSearch(searchString), also displaying results on web
function search(searchString)
{			
	//in case user have All books record on web this line will erase div of id = showAllBooks
	document.getElementById("showAllBooks").innerHTML = "";
	document.getElementById("showResults").innerHTML = "";

	var div = document.getElementById("showResults");

	var htmlCode = shouldSearch(searchString.toLowerCase());
	if(htmlCode != false)
	{
		div.innerHTML = htmlCode;
		$('html, body').animate({
        scrollTop: $("#showSearchResult").offset().top
    	}, 1500);
	}

}



function submitOrder(index,quantity,buyer)
{ 
	var name = booksName[index];


	//using to find index name in SoldBook Array
	// findName is global variable
	findName = name;
	if(index == -1 || quantity == 0 || buyer == -1 )
	{
		return true;
	}
	
	//not enough Stock for buying
	if ((booksQuantity[index] - quantity)  < 0)
	{
		//no push will perform
		alert("Not Enought Stoke is Availabe \n  Available Quantity is : " + booksQuantity[index]);
		return true;
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
				editJson(salerName[buyer], Number(quantity));
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
					booksPrice.splice(index,1);
				}

				booksSold.push(name);
				soldQuantity.push(quantity);

				//update json for buyer 
				editJson(salerName[buyer], Number(quantity));
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
				booksPrice.splice(index,1);		
			}

			booksSold.push(name);
			soldQuantity.push(quantity);

			//update json for buyer 
			editJson(salerName[buyer], Number(quantity));

		}	
	}

}

// dealing  buy Books 
function submitOrderForm(bookName,bquantity,bbuyer)
{

	var quantity = Number(bquantity.value); 
	
	if(submitOrder(bookName.value,quantity,bbuyer.value))
	{
		if(index == -1)
		{
			$("#bookName").tooltip('show');
			
		}
		else if(quantity == 0)
		{
			$("#AddBookQuantity").tooltip('show');
		}
		else
		{
			$("#saler").tooltip('show');
		}
		return;
	}

	
	//reload drop drop down//
	loadDropDown( document.getElementById("saler"),document.getElementById("bookName"));

	// erase  div
	document.getElementById("showResults").innerHTML = "";
	document.getElementById("showAllBooks").innerHTML = "";

	alert("Successfully Done");
}

//this function after checking feasibility will add book in store
function addBook(name,quantity,price)
{
	//input fields of Add Book Block is empty
	if(quantity == 0 || price == 0 || name =="" )
	{
		return true;
	}
	// if already have book in store(BooksName[] array)
	if(booksName.indexOf(name) > -1)
	{
		findName = name;
		var indexOfName = booksName.findIndex(checkIndex);
		booksQuantity[indexOfName] = booksQuantity[indexOfName] + quantity;
	}
	else
	{
		booksName.push(name);
		booksQuantity.push(quantity);
		booksPrice.push(price);
	}
	return false;
}



// This will get values from Add_book_In_Store_form and calling addBook()
function AddBookInStoreForm()
{
	var name = (document.getElementById("AddBookName").value).toLowerCase();
	var quantity = Number(document.getElementById("AddBookQuantity").value);
	var price = Number(document.getElementById("addBookPrice").value);


	var AddBookReturn = addBook(name,quantity,price);
	if(AddBookReturn)
	{
		if(name =="" )
		{
			$("#AddBookName").tooltip('show');
			
		}
		else if(quantity == 0)
		{
			$("#AddBookQuantity").tooltip('show');
		}
		else
		{
			$("#addBookPrice").tooltip('show');
		}
		return false;
	}



	loadDropDown( document.getElementById("saler"),document.getElementById("bookName"));

	document.getElementById("AddBookName").value = null;
	document.getElementById("bQuantity").innerHTML = "";
	document.getElementById("addBookPrice").value = null;
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

  $('#AddBookName').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStoreForm();
    }
  });

   $('#AddBookQuantity').keyup(function(e) {
   	if(document.getElementById("AddBookQuantity").value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById("AddBookQuantity").value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStoreForm();
    }
  });

   $('#addBookPrice').keyup(function(e) {
   	if(document.getElementById('addBookPrice').value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById('addBookPrice').value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStoreForm();
    }
  });

    $('#bookName').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStoreForm();
    }
  });

   $('#bQuantity').keyup(function(e) {
   	if(document.getElementById('bQuantity').value>30)
   	{
   		alert("you are not allow to enter value greater than 30");
   		document.getElementById('bQuantity').value = 30;
   	}
    if(e.keyCode === 13) {
		AddBookInStoreForm();
    }
  });

   $('#saler').keyup(function(e) {
    if(e.keyCode === 13) {
		AddBookInStoreForm();
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




