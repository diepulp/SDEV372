package edu.greenriver.sdev.saasproject.bootstrap;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.File;

@Data

public class CsvConverter {
    private File file;
    public CsvConverter(File file){
        this.file = file;
    }

}
