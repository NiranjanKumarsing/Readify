let c = document.getElementById("c"),
  i = document.getElementById("i"),
  b = document.getElementById("b");

let f1 = document.getElementById("f1"),
  r1 = document.getElementById("r1"),
  s1 = document.getElementById("s1"),
  cat = document.getElementById("cat");

let favToggle = document.getElementById("favToggle"),
  homeBtn = document.getElementById("homeBtn");

let msg = document.getElementById("msg");

let state = {
  query: "bestseller books",
  category: "all",
  filter: "all",
  rating: "all",
  sort: "none",
};

let store = [];
let fav = JSON.parse(localStorage.getItem("fav")) || [];
let showFav = false;

function fetchBooks() {
  let q = state.category !== "all" ? state.category + " books" : state.query;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}&maxResults=30`)
    .then((r) => r.json())
    .then((x) => {
      store = x.items || [];
      apply();
    });
}

function apply() {
  let arr = showFav ? store.filter((x) => fav.includes(x.id)) : [...store];

  if (state.filter === "free")
    arr = arr.filter((x) => x.saleInfo?.saleability === "FREE");

  if (state.filter === "paid")
    arr = arr.filter((x) => x.saleInfo?.saleability === "FOR_SALE");

  if (state.rating !== "all")
    arr = arr.filter((x) => (x.volumeInfo?.averageRating || 0) >= state.rating);

  if (state.sort === "az")
    arr.sort((a, b) => a.volumeInfo.title.localeCompare(b.volumeInfo.title));

  if (state.sort === "za")
    arr.sort((a, b) => b.volumeInfo.title.localeCompare(a.volumeInfo.title));

  render(arr);
}

function render(arr) {
  c.innerHTML = "";

  if (arr.length === 0) {
    msg.innerHTML = showFav ? "💔 No favourites" : "📭 No results";
    return;
  }

  msg.innerHTML = showFav ? "❤️ Showing Favorites" : "";

  arr.forEach((bk) => {
    let info = bk.volumeInfo || {};
    let img =
      info.imageLinks?.thumbnail || "https://via.placeholder.com/150x200";

    let title = info.title || "No Title";
    let author = info.authors ? info.authors.join(", ") : "Unknown";

    let price = bk.saleInfo?.listPrice?.amount;
    let priceText = price ? "₹" + price : "Free";

    let d = document.createElement("div");
    d.className = "b";

    let heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = fav.includes(bk.id) ? "❤" : "♡";
    if (fav.includes(bk.id)) heart.classList.add("pink");

    heart.onclick = () => {
      if (fav.includes(bk.id)) {
        fav = fav.filter((x) => x !== bk.id);
      } else {
        fav.push(bk.id);
      }
      localStorage.setItem("fav", JSON.stringify(fav));
      apply();
    };

    d.innerHTML = `
<img src="${img}">
<h4>${title.slice(0, 40)}</h4>
<p>${author.slice(0, 30)}</p>
<p class="price">${priceText}</p>
`;

    d.appendChild(heart);
    c.appendChild(d);
  });
}

b.onclick = () => {
  state.query = i.value || "bestseller books";
  showFav = false;
  fetchBooks();
};

cat.onchange = () => {
  state.category = cat.value;
  fetchBooks();
};

f1.onchange = () => {
  state.filter = f1.value;
  apply();
};

r1.onchange = () => {
  state.rating = r1.value;
  apply();
};

s1.onchange = () => {
  state.sort = s1.value;
  apply();
};

favToggle.onclick = () => {
  showFav = true;
  apply();
};

homeBtn.onclick = () => {
  showFav = false;
  fetchBooks();
};

function goHome() {
  showFav = false;
  state.query = "bestseller books";
  fetchBooks();
}

fetchBooks();
