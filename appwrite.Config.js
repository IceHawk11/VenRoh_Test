import { Client, Account, Databases, Storage, ID } from "appwrite";

const PROJECT_ID=import.meta.env.VITE_APPWRITE_PROJECT_ID
const ENDPOINT=import.meta.env.VITE_APPWRITE_ENDPOINT
const client = new Client()
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID); 

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client, ID };