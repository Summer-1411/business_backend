const express = require('express');
const app = express();
const port = 3000;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


async function getCartDetails(cartId) {
    const cartDetails = await prisma.cart_detail.findMany({
        where: {
            id_cart: cartId,
        },
        include: {
            product_detail: {
                include: {
                    product: true, // lấy thông tin sản phẩm
                },
            },
        },
    });

    // Định dạng lại dữ liệu
    const formattedData = cartDetails.map(detail => ({
        idCart: detail.id_cart,
        idCartDetail: detail.id,
        idProdDetail: detail.id_pro_detail,
        quantity: detail.quantity,
        color: detail.product_detail.color,
        size: detail.product_detail.size,
        price: detail.product_detail.price,
        img: detail.product_detail.img,
        name: detail.product_detail.product.name,
        idProduct: detail.product_detail.product.id,
    }));

    return formattedData;
}

getCartDetails(152)
    .then(data => console.log(data))
    .catch(err => console.error(err))
    .finally(async () => {
        await prisma.$disconnect();
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
