package edu.greenriver.sdev.saasproject.model;

import lombok.Builder;

@Builder
public class Book {
    private double gunningFog;

    public Book(double gunningFog, String author, String title, String language, int bookId, MetaData metaData) {
        this.gunningFog = gunningFog;
        this.author = author;
        this.title = title;
        this.language = language;
        this.bookId = bookId;
        this.metaData = metaData;
    }

    public Book() {
    }

    public MetaData getMetaData() {
        return metaData;
    }

    public void setMetaData(MetaData metaData) {
        this.metaData = metaData;
    }

    private String author;
    private String title;
    private String language;
    private int bookId;
    private MetaData metaData;

    public double getGunningFog() {
        return this.gunningFog;
    }

    public String getAuthor() {
        return this.author;
    }

    public String getTitle() {
        return this.title;
    }

    public String getLanguage() {
        return this.language;
    }

    public int getBookId() {
        return this.bookId;
    }

    public void setGunningFog(double gunningFog) {
        this.gunningFog = gunningFog;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public boolean equals(final Object o) {
        if (o == this) return true;
        if (!(o instanceof Book)) return false;
        final Book other = (Book) o;
        if (!other.canEqual((Object) this)) return false;
        if (Double.compare(this.getGunningFog(), other.getGunningFog()) != 0) return false;
        final Object this$author = this.getAuthor();
        final Object other$author = other.getAuthor();
        if (this$author == null ? other$author != null : !this$author.equals(other$author)) return false;
        final Object this$title = this.getTitle();
        final Object other$title = other.getTitle();
        if (this$title == null ? other$title != null : !this$title.equals(other$title)) return false;
        final Object this$language = this.getLanguage();
        final Object other$language = other.getLanguage();
        if (this$language == null ? other$language != null : !this$language.equals(other$language)) return false;
        if (this.getBookId() != other.getBookId()) return false;
        return true;
    }

    protected boolean canEqual(final Object other) {
        return other instanceof Book;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        final long $gunningFog = Double.doubleToLongBits(this.getGunningFog());
        result = result * PRIME + (int) ($gunningFog >>> 32 ^ $gunningFog);
        final Object $author = this.getAuthor();
        result = result * PRIME + ($author == null ? 43 : $author.hashCode());
        final Object $title = this.getTitle();
        result = result * PRIME + ($title == null ? 43 : $title.hashCode());
        final Object $language = this.getLanguage();
        result = result * PRIME + ($language == null ? 43 : $language.hashCode());
        result = result * PRIME + this.getBookId();
        return result;
    }

    public String toString() {
        return "Book(gunningFog=" + this.getGunningFog() + ", author=" + this.getAuthor() + ", title=" + this.getTitle() + ", language=" + this.getLanguage() + ", bookId=" + this.getBookId() + ")";
    }
}
