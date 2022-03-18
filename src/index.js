import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import firebaseConfig from './env'

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// get collection data
getDocs(colRef)
  .then(snapshot => {
    let books = []
    console.log('snapshot docs', snapshot.docs)
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
  })
  .catch(err => {
    console.log(err)
  })


// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', e => {
  e.preventDefault()
  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value
  })
  .then(() => {
    addBookForm.reset()
  })
  .catch(err => {
    console.log(err)
  })
})

// deleting documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', e => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)
  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
  .catch(err => {
    console.log(err)
  })
})
