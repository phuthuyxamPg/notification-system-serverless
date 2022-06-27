import { SQSHandler } from 'aws-lambda';
import fetch from 'node-fetch';

export const receiver: SQSHandler = async (event) => {
    try {
        for (const record of event.Records) {
            // Do something
            // Find your Service Plan ID and API Token at dashboard.sinch.com/sms/api/rest
            // Find your Sinch numbers at dashboard.sinch.com/numbers/your-numbers/numbers
            const SERVICE_PLAN_ID = 'YOUR_servicePlanId';
            const API_TOKEN = 'YOUR_API_token';
            const SINCH_NUMBER = 'YOUR_Sinch_virtual_number';
            const TO_NUMBER = 'sender_number';
            const API_URL = 'https://us.sms.api.sinch.com/xms/v1/';
            const API_PATH = '/batches';

            const resp = await fetch(
                API_PATH + SERVICE_PLAN_ID + API_PATH,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + API_TOKEN
                    },
                    body: JSON.stringify({
                        from: SINCH_NUMBER,
                        to: [TO_NUMBER],
                        body: 'Hello sms is here!'
                    })
                }
            );

            const data = await resp.json();
            console.log(data);
        }
    } catch (error) {
        console.log(error);
    }
};