// Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks())

// Event: Search Books
document.querySelector('[search-input]').addEventListener('input', e => {
    UI.showSearchedBooks(e.target)
})

// Event: Add Book
document.querySelector('#add-book-btn').addEventListener('click', e => {
    // Prevent Actual Submit
    e.preventDefault()

    // Get form values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    // Validate the fields
    if(title === '' || author === '' || isbn === '') {
        UI.showAlerts('Please Fill in all the fields', 'alert-danger')
    } else {

        // Create book object
        const book = new Book(title, author, isbn)

        // Verify if the isbn already exists
        if(Store.checkIsbn(book.isbn)) {

            // Add the new Book to UI
            UI.addBookToList(book)

            // Add the book to the store
            Store.addBook(book)

            // Show success message
            UI.showAlerts('Book Added with success!', 'alert-success')

            // Clear fields
            UI.clearFields()
        } 
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')
        }
    }
})

// Event: Remove or Edit a Book
document.querySelector('#book-list').addEventListener('click', e => {
    
    // Verify if the target is the delete button
    if(e.target.title === 'Delete') {
        // Remove Book from UI
        UI.deleteBook(e.target)

        // Remove Book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show success message
        UI.showAlerts('Book Removed with success!', 'alert-success')
    }
    //Verify if the target is the edit button
    else if(e.target.title === 'Edit') {
        // Show the modal
        UI.showModal('.modal-container')
        // Change the modal title
        document.querySelector('[modal-title]').innerHTML = 'Edit Book'
        // Open the modal for editing the book
        UI.editBook(e.target)
    }

})

//Event: Save edited Book
document.querySelector('.modal-actions .save').addEventListener('click', e => {
    const modalForm = document.querySelector('.modal-form')

    if(modalForm.title.value === '' || modalForm.author.value === '' || modalForm.isbn.value === '') {
        UI.showAlerts('Please Fill in all the fields', 'alert-danger')
    } 
    else {
        const list = Store.getBooks()
        const tds = UI.findTdsText()

        // Verify if the isbn of the book already exists or it's did not has changed
        if(Store.checkIsbn(modalForm.isbn.value) || tds[2] === modalForm.isbn.value) {

            // Find the index of the edited book
            const i = Store.findBookIndex(tds[2])

            // Changing the book attributes the new ones
            UI.changeBookAttributes(list[i], modalForm)

            // Re posting the book on the Storage
            Store.rePostBooks(list)

             // Re display the books, close the modal and show success message
            UI.reDisplayBooks()
            UI.closeModal('.modal-container')
            UI.showAlerts('Book edited with success!', 'alert-success')
        }
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')

        }
    }
})

//Event: Cancel Edited Book
document.querySelector('.modal-actions .cancel').addEventListener('click', () => UI.closeModal('.modal-container'))

// Event: Close modal
document.querySelector('.modal-container').addEventListener('click', e => {

    // Verify if the target is the modal container
    if(e.target.className === "modal-container") {
        UI.closeModal('.modal-container')
    } 

})
