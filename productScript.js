// Tombol navigasi item/list :
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the DOM to be fully loaded


    var itemBtn = document.getElementById('itemBtn');
    var listBtn = document.getElementById('listBtn');

    var itemPart = document.querySelector('.product-box');
    var listPart = document.querySelector('.product-item');



    itemBtn.addEventListener('click', function () {
        console.log('Item Button Clicked');
        itemPart.style.display = '';
        listPart.style.display = 'none';

        // Change the src of itemBtn to cardProductSelectedBtn
        itemBtn.src = 'img/rizki/Product/cardProductSelectedBtn.png';
        // Change the src of listBtn to cardListUnselectedBtn
        listBtn.src = 'img/rizki/Product/cardListUnselectedBtn.png';
        // currentPage = 1;
    });

    listBtn.addEventListener('click', function () {
        console.log('List Button Clicked');
        itemPart.style.display = 'none';
        listPart.style.display = '';

        // Change the src of itemBtn to cardProductUnselectedBtn
        itemBtn.src = 'img/rizki/Product/cardProductUnselectedBtn.png';
        // Change the src of listBtn to cardListSelectedBtn
        listBtn.src = 'img/rizki/Product/cardListSelectedBtn.png';
        // currentPage = 1;
    });

    // Simulates itemBtn click when loading the page :
    itemBtn.click();

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
    const pageControlContainer = document.getElementById('pageControl');


    let highlighted_nav = 'API';
    let currentPage = 1;

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
            updatePageControl();

            // Hide all images initially
            const allImages = document.querySelectorAll('.selected-nav-wrapper img');
            allImages.forEach((image) => {
                image.setAttribute('hidden', 'true');
            });

            // Show the image associated with the selected navigation item
            const imageMapping = {
                'API': 'ApiImg',
                'EXIPIENT': 'expientImg',
                'EXTRACT': 'extractImg',
                'STERIS': 'sterisImg'
            };

            const associatedImageId = imageMapping[highlighted_nav];
            if (associatedImageId) {
                document.getElementById(associatedImageId).removeAttribute('hidden');
            }
        });
    });

    let firstLoad = true;

    function updatePageControl() {
        console.log("aaa");
        // Clear existing dots
        pageControlContainer.innerHTML = '';

        // Determine which product array to use based on the highlighted_nav
        const productsArray = (highlighted_nav === 'STERIS') ? productsSteris : productsBahanBaku;

        // Calculate the total number of pages for the current division
        const totalDivisionProducts = (highlighted_nav === 'STERIS') ?
            productsSteris.length :
            productsArray.filter(product => product.CATEGORY === highlighted_nav).length;

        const totalPages = Math.ceil(totalDivisionProducts / productsPerPage);
        // Generate new dots based on the total pages
        console.log(currentPage);
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('img');
            dot.classList.add('page-control-dot');
            dot.id = `dotPage${i}`; // Adjusted to start from 1-based index
            // Highlight the current page dot

            // first time loading page :
            if (i === currentPage - 2) {
                dot.src = 'img/rizki/Product/currentBtn.png';
            } else {
                dot.src = 'img/rizki/Product/otherPageBtn.png';
            }

            // Next time loading page

            // Add a click event listener to navigate to the corresponding page
            dot.addEventListener('click', function () {
                currentPage = i + 1;
                showNextPage();
                updatePageControl();
                firstLoad = false;
            });
            console.log(currentPage);
            // Append the dot to the page control container
            pageControlContainer.appendChild(dot);
        }
    }

    console.log(currentPage);

    // Set value untuk data dari Products :
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

            // Loop through each product-card to check and hide if principal is blank
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach((productCard, index) => {
                const principalId = `principal${index + 1}`;
                const principalElement = document.getElementById(principalId);

                if (principalElement && principalElement.innerText.trim() === '') {
                    // If principal is blank, make the product-card invisible
                    productCard.style.visibility = 'hidden';
                } else {
                    // Otherwise, make the product-card visible
                    productCard.style.visibility = 'visible';
                }
            });

            if (remainingProducts.length === 0 || currentPage >= totalPages) {

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
        console.log(currentPage);
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

            // Loop through each product-card to check and hide if principal is blank
            const productCards = document.querySelectorAll('.product-card');
            productCards.forEach((productCard, index) => {
                const principalId = `principal${index + 1}`;
                const principalElement = document.getElementById(principalId);

                if (principalElement && principalElement.innerText.trim() === '') {
                    // If principal is blank, make the product-card invisible
                    productCard.style.visibility = 'hidden';
                } else {
                    // Otherwise, make the product-card visible
                    productCard.style.visibility = 'visible';
                }
            });

            const nextButton = document.getElementById('product-next');
            if (nextButton) {
                nextButton.disabled = false;
            }

            currentPage--;
        }
        console.log(currentPage);
    }

    function updateProductDisplay(products) {
        const productsPerPage = 9;
        let index = 1;

        // Reset topTitles
        for (let i = 1; i <= 9; i++) {
            const topTitle = document.getElementById(`topTitle${i}`);
            topTitle.innerText = '';
            topTitle.style.display = 'none';

            const ulTopTitle = document.getElementById(`ulTopTitle${i}`);
            ulTopTitle.innerHTML = '';
        }

        let displayedProducts = 0;

        // Group products based on the first letter
        const groupedProducts = {};
        products.forEach((product) => {
            let key;
            if (highlighted_nav === 'STERIS') {
                key = (product && product['Nama Barang']) ? product['Nama Barang'][0].toUpperCase() : '';
            } else {
                key = (product && product['PRODUCT']) ? product['PRODUCT'][0].toUpperCase() : '';
            }

            if (!groupedProducts[key]) {
                groupedProducts[key] = [];
            }
            groupedProducts[key].push(product);
        });

        // Display grouped products in alphabetical order
        const sortedKeys = Object.keys(groupedProducts).sort();

        sortedKeys.forEach((key) => {
            const topTitle = document.getElementById(`topTitle${index}`);
            const ulTopTitle = document.getElementById(`ulTopTitle${index}`);

            topTitle.innerText = key;

            if (highlighted_nav === 'STERIS' && displayedProducts + groupedProducts[key].length > productsPerPage) {
                // If adding this section would exceed the productsPerPage limit, don't display it
                topTitle.style.display = 'none';
            } else {
                topTitle.style.display = 'block';

                groupedProducts[key].sort((a, b) => {
                    const property = (highlighted_nav === 'STERIS') ? 'Nama Barang' : 'PRODUCT';
                    return (a && a[property] || '').localeCompare(b && b[property] || '');
                }).forEach((product) => {
                    if (displayedProducts < productsPerPage) {
                        const li = document.createElement('li');
                        const property = (highlighted_nav === 'STERIS') ? 'Nama Barang' : 'PRODUCT';
                        li.innerText = product && product[property] || '';
                        ulTopTitle.appendChild(li);
                        displayedProducts++;
                    }
                });

                index++;
            }
        });

        // Update product card display
        for (let i = 1; i <= productsPerPage; i++) {
            const product = products[i - 1];
            const productId = i;
            const productCard = document.getElementById(`product${productId}`);
            const cardImage = document.getElementById(`card${productId}`);
        
            for (let i = 1; i <= productsPerPage; i++) {
                const product = products[i - 1];
                const productId = i;
                const productCard = document.getElementById(`product${productId}`);
                const cardImage = document.getElementById(`card${productId}`);
            
                if (productCard) {
                    productCard.style.display = 'block';
            
                    // Check if the product is defined
                    if (product) {
                        const property = (highlighted_nav === 'STERIS') ? 'Nama Barang' : 'PRODUCT';
                        document.getElementById(`product${productId}`).innerText = product[property] || '';
                        document.getElementById(`principal${productId}`).innerText = product['Klasifikasi Produk'] || product.PRINCIPAL || '';
                        document.getElementById(`category${productId}`).innerText = '';
            
                        // Check if the product belongs to Steris and has a valid image name
                        if (highlighted_nav === 'STERIS' && product['Nama Barang']) {
                            const imageName = product['Nama Barang'].trim().replace(/\s+/g, '_');
                            const imagePath = `img/steris/${imageName}.jpg`;
            
                            // Check if the image exists, set the background, otherwise set the default background
                            const imageExists = new Image();
                            imageExists.src = imagePath;
                            imageExists.onload = () => {
                                cardImage.style.backgroundImage = `url(${imagePath})`;
                                cardImage.style.backgroundSize = 'cover';
                            };
                            imageExists.onerror = () => {
                                cardImage.style.backgroundImage = 'url(img/rizki/productCard/product-cover.png)';
                            };
                        } else {
                            // If the product is not from Steris or does not have a valid image name, set a default background
                            cardImage.style.backgroundImage = 'url(img/rizki/productCard/product-cover.png)';
                        }
                    } else {
                        // If the product is undefined, set the content to an empty string
                        document.getElementById(`product${productId}`).innerText = '';
                        document.getElementById(`principal${productId}`).innerText = '';
                        document.getElementById(`category${productId}`).innerText = '';
                        cardImage.style.backgroundImage = 'url(img/rizki/productCard/product-cover.png)';
                    }
                }
            }
            
            
        }
        

        // Hide unused section
    }

    updatePageControl();

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
    // const sterisNav = document.getElementById('sterisNav');
    // if (sterisNav) {
    //     sterisNav.addEventListener('click', function () {
    //         highlighted_nav = 'STERIS';
    //         currentPage = 1;
    //         showNextPage();
    //     });
    // }

    // Akal2 in iniasisasi pas first page load :
    productNavItems[0].click();
    showNextPage();
});