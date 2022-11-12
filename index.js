const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".products");
const leftMenu = document.querySelector(".leftMenu");
const searchInput = document.querySelector(".search");
const category = document.querySelector(".cat");
const categories = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filterProducts) => {
  productsContainer.innerHTML = filterProducts
    .map((elemt) => {
      return `
        <div class="product">
            <img
              src="${elemt.img}"
              alt="${elemt.id}"
            />
            <span class="name">${elemt.name}</span>
            <span class="priceText">$${elemt.price}</span>
          </div>
        `;
    })
    .join("");
};

const setCategories = () => {
  const allCats = data.map((cat) => cat.cat);
  const uniqueCats = [
    "All",
    ...allCats.filter((item, index) => allCats.indexOf(item) === index),
  ];
  categories.innerHTML = uniqueCats
    .map((item) => `<span class="cat">${item}</span>`)
    .join("");
  categories.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;
    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((element) => element.cat === selectedCat));
  });
};

displayProducts(data);
searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLocaleLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);
  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = `$ ${maxPrice}`;

  priceRange.addEventListener("input", (e) => {
    const range = e.target.value;
    priceValue.textContent = "$" + range;
    displayProducts(data.filter((item) => item.price <= range));
  });
};

setCategories();
setPrices();
