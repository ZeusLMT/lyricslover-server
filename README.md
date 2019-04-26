# LYRICS LOVER - _server_
 A NodeJS server that organizes songs lyrics by albums title and artist name and allows user to browse through saved lyrics.
 
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
   
   
   
   
   
  
   
   

