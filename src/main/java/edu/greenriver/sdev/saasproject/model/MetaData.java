package edu.greenriver.sdev.saasproject.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MetaData {
    public int bookRank;
    public int downloads;
    public String url;

    public int yearReleased;

    public MetaData(){
    }

    public MetaData(int bookRank, String url, int downloads, int yearReleased) {
        this.bookRank = bookRank;
        this.yearReleased = yearReleased;
        this.url = url;
        this.downloads = downloads;
    }

    public static MetaDataBuilder builder() {
        return new MetaDataBuilder();
    }

    public static class MetaDataBuilder {
        private int bookRank;
        private int downloads;
        private String url;
        private int yearReleased;

        MetaDataBuilder() {
        }

        public MetaDataBuilder bookRank(int bookRank) {
            this.bookRank = bookRank;
            return this;
        }

        public MetaDataBuilder downloads(int downloads) {
            this.downloads = downloads;
            return this;
        }

        public MetaDataBuilder url(String url) {
            this.url = url;
            return this;
        }

        public MetaDataBuilder yearReleased(int yearReleased) {
            this.yearReleased = yearReleased;
            return this;
        }

        public MetaData build() {
            return new MetaData(bookRank, downloads, url, yearReleased);
        }

        public String toString() {
            return "MetaData.MetaDataBuilder(bookRank=" + this.bookRank + ", downloads=" + this.downloads + ", url=" + this.url + ", yearReleased=" + this.yearReleased + ")";
        }
    }
}
