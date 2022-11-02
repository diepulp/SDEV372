package edu.greenriver.sdev.saasproject.controllers;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.model.MetaData;
import edu.greenriver.sdev.saasproject.services.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


/**
 * Controller responds to HTTP requests. @ResponseBody returns
 * data from each method
 * @version 1
 * @author  Vladimir Ivanov
 */
    // @Controller: to respond to HTTP requests
    // @ResponseBody: to return data from each method, not HTML page names
@RestController
@RequestMapping("api/v1/book")
public class WebApi {

    private BookService service;

    /**
     * Constructor for service bean
     * @param service  BookService object
     */
    public WebApi(BookService service){
        this.service = service;
    }

    /**
     * GET request to api/v1/book
     * @return ResponseEntity object
     */
    @GetMapping("")
    public ResponseEntity<List<Book>> getAllBooks(){
        if (service.allBooks().isEmpty()){
            return new ResponseEntity<>(service.allBooks(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.allBooks(), HttpStatus.OK);
    }

    /**
     * GET request to receive all the metadata
     * @return ResponseEntity object
     */
    @GetMapping("metadata")
    public ResponseEntity<List<MetaData>> getMeta(){
        if (service.getMeta().isEmpty()){
            return new ResponseEntity<>(service.getMeta(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.getMeta(), HttpStatus.OK);
    }


    /**
     * Updates metadata for a book with a given ID
     * @param bookId UUID unique id
     * @param metadata MetaData object
     * @return ResponseEntity object
     */
    @PutMapping("metadata/update/{id}")
    public ResponseEntity<Object> updateMeta(@PathVariable("id") UUID bookId, @RequestBody MetaData metadata){
        if (!service.idExists(bookId)){
            return  new ResponseEntity<>("The book is not found", HttpStatus.NOT_FOUND);
        } else {
            return  ResponseEntity.ok(service.updateMeta(metadata, bookId));
        }
    }

    /**
     * Add a book to a collection
     * @param tempBook Book object
     * @return ResponseEntity object
     */
    @PostMapping(
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE}
    )
    public ResponseEntity<Object> addBook(@RequestBody Book tempBook){
        if (tempBook.getTitle().isEmpty() || tempBook.getTitle() == null){
            return new ResponseEntity<>("The book title cannot be empty / null ", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(service.addBooks(tempBook), HttpStatus.CREATED);
    }

    /**
     * Update existing book author, title, gunning fog index
     * @param tempBook Book object
     * @return ResponseEntity object
     */
    @PutMapping("")
    public ResponseEntity<Object> editBook(@RequestBody Book tempBook){
        //make sure the id of the book is found
        if (!service.bookExists(tempBook))
        {
            return new ResponseEntity<>("The book does not exist!", HttpStatus.NOT_FOUND);
        }
        //don't add an empty book title
        else if (tempBook.getTitle() == null || tempBook.getTitle().isEmpty())
        {
            return new ResponseEntity<>("The book title cannot be empty/null", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(service.updateBook(tempBook), HttpStatus.OK);
    }

    /**
     * Delete a book from the collection
     * @param bookId UUID
     * @return ResponseEntity object
     */
    @DeleteMapping("delete-book/{bookId}")
    public ResponseEntity<Object> deleteBook(@PathVariable UUID bookId){
        if (!service.idExists(bookId)){
            return new ResponseEntity<>("The book could not be found in the collection", HttpStatus.NOT_FOUND);
        }
            service.deleteBook(bookId);
            return  ResponseEntity.noContent().build();
    }


    /**
     * Deletes metadata for a given book
     * @param uuid UUID object
     * @return ResponseEntity object
     */
    @DeleteMapping("metadata/delete/{uuid}")
    public ResponseEntity<Object> deleteMeta(@PathVariable UUID uuid){
        MetaData metaData = new MetaData();
        if (!service.idExists(uuid)){
            return  new ResponseEntity<>("The book is not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.updateMeta(metaData, uuid), HttpStatus.OK);
    }
}
