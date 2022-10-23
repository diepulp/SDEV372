package edu.greenriver.sdev.saasproject.services;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.model.MetaData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * The Service Layer provides business logic for the Controller
 * in the RESTful api architecture
 * @author Vladimir Ivanov
 * @version 1.0
 */
@Service
public class BookService {
  private List<Book> books = new ArrayList<>(List.of(
//         Book.builder()
//                 .author("Austen, Jane")
//                 .title("Pride and Prejudice")
//                 .language("En")
//                 .gunningFog(9.0)
//                 .bookId()
//                 .metaData(MetaData.builder().bookRank(5).build())
//                 .build(),
//        Book.builder()
//                .title("Alice's Adventures in Wonderland")
//                .language("En")
//                .author("Lewis Carrol")
//                .gunningFog(8.8)
//                .bookId()
//                .metaData(MetaData.builder().bookRank(3).build())
//                .build()
            ));

    /**
     * Create
     * @param tempBook Book object
     *
     * @return book object
     */
   
    public Book addBooks(Book tempBook){
         tempBook =  Book.builder()
                .title(tempBook.getTitle())
                 .author(tempBook.getAuthor())
                .bookId()
                .metaData(tempBook.getMetaData())
                .build();
        books.add(tempBook);
        return tempBook;
    }

    /**
     * Updates metadata for a book that matches a unique id
     * @param metaData MetaData object
     * @param uuid UUID object
     * @return Book object
     */
    public Book updateMeta(MetaData metaData, UUID uuid){
        Optional<Book> bookFound = books.stream()
                .filter(book -> book.getBookId().equals(uuid))
                .findFirst();
        if (bookFound.isPresent()){
            Book book = bookFound.get();
            book.setMetaData(metaData);
            addBooks(book);
             return book;
        } else {
            return null;
        }
    }

    /**
     * Read
     * @return List of books requested by the GET method
     */
    public List<Book> allBooks(){
        return books;
    }

    /**
     * The method returns all metadata from the book collection
     * @return List of MetaData objects
     */
    public List<MetaData> getMeta(){
        return books.stream()
                .map(Book::getMetaData)
                .toList();
    }

    /**
     * Update a book in the collection that matches an id provided
     * @param tempBook Book object
     * @return Book object
     */
    public Book updateBook(Book tempBook){
        Optional<Book> bookFound = books.stream()
                .filter(book -> book.getBookId().equals(tempBook.getBookId()))
                .findFirst();

        if (bookFound.isPresent()){
            Book book = bookFound.get();
            book.setAuthor(tempBook.getAuthor());
            book.setTitle(tempBook.getTitle());
            book.setGunningFog(tempBook.getGunningFog());
            book.setMetaData(tempBook.getMetaData());
            return book;
        } else {
            return null;
        }
    }

    /**
     * Delete a record from the library
     * @param bookId book unique identifier
     */
    public void deleteBook(UUID bookId){
        books = books.stream()
                .filter(book -> !book.getBookId().equals(bookId))
                .toList();
    }

    /**
     * @param tempBook  Book object to provide the unique ID
     * @return boolean
     */
    public boolean bookExists(Book tempBook) {
        return books.stream().anyMatch(book -> book.getBookId().equals(tempBook.getBookId()));
    }

    /**
     * A helper method to verify if the id exists
     * @param id UUID object
     * @return boolean value
     */
    public boolean idExists(UUID id){
        return books.stream().anyMatch(book -> book.getBookId().equals(id));
    }

    public double getHighestIndex(){
        //TODO: use reduce
        double index = books.stream().filter(book -> book.getGunningFog() <= 9.0).count();
        return index;
    }
}
