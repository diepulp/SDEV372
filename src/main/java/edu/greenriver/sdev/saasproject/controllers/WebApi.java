package edu.greenriver.sdev.saasproject.controllers;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.model.MetaData;
import edu.greenriver.sdev.saasproject.services.BookService;
import org.springframework.core.io.support.ResourcePropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import static org.springframework.http.ResponseEntity.notFound;

/**
 * Controller responds to HTTP requests. @ResponseBody returns
 * data from each method
 * @version 1
 * @authur Vladimir Ivanov
 */
    // @Controller: to respond to HTTP requests
    // @ResponseBody: to return data from each method, not HTML page names
@RestController
@RequestMapping("api/v1/book")
public class WebApi {
    private BookService service;


    public WebApi(BookService service){
        this.service = service;
    }
    //GET request to http://localhost:8080/api/v1/book
    @GetMapping("")
    public ResponseEntity<List<Book>> getAllBooks(){
        if (service.allBooks().isEmpty()){
            return new ResponseEntity<>(service.allBooks(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(service.allBooks(), HttpStatus.OK);
    }

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
     * @return
     */
    @PutMapping("metadata/update/{id}")
    public ResponseEntity<Object> updateMeta(@PathVariable("id") UUID bookId, @RequestBody MetaData metadata){
        if (!service.idExists(bookId)){
            return  new ResponseEntity<>("The book is not found", HttpStatus.NOT_FOUND);
        } else {
            return  ResponseEntity.ok(service.updateMeta(metadata, bookId));
        }
    }
    @PostMapping("")
    public ResponseEntity<Object> addBook(@RequestBody Book tempBook){
        if (tempBook.getTitle().isEmpty() || tempBook.getTitle() == null){
            return new ResponseEntity<>("The book title cannot be empty / null ", HttpStatus.BAD_REQUEST);
        }
        return
                new ResponseEntity<>(service.addBooks(tempBook
                ), HttpStatus.CREATED);
    }

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

        return new ResponseEntity<>(service.updateBook(
                                    tempBook), HttpStatus.OK);
    }

    /**
     * Delete a book from the collection
     * @param tempBook UUID book id
     */
    @DeleteMapping("")
    public ResponseEntity<Object> deleteBook(@RequestBody Book tempBook){
        if (!service.bookExists(tempBook)){
            return new ResponseEntity<>("The book could not be found in the collection", HttpStatus.NOT_FOUND);
        } else if (!service.idExists(tempBook.getBookId())){
            return new ResponseEntity<>("Please type the correct id", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("The book was successfully deleted", HttpStatus.OK);
    }


    /**
     * Deletes metadata for a given book
     * @param id UUID object
     * @return
     */
    @DeleteMapping("metadata/delete/{id}")
    public ResponseEntity<Object> deleteMeta(@PathVariable UUID id){
        MetaData metaData = new MetaData();
        if (!service.idExists(id)){
            return  new ResponseEntity<>("The book is not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>("The metadata was successfully deleted", HttpStatus.OK);

    }

    @RequestMapping("home")
    public String getHighestIndex(Model model){
        model.addAttribute("highestIndex", service.getHighestIndex());
        return "home";
    }
}
