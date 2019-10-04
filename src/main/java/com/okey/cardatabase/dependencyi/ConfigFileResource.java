package com.okey.cardatabase.dependencyi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;

@Configuration
public class ConfigFileResource {

    @Bean(name = "configFile")
    public File configFile() {
        File configFile = new File("configFile.xml");
        return configFile;
    }
}
