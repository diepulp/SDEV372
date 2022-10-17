package edu.greenriver.sdev.saasproject.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MetaData {
    private int bookRank;
    private int downloads;
    private String url;

    public MetaData(int rank){
        this.bookRank = rank;
    }
}
