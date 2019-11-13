$(document).ready(function(){
    getAllProducts();
    
    $("#new-product-submit").on("click", function(event){
        
        getAllProducts();

        let body = {
            sellerId: 504,
            name: $("#name").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
        }

        event.preventDefault();
        $.post({
            method: "POST",
            url: "/api/product",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    });

    function getAllProducts() {
        $.getJSON("/api/products/all", function(data){
            data.forEach(item => {
                console.log(item);
                $("#store-items").append(`
                <div class = "item">
                    <h3>${item.name}</h3>
                    <p>${item.price}</p>
                </div>
                `)
            })
        });
    }
});