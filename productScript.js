// Tombol navigasi item/list :
document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded

  var itemBtn = document.getElementById("itemBtn");
  var listBtn = document.getElementById("listBtn");

  var itemPart = document.querySelector(".product-box");
  var listPart = document.querySelector(".product-item");

  itemBtn.addEventListener("click", function () {
    itemPart.style.display = "";
    listPart.style.display = "none";

    // Change the src of itemBtn to cardProductSelectedBtn
    itemBtn.src = "img/rizki/Product/cardProductSelectedBtn.png";
    // Change the src of listBtn to cardListUnselectedBtn
    listBtn.src = "img/rizki/Product/cardListUnselectedBtn.png";
    // currentPage = 1;
  });

  listBtn.addEventListener("click", function () {
    itemPart.style.display = "none";
    listPart.style.display = "";

    // Change the src of itemBtn to cardProductUnselectedBtn
    itemBtn.src = "img/rizki/Product/cardProductUnselectedBtn.png";
    // Change the src of listBtn to cardListSelectedBtn
    listBtn.src = "img/rizki/Product/cardListSelectedBtn.png";
    // currentPage = 1;
  });

  // Simulates itemBtn click when loading the page :
  itemBtn.click();

  // Sembunyikan :
  const dropElements = document.querySelectorAll(".card-image #drop");

  // // Hide all "card-desc" elements initially
  // const cardDescElements = document.querySelectorAll('.card-desc');
  // cardDescElements.forEach(cardDesc => {
  //     cardDesc.setAttribute('hidden', 'true');
  // });

  // // Add event listeners to each "drop" element
  // dropElements.forEach((drop, index) => {
  //     // Get the corresponding "card-desc" element
  //     const cardDesc = document.querySelectorAll('.card-desc')[index];

  //     // Add event listeners for hover
  //     drop.addEventListener('mouseover', () => {
  //         cardDesc.removeAttribute('hidden');  // Show the corresponding card-desc
  //     });

  //     // Add event listener for mouseout on the drop element
  //     drop.addEventListener('mouseout', () => {
  //         // Check if the mouse is not over the card-desc before hiding it
  //         if (!isMouseOverElement(cardDesc)) {
  //             cardDesc.setAttribute('hidden', 'true'); // Hide the corresponding card-desc
  //         }
  //     });

  //     // Add event listener for mouseover on the card-desc itself
  //     cardDesc.addEventListener('mouseover', () => {
  //         cardDesc.removeAttribute('hidden');  // Show the corresponding card-desc
  //     });

  //     // Add event listener for mouseout on the card-desc itself
  //     cardDesc.addEventListener('mouseout', () => {
  //         cardDesc.setAttribute('hidden', 'true'); // Hide the corresponding card-desc
  //     });
  // });

  // Function to check if the mouse is over an element
  function isMouseOverElement(element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    return (
      mouseX >= left &&
      mouseX <= left + width &&
      mouseY >= top &&
      mouseY <= top + height
    );
  }

  // Navbar :
  const productNavItems = document.querySelectorAll(".products-nav-text");
  const pageControlContainer = document.getElementById("pageControl");

  let highlighted_nav = "API";
  let currentPage = 1;

  productNavItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Reset the classes of all the items
      productNavItems.forEach((navItem) => {
        navItem.classList.remove("products-nav-text_highlighted");
        navItem.classList.add("products-nav-text");
      });

      // Set the class of the clicked item to 'products-nav-text_highlighted'
      this.classList.remove("products-nav-text");
      this.classList.add("products-nav-text_highlighted");

      highlighted_nav = this.textContent;

      // Reset the current page to 1 when the category changes
      currentPage = 1;

      // Show the products for the new category
      showNextPage();
      updatePageControl();

      // Hide all images initially
      const allImages = document.querySelectorAll(".selected-nav-wrapper img");
      allImages.forEach((image) => {
        image.setAttribute("hidden", "true");
      });

      // Show the image associated with the selected navigation item
      const imageMapping = {
        API: "ApiImg",
        EXIPIENT: "expientImg",
        EXTRACT: "extractImg",
        STERIS: "sterisImg",
      };

      const associatedImageId = imageMapping[highlighted_nav];
      if (associatedImageId) {
        document.getElementById(associatedImageId).removeAttribute("hidden");
      }
    });
  });

  let firstLoad = true;

  function updatePageControl() {
    console.log("updatePagecalled");
    // Clear existing dots
    pageControlContainer.innerHTML = "";

    // Determine which product array to use based on the highlighted_nav
    const productsArray =
      highlighted_nav === "STERIS" ? productsSteris : productsBahanBaku;

    // Calculate the total number of pages for the current division
    const totalDivisionProducts =
      highlighted_nav === "STERIS"
        ? productsSteris.length
        : productsArray.filter(
            (product) => product.CATEGORY === highlighted_nav
          ).length;

    const totalPages = Math.ceil(totalDivisionProducts / productsPerPage);

    // Iterate over each product card and check the "title" class value
    document.querySelectorAll(".product-card").forEach((productCard, index) => {
      const title = productCard.querySelector(".title").innerText.trim();

      // Set product card visibility based on the "title" class value
      productCard.style.display = title === "" ? "none" : "block";
    });

    // Generate new dots based on the total pages
    console.log(currentPage);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("img");
      dot.classList.add("page-control-dot");

      // Adjusted to start from 1-based index
      dot.id = `dotPage${i + 1}`;

      // Highlight the current page dot
      if (i === currentPage - 1) {
        dot.src = "img/rizki/Product/currentBtn.png";
      } else {
        dot.src = "img/rizki/Product/otherPageBtn.png";

        // Add classes only for the dots immediately before and after the current page
        if (i === currentPage - 2) {
          // Dot immediately before the current page
          dot.classList.add("_before");
        } else if (i === currentPage) {
          // Dot immediately after the current page
          dot.classList.add("_after");
        }
      }

      // Add a click event listener to navigate to the corresponding page
      dot.addEventListener("click", function () {
        currentPage = i + 1;
        showNextPage();
        updatePageControl();
        firstLoad = false;
      });

      // Append the dot to the page control container
      pageControlContainer.appendChild(dot);
    }
  }

  // console.log(currentPage);

  // Set value untuk data dari Products :
  const productsPerPage = 6; /*  */
  const totalProducts = productsBahanBaku.length;

  function showNextPage(allowedIncrement) {
    console.log("shownextpagerun");
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    if (currentPage <= totalPages) {
      const startIndex = (currentPage - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;

      let productsToShow;

      if (highlighted_nav === "STERIS") {
        // Display STERIS products
        productsToShow = productsSteris.slice(startIndex, endIndex);
      } else {
        // Display products based on the highlighted category
        const highlightedProducts = productsBahanBaku.filter(
          (product) => product.CATEGORY === highlighted_nav
        );
        productsToShow = highlightedProducts.slice(startIndex, endIndex);
      }

      updateProductDisplay(productsToShow);

      const remainingProducts =
        highlighted_nav === "STERIS"
          ? productsSteris.slice(endIndex)
          : productsBahanBaku
              .filter((product) => product.CATEGORY === highlighted_nav)
              .slice(endIndex);

      if (remainingProducts.length === 0 || currentPage >= totalPages) {
        // Disable the next button if there are no more products or if it's the last page
        const nextButton = document.getElementById("product-next");
        if (nextButton) {
          nextButton.disabled = true;
        }
      } else if (allowedIncrement === true) {
        currentPage++;
      }
    }
    updatePageControl();
    // console.log(currentPage);
  }

  function updateProductDisplay(products) {
    console.log("updateProduct");
    const productsPerPage = 9;
    let index = 1;

    // Reset topTitles
    for (let i = 1; i <= 9; i++) {
      const topTitle = document.getElementById(`topTitle${i}`);
      topTitle.innerText = "";
      topTitle.style.display = "none";

      const ulTopTitle = document.getElementById(`ulTopTitle${i}`);
      ulTopTitle.innerHTML = "";
    }

    let displayedProducts = 0;

    // Group products based on the first letter
    const groupedProducts = {};
    products.forEach((product) => {
      let key;
      if (highlighted_nav === "STERIS") {
        key =
          product && product["Nama Barang"]
            ? product["Nama Barang"][0].toUpperCase()
            : "";
      } else {
        key =
          product && product["PRODUCT"]
            ? product["PRODUCT"][0].toUpperCase()
            : "";
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

      if (
        highlighted_nav === "STERIS" &&
        displayedProducts + groupedProducts[key].length > productsPerPage
      ) {
        // If adding this section would exceed the productsPerPage limit, don't display it
        topTitle.style.display = "none";
      } else {
        topTitle.style.display = "block";

        groupedProducts[key]
          .sort((a, b) => {
            const property =
              highlighted_nav === "STERIS" ? "Nama Barang" : "PRODUCT";
            return ((a && a[property]) || "").localeCompare(
              (b && b[property]) || ""
            );
          })
          .forEach((product) => {
            if (displayedProducts < productsPerPage) {
              const li = document.createElement("li");
              const property =
                highlighted_nav === "STERIS" ? "Nama Barang" : "PRODUCT";
              li.innerText = (product && product[property]) || "";
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
          productCard.style.display = "block";

          // Check if the product is defined
          if (product) {
            let productName;
            let principal;
            let category;

            if (highlighted_nav === "STERIS") {
              productName = product["Nama Barang"] || "";
              principal =
                product["Klasifikasi Produk"] || product.PRINCIPAL || "";
              category = "";
            } else {
              productName = product["PRODUCT"] || "";
              principal =
                product["Klasifikasi Produk"] || product.PRINCIPAL || "";
              category = "";
            }

            document.getElementById(`product${productId}`).innerText =
              productName;
            document.getElementById(`principal${productId}`).innerText =
              principal;
            document.getElementById(`category${productId}`).innerText =
              category;

            // Check if the product belongs to Steris and has a valid image name
            if (highlighted_nav === "STERIS" && product["Nama Barang"]) {
              const imageName = product["Nama Barang"]
                .trim()
                .replace(/\s+/g, "_");
              const imagePath = `img/steris/${imageName}.jpg`;

              // Check if the image exists, set the background, otherwise set the default background
              const imageExists = new Image();
              imageExists.src = imagePath;
              imageExists.onload = () => {
                cardImage.style.backgroundImage = `url(${imagePath})`;
                cardImage.style.backgroundSize = "cover";
              };
              imageExists.onerror = () => {
                cardImage.style.backgroundImage =
                  "url(img/rizki/productCard/product-cover.png)";
              };
            } else if (highlighted_nav !== "STERIS" && product["PRODUCT"]) {
              // For other navs, check if the 'PRODUCT' property exists and use it for the image
              const imageName = product["PRODUCT"].trim().replace(/\s+/g, "_");
              const imagePath = `img/${highlighted_nav.toLowerCase()}/${imageName}.jpg`;

              // Check if the image exists, set the background, otherwise set the default background
              const imageExists = new Image();
              imageExists.src = imagePath;
              imageExists.onload = () => {
                cardImage.style.backgroundImage = `url(${imagePath})`;
                cardImage.style.backgroundSize = "cover";
              };
              imageExists.onerror = () => {
                cardImage.style.backgroundImage =
                  "url(img/rizki/productCard/product-cover.png)";
              };
            } else {
              // If the product is not from Steris or does not have a valid image name, set a default background
              cardImage.style.backgroundImage =
                "url(img/rizki/productCard/product-cover.png)";
            }
          } else {
            // If the product is undefined, set the content to an empty string
            document.getElementById(`product${productId}`).innerText = "";
            document.getElementById(`principal${productId}`).innerText = "";
            document.getElementById(`category${productId}`).innerText = "";
            cardImage.style.backgroundImage =
              "url(img/rizki/productCard/product-cover.png)";
          }
        }
      }
    }

    // Hide unused section
  }

  updatePageControl();

  // Event listeners for navigation buttons
  const nextButton = document.getElementById("product-next");
  if (nextButton) {
    nextButton.addEventListener("click", function () {
      const dotAfter = document.querySelector("._after"); // Find the dot with the _after class
      if (dotAfter) {
        dotAfter.click(); // Mimic a click on the dot
      }
    });
  }

  const backButton = document.getElementById("product-back");
  if (backButton) {
    backButton.addEventListener("click", function () {
      const dotBefore = document.querySelector("._before"); // Find the dot with the _before class
      if (dotBefore) {
        dotBefore.click(); // Mimic a click on the dot
      }
    });
  }

  // Akal2 in iniasisasi pas first page load :
  productNavItems[0].click();
});
