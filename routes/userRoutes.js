module.exports = function(app) {
    app.get("/test", function(req, res) {
      return res.json({test: "success"});
    });
  
  
    app.post("/signup", async function(req, res) {
      // Once the Model User Schema is created, we can require it for this to work.
      // Code will then need to be uncommented out
  
  /* ------------------------ uncomment code below this ----------------------- */
  
      // const user = new User(req.body);
      
      try {
        // await user.save()
  
        res.status(201).send({
          user: "Delete this line and uncomment out line below it once model is in place"
          // user
        })
      } catch(e) {
        res.status(400).send(e)
      } 
    })

    app.post("/signin", async function(req, res) {
        try {
            console.log('try block')
        } catch {
            console.log('catch block')
        }
    })

    app.post("/signout", async function(req, res) {
        try {
            console.log('try block')
        } catch {
            console.log('catch block')
        }
    })
  
  };