import Stripe from 'stripe';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { responseObject } from '../../common_types/object';
import all from './services/all';

const stripe = new Stripe('sk_test_51JwIBsFBTfTsSwmzevCEzr42DeBZtu6fJSylaIXLwwMHDy16IR9VHhEa5lc8vLP4fmk3D8Cpx5JxKH187yFWRcPU009G257uXe', { apiVersion: "2024-12-18.acacia" });

export default function(fastify: FastifyInstance) {
return {
    
    all: async function (req: FastifyRequest, res: FastifyReply) {
        let data: responseObject = await all(fastify, req);
        return res
            .code(data.status)
            .header('Cache-Control', 'public, max-age=30')
            .send(data);
    },
    session: async function createCheckoutSession(
        req: FastifyRequest,
        res: FastifyReply
    ) {
    
        interface DonationRequest {
            name: string;
            email: string;
            amount: string; 
            phone?: string; 
            occupation?: string; 
          }
        
        const { name, email, phone, occupation, amount } = req.body as DonationRequest;
    
        if (!name || !email || !amount) {
            return res.status(400).send({
                success: false,
                message: 'Name, Email, and Amount are required.',
            });
        }

        try {
            const amountInCents = Math.round(parseFloat(amount) * 100);
        
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'], // This is now correctly typed
              line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: `Donation by ${name}`,
                      description: `Occupation: ${occupation}, Phone: ${phone}`,
                    },
                    unit_amount: amountInCents,
                  },
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: `http://localhost:3000/donate/success`,
              cancel_url: `http://localhost:3000/donate/cancel`,
              metadata: {
                name,
                email,
                phone,
                occupation,
              },
            } as Stripe.Checkout.SessionCreateParams); 
        
            return res.status(200).send({
              success: true,
              sessionId: session.id,
            });
          } catch (error) {
            console.error('Error creating Stripe session:', error);
            return res.status(500).send({
                success: false,
                message: 'Failed to create Stripe session.',
            });
        }
    },
    
    
    // Handle Stripe Webhook
    webhook:  async function handleStripeWebhook(req: FastifyRequest, res: FastifyReply) {
        const sig = req.headers['stripe-signature'] as string;
      
        if (!sig) {
          return res.status(400).send({
            success: false,
            message: 'Missing Stripe signature header.',
          });
        }
      
        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(
            req.body as Buffer, // Raw request body as a buffer
            sig,
            "we_1Q53DEFBTfTsSwmzak6LWImD" as string
          ); 
        } catch (err: any) {
          console.error('Webhook signature verification failed:', err.message);
          return res.status(400).send({
            success: false,
            message: 'Webhook signature verification failed.',
          });
        }
      
        // Handle the event
        switch (event.type) {
          case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session;
            console.log('Payment successful:', session);
            // Process the successful payment (e.g., save details to the database)
            break;
          case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log('Payment intent succeeded:', paymentIntent);
            break;
          default:
            console.warn(`Unhandled event type: ${event.type}`);
        }
      
        return res.status(200).send({ success: true, message: 'Webhook received.' });
      }
}
}
