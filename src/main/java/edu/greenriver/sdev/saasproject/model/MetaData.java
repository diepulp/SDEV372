package edu.greenriver.sdev.saasproject.model;

import lombok.*;

@Data
@AllArgsConstructor
@Builder
public class MetaData {
    private int bookRank;
    private int downloads;
    private String url;

    private double gunningFog;
    private int yearReleased;

    public MetaData(){
    }

    public MetaData(int bookRank, String url, int downloads, int yearReleased) {
        this.bookRank = bookRank;
        this.yearReleased = yearReleased;
        this.url = url;
        this.downloads = downloads;
    }
}
