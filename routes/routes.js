const User = require("../models/user");

module.exports = function (app) {
  app.get("/test", function (req, res) {
    return res.json({ test: "success" });
  });


  app.post("/signup", async function (req, res) {
    // Once the Model User Schema is created, we can require it for this to work.
    // Code will then need to be uncommented out

    /* ------------------------ uncomment code below this ----------------------- */

    const user = new User(req.body);

    // const user = new User(req.body);

    // console.log(req)
    
    try {
      await user.save()

      res.status(201).send({
        user
      })
    } catch (e) {
      res.status(400).send(e)
    }
  })

  //this is a dummy route.  Feel free to change or replace this as needed.
  app.post("/search-req", async function (req,res){

    console.log(req.body)
  });

};




