var express = require("express");
var app = express();
var port = 3000;
var Bing = require("node-bing-api")({ accKey: "89c7f3c8c03041688156279e22016583" });
var path = require("path");

app.use(express.static(path.join(__dirname, "views")));


app.get("/", (req, res) => {
  
});


app.get("/api/imagesearch/:search*", (req, res) => {
  var query = req.query.offset;
  var search = req.params.search;
  
  Bing.images(search, {
  count: 10,   // Number of results (max 50) 
  offset: query    // Skip first 3 result 
  }, function(error, rez, body){
    var response = [];
    
    for(var i=0; i<body.value.length; i++) {
      response.push({
        url: body.value[i].webSearchUrl,
        snippet: body.value[i].name,
        thumbnail: body.value[i].thumbnailUrl,
        context: body.value[i].contentUrl
      });
    };    
    res.json(response);
  });
});




app.listen(port, function() {
  console.log("[SERVER] Server running at port " + port);
})

