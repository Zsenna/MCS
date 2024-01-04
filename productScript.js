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

    // Sembunyikan :
    const dropElements = document.querySelectorAll('.card-image #drop');

    // Hide all "card-desc" elements initially
    const cardDescElements = document.querySelectorAll('.card-desc');
    cardDescElements.forEach(cardDesc => {
        cardDesc.setAttribute('hidden', 'true');
    });
    
    // Add event listeners to each "drop" element
    dropElements.forEach((drop, index) => {
        // Get the corresponding "card-desc" element
        const cardDesc = document.querySelectorAll('.card-desc')[index];
      
        // Add event listeners for hover
        drop.addEventListener('mouseover', () => {
          cardDesc.removeAttribute('hidden');  // Show the corresponding card-desc
        });
      
        // Add event listener for mouseout on the drop element
        drop.addEventListener('mouseout', () => {
          // Check if the mouse is not over the card-desc before hiding it
          if (!isMouseOverElement(cardDesc)) {
            cardDesc.setAttribute('hidden', 'true'); // Hide the corresponding card-desc
          }
        });
      
        // Add event listener for mouseover on the card-desc itself
        cardDesc.addEventListener('mouseover', () => {
          cardDesc.removeAttribute('hidden');  // Show the corresponding card-desc
        });
      
        // Add event listener for mouseout on the card-desc itself
        cardDesc.addEventListener('mouseout', () => {
          cardDesc.setAttribute('hidden', 'true'); // Hide the corresponding card-desc
        });
      });
      
      // Function to check if the mouse is over an element
      function isMouseOverElement(element) {
        const { left, top, width, height } = element.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
      
        return mouseX >= left && mouseX <= left + width && mouseY >= top && mouseY <= top + height;
      }

    // Navbar :
    const productNavItems = document.querySelectorAll('.products-nav-text');


    let highlighted_nav = 'API';
    productNavItems.forEach((item) => {
        item.addEventListener('click', function () {
            // Reset the classes of all the items
            productNavItems.forEach((navItem) => {
                navItem.classList.remove('products-nav-text_highlighted');
                navItem.classList.add('products-nav-text');
            });
            // Set the class of the clicked item to 'products-nav-text_highlighted'
            this.classList.remove('products-nav-text');
            this.classList.add('products-nav-text_highlighted');

            highlighted_nav = this.textContent;
            console.log(highlighted_nav);

            // Reset the current page to 1 when the category changes
            currentPage = 1;

            // Show the products for the new category
            showNextPage();
        });
    });

    // Set value untuk data dari Products :
    let currentPage = 1;
    const productsPerPage = 9;/*  */
    const totalProducts = productsBahanBaku.length;

    function showNextPage() {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
    
        if (currentPage <= totalPages) {
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
    
            let productsToShow;
    
            if (highlighted_nav === 'STERIS') {
                // Display STERIS products
                productsToShow = productsSteris.slice(startIndex, endIndex);
            } else {
                // Display products based on the highlighted category
                const highlightedProducts = productsBahanBaku.filter((product) => product.CATEGORY === highlighted_nav);
                productsToShow = highlightedProducts.slice(startIndex, endIndex);
            }
    
            updateProductDisplay(productsToShow);
    
            const remainingProducts = (highlighted_nav === 'STERIS')
                ? productsSteris.slice(endIndex)
                : productsBahanBaku.filter((product) => product.CATEGORY === highlighted_nav).slice(endIndex);
    
            if (remainingProducts.length === 0 || currentPage >= totalPages) {
                hideUnusedSections(totalPages); // Pass totalPages as an argument
    
                // Disable the next button if there are no more products or if it's the last page
                const nextButton = document.getElementById('product-next');
                if (nextButton) {
                    nextButton.disabled = true;
                }
            } else {
                // Increment the current page only if there are more pages
                currentPage++;
            }
        }
    }
    

    function showPreviousPage() {
        if (currentPage > 1) {
            const startIndex = (currentPage - 2) * productsPerPage;
            const endIndex = startIndex + productsPerPage;

            let productsToShow;

            if (highlighted_nav === 'STERIS') {
                // Display STERIS products
                productsToShow = productsSteris.slice(startIndex, endIndex);
            } else {
                // Display products based on the highlighted category
                productsToShow = productsBahanBaku
                    .filter((product) => product.CATEGORY === highlighted_nav)
                    .slice(startIndex, endIndex);
            }

            updateProductDisplay(productsToShow);

            const nextButton = document.getElementById('product-next');
            if (nextButton) {
                nextButton.disabled = false;
            }

            currentPage--;
        }
    }

    function updateProductDisplay(products) {
        for (let i = 0; i < productsPerPage; i++) {
            const product = products[i];
            const productId = i + 1;

            const productCard = document.getElementById(`product${productId}`);

            if (productCard) {
                productCard.style.display = 'block';
                document.getElementById(`product${productId}`).innerText = product ? product['Nama Barang'] || product.PRODUCT : '';
                document.getElementById(`principal${productId}`).innerText = product ? product['Klasifikasi Produk'] || product.PRINCIPAL : '';
                document.getElementById(`category${productId}`).innerText = highlighted_nav === 'STERIS' ? product ? product['Klasifikasi Produk'] || '' : '' : product ? product.CATEGORY || '' : '';

            }
        }
    }

    function hideUnusedSections(totalPages) {
        for (let i = totalPages * productsPerPage + 1; i <= totalProducts; i++) {
            const productCard = document.getElementById(`product${i}`);
            if (productCard) {
                productCard.style.display = 'none';
            }
        }
    }

    // Event listeners for navigation buttons
    const nextButton = document.getElementById('product-next');
    if (nextButton) {
        nextButton.addEventListener('click', showNextPage);
    }

    const backButton = document.getElementById('product-back');
    if (backButton) {
        backButton.addEventListener('click', showPreviousPage);
    }

    // Event listener for STERIS category
    const sterisNav = document.getElementById('sterisNav');
    if (sterisNav) {
        sterisNav.addEventListener('click', function () {
            highlighted_nav = 'STERIS';
            currentPage = 1;
            showNextPage();
        });
    }

    // Initial display on page load
    showNextPage();
});