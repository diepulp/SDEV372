package edu.greenriver.sdev.saasproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * Application main
 */
@SpringBootApplication
public class SaasProjectApplication {

    public static void main(String[] args) {
        Scanner scanner;

        SpringApplication.run(SaasProjectApplication.class, args);
//        {
//            try {
//                scanner = new Scanner(new File("src/main/java/prog_book/prog_book.csv"));
//                scanner.useDelimiter(",");
//                while(scanner.hasNext()){
//                    System.out.println(scanner.next());
//                }
//            } catch (FileNotFoundException e) {
//                throw new RuntimeException(e);
//            }
//        }
        //get api from the system environment variables
//        System.out.println(System.getenv("GOOGLE_BOOK_API"));
    }
}
