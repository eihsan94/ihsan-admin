import { formatAmountForStripe } from '@utils/stripe/stripe-helpers'
import { CURRENCY } from 'customs/config/stripe'
import { NextApiRequest, NextApiResponse } from 'next'


import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    let { line_items, customer_email, cancel_url, success_url } = req.body
    line_items = line_items.map((i: any) => ({ ...i, amount: formatAmountForStripe(i.amount, CURRENCY), currency: CURRENCY }))
    try {
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        customer_email,
        line_items,
        success_url: `${req.headers.origin}${success_url}`,
        cancel_url: `${req.headers.origin}${cancel_url}`,
      }
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
