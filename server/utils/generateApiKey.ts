// Description: File to generate a random API key for the application.
// This utility function generates a secure random API key using the crypto module.

// Import necessary modules
import crypto from 'crypto';

// Function to generate a random API key
export const generateApiKey = ():string =>{
     const apiKey:string = crypto.randomBytes(32).toString('hex');
     return apiKey;
}