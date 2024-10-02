/* eslint-disable */
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })
admin.initializeApp()

exports.countBooks = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()
      const count = snapshot.size
      res.status(200).send({ count })
    } catch (error) {
      console.error('Error counting books:', error.message)
      res.status(500).send('Error counting books')
    }
  })
})

exports.addBook = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      // Check if the request method is POST
      if (req.method !== 'POST') {
        return res.status(400).send('Please send a POST request')
      }

      // Check if request body exists and has required fields
      const { isbn, name } = req.body
      if (!isbn || !name) {
        return res.status(400).send('Both ISBN and name are required')
      }

      // Capitalize the name (ISBN typically should remain as is)
      const bookData = {
        isbn: isbn,
        name: name.toUpperCase()
      }

      // Add the book to Firestore
      const booksCollection = admin.firestore().collection('books')
      const newBookRef = await booksCollection.add(bookData)

      res.status(200).send({
        message: 'Book added successfully',
        bookId: newBookRef.id,
        data: bookData
      })
    } catch (error) {
      console.error('Error adding book:', error.message)
      res.status(500).send('Error adding book')
    }
  })
})

exports.getAllBooks = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection('books')
      const snapshot = await booksCollection.get()

      const books = []
      snapshot.forEach((doc) => {
        // Extract only isbn and name from each document
        const { isbn, name } = doc.data()
        books.push({ isbn, name })
      })

      res.status(200).send(books)
    } catch (error) {
      console.error('Error fetching books:', error)
      res.status(500).send('Error fetching books')
    }
  })
})
