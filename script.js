let c = document.getElementById("c");
let i = document.getElementById("i");
let b = document.getElementById("b");
let l = document.getElementById("l");
let d = "bestseller books";

function f(q) {
  c.innerHTML = "loading...";
  fetch("https://www.googleapis.com/books/v1/volumes?q=" + q)
    .then(res => res.json())
    .then(data => {
      if (!data.items) {
        c.innerHTML = "no results";
        return;
      }
      s(data.items);
    })
    .catch(() => {
      c.innerHTML = "error";
    });
}

function s(arr) {
  c.innerHTML = "";

  arr.map(book => {
    let info = book.volumeInfo || {};

    let t = info.title || "no title";
    if (t.length > 40) t = t.slice(0, 40) + "...";

    let a = info.authors ? info.authors.join(", ") : "no author";
    if (a.length > 30) a = a.slice(0, 30) + "...";

    let img = "";
    if (info.imageLinks && info.imageLinks.thumbnail) {
      img = info.imageLinks.thumbnail;
    }

    let div = document.createElement("div");
    div.className = "b";

    div.innerHTML =
      '<img src="' + img + '">' +
      '<h4>' + t + '</h4>' +
      '<p>' + a + '</p>';

    c.appendChild(div);
  });
}

b.onclick = function () {
  let q = i.value.trim();

  if (q === "") {
    d = "bestseller books";
  } else {
    d = q;
  }

  f(d);
};

window.addEventListener("DOMContentLoaded", function () {
  f(d);
});

i.oninput = function () {
  if (i.value.trim() === "") {
    d = "bestseller books";
    f(d);
  }
};

l.onclick = function () {
  i.value = "";
  d = "bestseller books";
  f(d);
};