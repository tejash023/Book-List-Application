class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {

  //Adding books to list
  addBookToList(book){
    const list = document.getElementById('book-list');

    //create tr element
    const row = document.createElement('tr');
    
    //Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td>
    `;
  
    //append the child
    list.appendChild(row);
  }

  //show Alert
  showAlert(message, className) {
    //create div
    const div = document.createElement('div');

    //add classes
    div.className = `alert ${className}`;

    //addText
    div.appendChild(document.createTextNode(message));

    //get parent
    const container = document.querySelector('.container');

    //get form
    const form = document.querySelector("#book-form");

    //Insert Alert
    container.insertBefore(div, form);

    //timeout after 3 sec
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },1500);
  }

  //remove books
  removeBooks(target){
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(book){
    document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  }
}


//Local Storage class
class Store {
  
}

//Event Listener for adding book
document.getElementById('book-form').addEventListener('submit',
  function(e){

    //get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value
    
    //Instatiate the book
    const book = new Book(title, author, isbn);
    

    //Instantiate UI
    const ui = new UI();

    //validation
    if(title === '' || author === '' || isbn === ''){
      //Error alert
      ui.showAlert('Please fill the details','error');
    }else{
      //add book to list
      ui.addBookToList(book);

      //show success
      ui.showAlert('Book added successfully!','success');

      //clear fields
      ui.clearFields(book);
    }
    

 

    e.preventDefault();
  });


  //Event Listener for remving book
  document.getElementById('book-list').addEventListener('click',
  function(e){

    //Instantiate UI
    const ui = new UI();

    //Delete book
    ui.removeBooks(e.target);

    //show alert
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
  });
