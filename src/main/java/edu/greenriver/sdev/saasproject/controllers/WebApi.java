package edu.greenriver.sdev.saasproject.controllers;

import edu.greenriver.sdev.saasproject.model.Book;
import edu.greenriver.sdev.saasproject.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("")
    public ResponseEntity< List<Book>> getAllBooks(){
        return new ResponseEntity<>(service.allBooks(), HttpStatus.OK);
    }
}
