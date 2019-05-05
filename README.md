# LYRICS LOVER - _server_
 A NodeJS server that organizes songs lyrics by albums title and artist name and allows user to browse through saved lyrics.
 
   ## Specification
   This server includes the use of the following languages and libraries:
   - Node.js and MongoDB
   - Body-parser, dotenv, express, fs, helmet, moment, mongoose, multer, sharp, uuid
   
   ## Funtionalities
   - Create and receive songs, artist and albums
   - Edit details for songs, artists and albums
   - Delete songs, artist and albums by their IDs
   - Album upload with artwork
   - Resize artwork for optimization
   - Populate relevant fields when GET
   - Sort results alphabetically when GET
   - Automatically keep record of update time
   
   ## Status codes:
   - 200: Request success
   - 201: Create successful
   - 400: Bad request
   - 500: Internal error

   ## List of APIs used
   **Song API**
   
     `'/song' - GET` get all songs
   
     `'/song' - POST` add new song
      
   <br/>
   
     `'/song/search' - GET` get songs by query
      
   <br/>
   
     `'/song/:id' - GET` get specific song by ID
   
     `'/song/:id' - PATCH` update song details by ID
   
     `'/song/:id' - DELETE` delete song by ID
      
   <br/>
   <br/>
   
   **Artist API**
   
     `'/artist' - GET` get all artists
   
     `'/artist' - POST` add new artist
      
   <br/>
   
     `'/artist/:id' - GET` get specific artist by ID
      
   <br/>
   <br/>
   
   **Album API**
   
     `'/album' - GET` get all albums
   
     `'/album' - POST` add new album
   
   <br/>
   
     `'/album/search' - GET` get albums by query
     
   <br/>
   
     `'/album/:id' - GET` get specific album by ID
   
     `'/album/:id' - PATCH` update album by ID
   
     `'/album/:id' - DELETE` delete album by ID
   
   <br/>
   
     `'/album/:id/artwork' - GET` get the path to the album artwork
   
   
   
   
   
  
   
   

