var productsList = new Array();
var newObj;

class Product {
    constructor(Item)
    {
        this.Id = Item.Id;
        this.Title = Item.Title;
        this.Description = Item.Description;
        this.Image = Item.Image;
        this.Ratings = Item.Ratings;
        this.Price = Item.Price;
        this.InStock = Item["In-Stock"];
        this.Quantity = Item.Quantity;
    }
}

$(function() {
    $.getJSON("datafiles/menu.json", function(data) {
        menuData = data
        for (let x = 0; x < menuData.length; x++) {
            newObj = new Product(
                menuData[x]
            );
            productsList.push(newObj);
        }
        var container = "";
        localStorage.setItem("menuData", JSON.stringify(data));
        if(!localStorage.getItem("cartData"))
        {
            localStorage.setItem("cartData", JSON.stringify([]));
        }
        $.each(data, function(index, value) {
            var newDiv = `<div class='grid-item'>
                                <img src = '${value.Image}'>
                                <h2>${value.Title}</h2>
                                <h5>${value.Description}</h4>
                                <h3>Rating: ${value.Ratings}</h3>
                                <h3>Price: ${value.Price} CAD</h3>
                                <h3 style="color:red;display:none" id = "${value.Id}Stock">Item Out of Stock</h3>
                                <button type="button" onClick="saveData(${value.Id}) ">
                                    Add to cart
                                </button>
                          </div>`
            container += newDiv;
        })
        $("#grid-container").html(container);
    });
});

function saveData(ID)
{
    var menuItems = JSON.parse(localStorage.getItem("menuData"));
    var cartData = JSON.parse(localStorage.getItem("cartData"));
    var flag = 0
    for(var i = 0; i < cartData.length; i++)
    {
        if(cartData[i].Id == ID)
        {
            if(cartData[i]["In-Stock"])
            {
                cartData[i].Quantity += 1                
                flag = 1;
                break;
            }
        }
    }
    if(flag == 0)
    {
        var x = menuItems[ID-1]
        if(x["In-Stock"])
        {
            x.Quantity = 1
            cartData.push(x)
        }    
        else {
            document.getElementById(ID + "Stock").style.display = "block";
        }
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));
}