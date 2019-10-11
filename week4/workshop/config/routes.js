// TODO: Require Controllers...
const cubeController = require('../controllers/cube');
const accessoryController = require('../controllers/accessory');
const authController = require('../controllers/auth');
const { auth } = require('../utils');

module.exports = (app) => {
    app.get('/create/accessory', accessoryController.createGet);
    app.post('/create/accessory', accessoryController.createPost);
    app.get('/attach/accessory/:id', accessoryController.attachGet);
    app.post('/attach/accessory/:id', accessoryController.attachPost);
    app.get('/details/:id', auth(false), cubeController.details)
    app.get('/about', cubeController.about);
    app.get('/login', authController.login);
    app.get('/register', authController.register);
    app.post('/login', authController.loginPost);
    app.post('/register', authController.registerPost);
    app.get('/logout', authController.logout);
    app.get('/not-found', cubeController.notFound);
    app.get('/create', auth(), cubeController.getCreate);
    app.post('/create', auth(), cubeController.postCreate);
    app.get('/edit/:id', auth(), cubeController.getEdit);
    app.post('/edit/:id', auth(), cubeController.postEdit);
    app.get('/delete/:id', auth(), cubeController.getDelete);
    app.post('/delete/:id', auth(), cubeController.getDeletePost);
    app.get('/', auth(false), cubeController.index);
    app.get('*', (req, res) => { res.render('404.hbs'); });
};