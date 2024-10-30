const authController = require('./AuthController')

function initRoutes(app) {
    const routes = [
        { path: '/api/auth', route: authController },
        // { path: '/api/user', route: require('./userRoute') },
        // { path: '/api/product', route: require('./productRoute') },
        // { path: '/api/product_detail', route: require('./productDetailRoute') },
        // { path: '/api/producer', route: require('./producerRoute') },
        // { path: '/api/category', route: require('./categoryRoute') },
        // { path: '/api/cart', route: require('./cartRoute') },
        // { path: '/api/order', route: require('./orderRoute') },
        // { path: '/api/order_detail', route: require('./orderDetailroute') },
        // { path: '/api/stat', route: require('./statRoute') },
        // { path: '/api/invoices', route: require('./invoiceRoute') },
        // { path: '/api/feedback', route: require('./feedbackRoute') },
        // { path: '/api/voucher', route: require('./voucherRoute') },
        // { path: '/api/payment', route: require('./paymentRoute') }
    ];

    routes.forEach(({ path, route }) => {
        app.use(path, route);
    });
}

module.exports = initRoutes;