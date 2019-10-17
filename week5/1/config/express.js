const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const secret = 'secret';
module.exports = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser(secret));
    app.use(express.static(path.resolve(__basedir, 'static')));
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }))
    app.set('views', path.resolve(__basedir, 'views'));
};