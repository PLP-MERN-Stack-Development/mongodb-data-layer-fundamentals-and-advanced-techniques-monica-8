// Switch to the correct database context
use plp_bookstore

// --- Task 2: Basic CRUD Operations ---

// 1. Find all books in a specific genre (Read)
db.books.find({ genre: "Fantasy" })

// 2. Find books published after a certain year (Read)
db.books.find({ published_year: { $gt: 2000 } })

// 3. Find books by a specific author (Read)
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book (Update)
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 16.99 } }
)

// 5. Delete a book by its title (Delete)
db.books.deleteOne(
  { title: "A Brief History of Time" }
)

// --- Task 3: Advanced Queries ---

// 1. Find books that are both in stock AND published after 2010 (Combined Filtering)
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2. Use projection to return only the title, author, and price fields
db.books.find(
  { genre: "Science Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3. Implement sorting to display books by price (ascending and descending)
db.books.find().sort({ price: 1 })  // Ascending
db.books.find().sort({ price: -1 }) // Descending

// 4. Use limit and skip methods to implement pagination (Page 2)
db.books.find().limit(5).skip(5)

// --- Task 4: Aggregation Pipeline ---

// 1. Calculate the average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" },
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { average_price: -1 }
  }
])

// 2. Find the author with the most books in the collection
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      book_count: { $sum: 1 }
    }
  },
  {
    $sort: { book_count: -1 }
  },
  {
    $limit: 1
  }
])

// 3. Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $project: {
      publication_decade: {
        $multiply: [
          10,
          { $floor: { $divide: ["$published_year", 10] } }
        ]
      }
    }
  },
  {
    $group: {
      _id: "$publication_decade",
      count: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])

// --- Task 5: Indexing ---

// 1. Create an index on the 'title' field
db.books.createIndex({ title: 1 })

// 2. Create a compound index on 'author' and 'published_year'
db.books.createIndex({ author: 1, published_year: -1 })

// 3. Use the explain() method to demonstrate the performance improvement

// Query using the single-field 'title' index (Expects IXSCAN)
db.books.find({ title: "Dune" }).explain("executionStats")

// Query using the compound index prefix 'author' (Expects IXSCAN)
db.books.find({ author: "Frank Herbert" }).explain("executionStats")
