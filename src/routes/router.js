import {addNewContact} from '../controllers/controller'

const routes = (app) => {
  app.route(`/contact`)
        .get((req, res, next) => {
            // middleware
            console.log(`request from: ${req.originalURL}`)
            console.log(`Request type: ${req.method}`)
            next();
        }, (req,res,next) => {
            res.send("GET request successful!")
        })

        .post(addNewContact)

    app.route('/contact/:contactID')
        .put((req, res) => 
        res.send("PUT request successful!"))

        .delete((req, res) => 
        res.send("DELETE request successful!"));
    
};

export default routes;