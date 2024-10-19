import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes();
    
    // URL-encode the password to handle special characters
    private username: string = 'bhanuchandar668'; // Your MongoDB username
    private password: string = 'Bh@nus180668'; // Your MongoDB password
    private encodedPassword: string = encodeURIComponent(this.password); // URL-encoded password
    public mongoUrl: string = `mongodb+srv://${this.username}:${this.encodedPassword}@myproject.ukohb.mongodb.net/myDatabase?retryWrites=true&w=majority`; // Replace myDatabase with your actual database name

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();        
    }

    private config(): void {
        // Support application/json type post data
        this.app.use(bodyParser.json());
        // Support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds
        })
        .then(() => {
            console.log('Successfully connected to MongoDB');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    }
}

export default new App().app;
