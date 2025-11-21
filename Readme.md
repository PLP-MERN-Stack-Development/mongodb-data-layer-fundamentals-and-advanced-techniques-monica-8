# 🗄️ Week 1: MongoDB Bookstore Data Layer

This repository contains the solution for the MongoDB Week 1 assignment, focusing on data layer fundamentals, CRUD operations, aggregation, and indexing.

## 📁 Repository Contents

* `insert_books.js`: Contains the MongoDB script to create the `plp_bookstore` database, the `books` collection, and insert 10 sample book documents.
* `queries.js`: Contains all MongoDB Shell (`mongosh`) commands for Tasks 2, 3, 4, and 5, demonstrating CRUD, Advanced Queries, Aggregation, and Indexing.
* `README.md`: This file.
* `screenshot.png`: A screenshot confirming the database and collection structure (Task 1).

## 🚀 How to Run the Scripts

### Prerequisites

1.  A running MongoDB instance (Local or MongoDB Atlas).
2.  The MongoDB Shell (`mongosh`) installed and accessible in your terminal.
3.  A user created with `readWrite` access to the `plp_bookstore` database (e.g., `monicaw9114_db_user`).

### Data Population (Task 1)

To populate the database with the initial data, run the `insert_books.js` file from your terminal.

**If using a local MongoDB instance:**
```bash
mongosh --file insert_books.js
