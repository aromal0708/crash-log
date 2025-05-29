import crypto from 'crypto';

export const generateApiKey = ():string =>{
     const apiKey:string = crypto.randomBytes(32).toString('hex');
     return apiKey;
}