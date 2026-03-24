Bookify

A simple web application built using HTML, CSS, and JavaScript that allows users to search for books and save them to a personal library using the Google Books API.

Features
> Search books by title or author
> Display book details (title, author, cover, description)
> Add books to a personal library
> Store saved books using localStorage
> Remove books from the library
> Responsive basic UI

Tech Stack
> HTML
> CSS
> JavaScript (ES6)
> Google Books API

Project Structure
booknest/
│
├── index.html
├── style.css
├── script.js
└── README.md

Working
> User enters a search query
> Data is fetched from Google Books API
> Results are displayed on the screen
> Selected books can be saved in localStorage

API Used

Google Books API
https://www.googleapis.com/books/v1/volumes?q=search_term

How to Run
> Download or clone the project
> Open index.html in any browser

📌 Notes
Handles missing data (image/author)
Basic error handling included
No backend used


📄 License

This project is for educational purposes.
