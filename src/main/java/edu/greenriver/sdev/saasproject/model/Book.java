package edu.greenriver.sdev.saasproject.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Book {
    private double gunningFog;
    private String author;
    private String title;
    private String language;
    private int bookId;
    private MetaData metaData;

}
