package edu.greenriver.sdev.saasproject.model;

import lombok.Data;

import java.util.UUID;

@Data
public class Book {
    private double gunningFog;
    private String author;
    private String title;
    private String language;
    private UUID bookId;
    private MetaData metaData;

    public Book(double gunningFog, String author, String title, String language, MetaData metaData) {
        this.gunningFog = gunningFog;
        this.author = author;
        this.title = title;
        this.language = language;
        bookId = UUID.randomUUID();
        this.metaData = metaData;
    }

    public Book() {
    }

    public static BookBuilder builder() {
        return new BookBuilder();
    }

    public static class BookBuilder {
        private double gunningFog;
        private String author;
        private String title;
        private String language;
        private UUID bookId;
        private MetaData metaData;

        BookBuilder() {
        }

        public BookBuilder gunningFog(double gunningFog) {
            this.gunningFog = gunningFog;
            return this;
        }

        public BookBuilder author(String author) {
            this.author = author;
            return this;
        }

        public BookBuilder title(String title) {
            this.title = title;
            return this;
        }

        public BookBuilder language(String language) {
            this.language = language;
            return this;
        }

        public BookBuilder bookId() {
            bookId = UUID.randomUUID();
            return this;
        }

        public BookBuilder metaData(MetaData metaData) {
            this.metaData = metaData;
            return this;
        }

        public Book build() {
            return new Book(gunningFog, author, title, language, metaData);
        }

        public String toString() {
            return "Book.BookBuilder(gunningFog=" + this.gunningFog + ", author=" + this.author + ", title=" + this.title + ", language=" + this.language + ", bookId=" + this.bookId + ", metaData=" + this.metaData + ")";
        }
    }
}
