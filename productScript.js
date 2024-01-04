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

    // Set value untuk data dari Products :
    let currentPage = 1;
    const productsPerPage = 9;

    function showNextPage() {
        currentPage++;

        // Calculate the start and end indices for the current page
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        // Get the products to display for the current page
        const productsToShow = productsBahanBaku.slice(startIndex, endIndex);

        // Update the UI with the products for the current page
        updateProductDisplay(productsToShow);
    }

    function showPreviousPage() {
        if (currentPage > 1) {
            currentPage--;

            // Calculate the start and end indices for the current page
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            // Get the products to display for the current page
            const productsToShow = productsBahanBaku.slice(startIndex, endIndex);

            // Update the UI with the products for the current page
            updateProductDisplay(productsToShow);
        }
    }

    function updateProductDisplay(products) {
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const productId = i + 1; // IDs are numbered from 1 to 9

            document.getElementById(`product${productId}`).innerText = product.PRODUCT;
            document.getElementById(`principal${productId}`).innerText = product.PRINCIPAL;
            document.getElementById(`category${productId}`).innerText = product.CATEGORY;
        }
    }

    // Add event listeners to the "Next" and "Back" buttons
    const nextButton = document.getElementById('product-next');
    if (nextButton) {
        nextButton.addEventListener('click', showNextPage);
    }

    const backButton = document.getElementById('product-back');
    if (backButton) {
        backButton.addEventListener('click', showPreviousPage);
    }

    // Initial display on page load
    showNextPage();  // Display the first set of products
    
});