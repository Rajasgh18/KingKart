const Router = require('express').Router();
const Product = require('../models/Product');
const Order = require('../models/Order');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SK);

Router
    //Orders Products
    .post('/', async (req, res) => {
        try {
            const { username, products } = req.body;
            const uniqueIds = new Set(products);
            const productsInfos = await Product.find({ _id: products });
            const line_items = [];
            for (const productId of uniqueIds) {
                const productInfo = productsInfos.find(p => p._id.toString() === productId);
                const quantity = products.filter(id => id === productId)?.length || 0;
                if (quantity > 0 && productInfo) {
                    line_items.push({
                        quantity,
                        price_data: {
                            currency: "INR",
                            product_data: { name: productInfo.name },
                            unit_amount: productInfo.offerPrice * 100
                        }
                    });
                }
            }
            const order = new Order({ ...req.body, paid: false, line_items, orderedProductIds: products });
            await order.save();
            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: "payment",
                customer_email: username,
                success_url: process.env.PUBLIC_URL + '/cart?success=1',
                cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
                metadata: { orderId: order._id.toString() }
            });

            res.status(200).json({ url: session.url });

        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    })

    //Get all orders
    .get('/', async(req, res) => {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        }
    })

module.exports = Router;