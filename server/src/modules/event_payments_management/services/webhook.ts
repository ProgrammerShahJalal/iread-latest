import { FastifyInstance } from 'fastify';
import Models from '../../../database/models';
import { modelName } from '../models/model';
import custom_error from '../../../helpers/custom_error';

interface WebhookMetadata {
    user_id: string;
    event_id: string;
    event_enrollment_id: string;
    trx_id: string;
}

export async function handleSuccessfulPayment(
    fastify_instance: FastifyInstance,
    session_id: string,
    metadata: WebhookMetadata
): Promise<void> {
    const models = Models.get();
    
    try {
        const { user_id, event_id, event_enrollment_id, trx_id } = metadata;
        
        // Update enrollment status to paid and accepted
        await models.EventEnrollmentsModel.update(
            { 
                is_paid: '1', 
                status: 'accepted' 
            },
            { 
                where: { 
                    id: parseInt(event_enrollment_id)
                } 
            }
        );

        // Update payment record status to successful
        await models[modelName].update(
            { 
                status: 'success',
                updated_at: new Date()
            },
            { 
                where: { 
                    session_id: session_id 
                } 
            }
        );

        console.log(`Successfully processed payment for enrollment ${event_enrollment_id}`);
    } catch (error: any) {
        console.error('Error in handleSuccessfulPayment:', error);
        throw new custom_error('webhook processing error', 500, error.message);
    }
}

export async function handleFailedPayment(
    fastify_instance: FastifyInstance,
    session_id: string,
    reason: 'expired' | 'failed' = 'failed'
): Promise<void> {
    const models = Models.get();
    
    try {
        // Update payment record status to failed
        await models[modelName].update(
            { 
                status: 'failed',
                // failure_reason: reason,
                updated_at: new Date()
            },
            { 
                where: { 
                    session_id: session_id 
                } 
            }
        );

        // Optionally, you might want to update enrollment status too
        // For now, keeping enrollment as pending allows user to retry payment
        
        console.log(`Payment session ${session_id} marked as ${reason}`);
    } catch (error: any) {
        console.error('Error in handleFailedPayment:', error);
        throw new custom_error('webhook processing error', 500, error.message);
    }
}

export async function handleCancelledPayment(
    fastify_instance: FastifyInstance,
    session_id: string
): Promise<void> {
    const models = Models.get();
    
    try {
        // Find the payment record
        const paymentRecord = await models[modelName].findOne({
            where: { session_id: session_id }
        });

        if (paymentRecord) {
            // Update payment status to cancelled
            await models[modelName].update(
                { 
                    status: 'failed',
                    updated_at: new Date()
                },
                { 
                    where: { 
                        session_id: session_id 
                    } 
                }
            );

            // Keep enrollment as pending so user can retry
            console.log(`Payment session ${session_id} marked as cancelled`);
        }
    } catch (error: any) {
        console.error('Error in handleCancelledPayment:', error);
        throw new custom_error('webhook processing error', 500, error.message);
    }
}