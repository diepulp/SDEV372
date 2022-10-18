package edu.greenriver.sdev.saasproject.controllers;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.model.MetaData;
import edu.greenriver.sdev.saasproject.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity< List<Book>> getAllBooks(){
        return new ResponseEntity<>(service.allBooks(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Object> addBook(@RequestBody Book tempBook){
        if (tempBook.getTitle().isEmpty() || tempBook.getTitle() == null){
            return new ResponseEntity<>("The book title cannot be empty / null ", HttpStatus.BAD_REQUEST);
        }
        return
                new ResponseEntity<>(service.addBooks(tempBook.getTitle(), tempBook.getMetaData()
                ), HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<Object> editBook(@RequestBody Book tempBook){
        //make sure the id of the joke is found
        if (!service.bookExists(tempBook.getBookId()))
        {
            return new ResponseEntity<>("The book does not exist!", HttpStatus.NOT_FOUND);
        }
        //don't add an empty joke
        else if (tempBook.getTitle() == null || tempBook.getTitle().isEmpty())
        {
            return new ResponseEntity<>("The book title cannot be empty/null", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(service.updateBook(
                tempBook.getBookId(), tempBook.getTitle(), tempBook.getAuthor(), (int) tempBook.getGunningFog(), tempBook.getMetaData()), HttpStatus.OK);
    }

    @DeleteMapping("")
    public void deleteBook(@RequestBody Book tempBook){
        service.deleteBook(tempBook.getBookId());
    }

    @RequestMapping("home")
    public String getHighestIndex(Model model){
        model.addAttribute("highestIndex", service.getHighestIndex());
        return "home";
    }
}
