const authController = require('./AuthController')
const categoryController = require('./CategoryController')
const producerController = require('./ProducerController')
const productController = require('./ProductController')

function initRoutes(app) {
    const routes = [
        { path: '/api/auth', route: authController },
        { path: '/api/category', route: categoryController },
        { path: '/api/producer', route: producerController },
        { path: '/api/product', route: productController },
    ];

    routes.forEach(({ path, route }) => {
        app.use(path, route);
    });
}

module.exports = initRoutes;