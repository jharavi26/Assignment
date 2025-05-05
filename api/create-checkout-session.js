const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const { products } = req.body;

        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ error: "Products array is required" });
        }

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.category,
                    images: [product.thumbnail],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity > 0 ? product.quantity : 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://your-frontend.vercel.app/OrderConfirmation",
            cancel_url: "https://your-frontend.vercel.app/cancel",
        });

        res.status(200).json({ id: session.id, url: session.url });
    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: error.message });
    }
};
