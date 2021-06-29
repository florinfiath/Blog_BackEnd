// CORS settings ( set the middleware)
exports.setCors = (req, res, next) => {
    //set the header according with CORS settings
    //allow frontend local host with port 3000 to access my backend
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  //defining the method posts which can be sent from frontend .
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  

  next();
};
