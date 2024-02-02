//controllers
const authController = require('../app/http/controllers/authController') 
const eventController = require('../app/http/controllers/eventController');
const userController =require('../app/http/controllers/userController')

function initRoutes(app) {

    //authentication
    app.post('/api/login', authController().postLogin)
    app.post('/api/register', authController().postRegister)

    //events controlers
    app.get('/api/getEvents',eventController().getEvents)
    app.get('/api/getEventDetails/:eventId', eventController().getEventDetails);
    app.post('/api/createevent',eventController().createEvent)
    app.put('/api/updateEvent/:eventId', eventController().updateEvent);
    app.delete('/api/deleteEvent/:eventId', eventController().deleteEvent);

    //usersDetails
    app.get('/api/users',userController().getUsers)
    app.get('/api/getOrganizer/:organizerId',userController().getOrganizer);
    
}

module.exports = initRoutes

