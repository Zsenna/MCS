// Tombol navigasi item/list :
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded

    
    var itemBtn = document.getElementById('itemBtn');
    var listBtn = document.getElementById('listBtn');

    var itemPart = document.querySelector('.product-box');
    var listPart = document.querySelector('.product-item');

    setTimeout(function () {
        itemBtn.click();
    }, 100);

    
    itemBtn.addEventListener('click', function () {
       
        console.log('Item Button Clicked');
        itemPart.style.display = '';
        listPart.style.display = 'none';    
        
    });

    listBtn.addEventListener('click', function () {
       
        console.log('List Button Clicked');
        itemPart.style.display = 'none';
        listPart.style.display = '';
    });
});