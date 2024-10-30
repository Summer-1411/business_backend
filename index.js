require('dotenv').config()
const express = require('express')
const cors = require('cors')
const multer = require("multer")
const crypto = require('crypto');
const path = require("path")
const app = express();
const initRoutes = require('./src/controller/index')
app.use(express.json())
app.use(cors())
const port = 3000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

initRoutes(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// async function getCartDetails(cartId) {
//   const cartDetails = await prisma.cart_detail.findMany({
//     where: {
//       id_cart: cartId,
//     },
//     include: {
//       product_detail: {
//         include: {
//           product: true, // lấy thông tin sản phẩm
//         },
//       },
//     },
//   });

//   // Định dạng lại dữ liệu
//   const formattedData = cartDetails.map((detail) => ({
//     idCart: detail.id_cart,
//     idCartDetail: detail.id,
//     idProdDetail: detail.id_pro_detail,
//     quantity: detail.quantity,
//     color: detail.product_detail.color,
//     size: detail.product_detail.size,
//     price: detail.product_detail.price,
//     img: detail.product_detail.img,
//     name: detail.product_detail.product.name,
//     idProduct: detail.product_detail.product.id,
//   }));

//   return formattedData;
// }

// getCartDetails(152)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

