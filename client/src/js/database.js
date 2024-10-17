import { openDB } from 'idb'

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists')
        return
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true })
      console.log('jate database created')
    },
  })

// Function to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database')

  // Open the database
  const db = await openDB('jate', 1)

  // Create a new transaction
  const tx = db.transaction('jate', 'readwrite')

  // Get the object store
  const store = tx.objectStore('jate')

  // Add or update the content
  const request = store.put({ id: 1, content: content })

  // Get confirmation of the request
  const result = await request
  console.log('🚀 - data saved to the database', result)
}

// Function to get all content from the database
export const getDb = async () => {
  console.log('GET from the database')

  // Open the database
  const db = await openDB('jate', 1)

  // Create a new transaction
  const tx = db.transaction('jate', 'readonly')

  // Get the object store
  const store = tx.objectStore('jate')

  // Get the content with id 1 (since we are using id=1)
  const request = store.get(1)

  // Get confirmation of the request
  const result = await request
  console.log('🚀 - data retrieved from the database', result?.content)
  return result?.content
}

// Initialize the database
initdb()
