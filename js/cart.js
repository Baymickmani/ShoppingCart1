cartData = JSON.parse(localStorage.getItem("cartData"))
$(function() {
    var container = "";
    total = 0
    $.each(cartData, function(index, value) {
        productPrice = eval(value.Quantity * value.Price)
        total = total + eval(value.Quantity * value.Price)
        var newDiv = `<li>
                        <img src="${value.Image}" width="40px" height="40px">
                        x ${value.Quantity}
                        <span style="font-size: larger;font-weight: bold;">
                            ${value.Title} (${value.Price} x ${value.Quantity}) = ${productPrice} CAD
                            <button onclick="AddMe(${value.Id})">Add</button>
                            <button onclick="Delete(${value.Id})">Delete</button>
                            <button onclick="Remove(${value.Id})">Remove Product</button>

                        </span>
                    </li>`
        container += newDiv;
    })
    if(total >= 100)
        discount = -0.3 * total;
    else if(total >= 70)
        discount = -0.2 * total;
    else if(total >= 30)
        discount = -0.1 * total;
    else
        discount = 0;
    tax = eval(0.13 * (total + discount))
    container += `<h3>Total Value of Cart = ${total.toFixed(2)} CAD</h3>`
    container += `<h3>Discount = ${discount.toFixed(2)}</h3>`
    container += `<h3>Tax(13% HST) = ${tax.toFixed(2)} CAD</h3>` 
    container += `<h2 style="color:green">Payable Amount = ${(total + discount + tax).toFixed(2)}</h2>`
    $(".ulList").html(container);
});

function AddMe(ID)
{
    for(var i = 0; i < cartData.length; i++)
    {
        if(cartData[i].Id == ID)
        {
            cartData[i].Quantity += 1                
            break;
        }
    }
    localStorage.setItem("cartData", JSON.stringify(cartData))
    document.location.reload();
}

function Remove(ID)
{
    cartData = cartData.filter(function(item) {
        return item.Id != ID;
     });
    localStorage.setItem("cartData", JSON.stringify(cartData))
    document.location.reload();
}

function Delete(ID)
{
    for(var i = 0; i < cartData.length; i++)
    {
        if(cartData[i].Id == ID)
        {
            cartData[i].Quantity -= 1               
            break;
        }
    }
    localStorage.setItem("cartData", JSON.stringify(cartData))
    document.location.reload();
}