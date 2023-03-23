package com.example.piattaforme_progetto.controller.rest;

import com.example.piattaforme_progetto.Repository.ImageRepository;
import com.example.piattaforme_progetto.entity.ImageModel;
import com.example.piattaforme_progetto.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@RequestMapping("/image")

@CrossOrigin("*")
public class ImageController {
    @Autowired
    ImageRepository imageRepository;
    @CrossOrigin("*")


    /*
    The "uploadImage" function is designed to handle the upload of an image when an administrator adds a new product.
    Its primary goal is to acquire the image and compress it. Additionally, the function performs a check to verify if
    the image already exists in the system, and in the event that it does, it raises an exception to prevent the insertion of duplicate images.
     */
    @PostMapping("/upload")
    public ResponseEntity.BodyBuilder uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        ImageModel img = new ImageModel(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));
        if(imageRepository.findByName(file.getOriginalFilename())==null) {
            imageRepository.save(img);
        }else{
            System.out.println("immagine gia presente");
        }
        return ResponseEntity.status(HttpStatus.OK);
    }


    /*
    The "getImage" function is designed to retrieve an image when a user views the details of a specific product (expands),
    by reading the image data from the database and decompressing it.
     */
    @GetMapping(path = { "/get/{imageName}" })
    public ImageModel getImage(@PathVariable("imageName") String imageName) throws IOException {
        final ImageModel retrievedImage = imageRepository.findByName(imageName);
        ImageModel img = new ImageModel(retrievedImage.getName(), retrievedImage.getType(),
                decompressBytes(retrievedImage.getPicbyte()));

        return img;
    }

    @DeleteMapping("/delete/{name}")
    public ResponseEntity<?> delete(@PathVariable("name") String name) {
        ImageModel im = imageRepository.findByName(name);
        imageRepository.delete(im);
        System.out.println("immagine eliminata");
        return new ResponseEntity("fatto", HttpStatus.OK);
    }

    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }


}
