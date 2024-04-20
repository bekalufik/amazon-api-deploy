
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_KEY)

const app = express()
const port=process.env.PORT
app.use(cors({ origin: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'success'
    })
})

app.post('/payment/create', async (req, res) => {

    const total = req.query.total;

    if (total > 0) {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd'
        })
        res.status(201).json({
            clientSecret: paymentIntent.client_secret
        })
    } else {
        res.status(403).json({
            message: 'total must me greater than zero'
        })
    }


})


app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`server runnning on port http://localhost:${port}`)
    }
})

