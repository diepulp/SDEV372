package edu.greenriver.sdev.saasproject.services;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.model.MetaData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * The Service Layer provides business logic for the Controller
 * in the RESTful api architecture
 * @author Vladimir Ivanov
 * @version 1.0
 */
@Service
public class BookService {

    private List<Book> books = new ArrayList<>(List.of(
         Book.builder()
                 .author("Austen, Jane")
                 .title("Pride and Prejudice")
                 .language("En")
                 .gunningFog(9.0)
                 .bookId(1342)
                 .metaData(MetaData.builder().bookRank(5).build())
                 .build(),
        Book.builder()
                .title("Alice's Adventures in Wonderland")
                .language("En")
                .author("Lewis Carrol")
                .gunningFog(8.8)
                .bookId(11)
                .metaData(MetaData.builder().bookRank(3).build())
                .build()
            ));

    /**
     * Create
     * @param title Book title
     * @param metaData MetaData object to provide l information for the book
     * @return book object
     */
   
    public Book addBooks(String title, MetaData metaData){
        Book newBook =  Book.builder()
                .title(title)
                .metaData(metaData)
                .build();
        books.add(newBook);
        return newBook;
    }

    /**
     * Read
     * @return List of books requested by the GET method
     */
 
    public List<Book> allBooks(){
        return books;
    }

    /**
     * Update
     * @param bookId integer unique id
     * @param title String book title
     * @param author Author
     * @param index gunning fog index
     * @param metaData MetaData object
     * @return Book object
     */
    
    public Book updateBook(int bookId, String title, String author, int index, MetaData metaData){
        Optional<Book> bookFound = books.stream()
                .filter(book -> book.getBookId() == bookId)
                .findFirst();

        if (bookFound.isPresent()){
            Book book = bookFound.get();
            book.setAuthor(author);
            book.setTitle(title);
            book.setMetaData(metaData);
            return book;
        } else {
            return null;
        }
    }

    /**
     * Delete
     * @param bookId book unique identifier
     */
    public void deleteBook(int bookId){
        books = books.stream()
                .filter(book -> book.getBookId() != bookId)
                .toList();
    }

    /**
     * @param bookId book id
     * @return boolean
     */
    public boolean bookExists(int bookId) {
        return books.stream().anyMatch(book -> book.getBookId() == bookId);
    }

    public double getHighestIndex(){
        double index = books.stream().filter(book -> book.getGunningFog() <= 9.0).count();
        return index;
    }
}
