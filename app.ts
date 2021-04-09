import * as bodyParser from "body-parser";
import * as express from "express";
import { APILogger } from "./logger/api.logger";
import { VehicleController } from "./controller/vehicle.controller";
import { BookingController } from "./controller/booking.controller";
import swaggerUi = require('swagger-ui-express');
import fs = require('fs');
import cors=require('cors');

class App {

    public express: express.Application;
    public logger: APILogger;
    public vehicleController: VehicleController;
    public bookingController: BookingController;

    /* Swagger files start */
    private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);
    /* Swagger files end */


    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.logger = new APILogger();
        this.vehicleController = new VehicleController();
        this.bookingController = new BookingController();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    private routes(): void {

        this.express.get('/api/vehicles', (req, res) => {
            this.vehicleController.getVehicles().then(data => res.json(data));
        });
        this.express.get('/api/available/vehicles', (req, res) => {
            this.vehicleController.getAvailableVehicles().then(data => res.json(data));
        });
        this.express.get('/api/bookings', (req, res) => {
            this.bookingController.getBookings().then(data => res.json(data));
        });
        this.express.get('/api/test', (req, res) => {
           res.send({"message":"You got it working. Huraaaaay!"});
        });

        this.express.post('/api/create/vehicle', (req, res) => {
            console.log(req.body);
            this.vehicleController.createVehicle(req.body.vehicle).then(data => res.json(data));
        });
        this.express.get('/api/reset/vehicles', (req, res) => {
            console.log(req.body);
            this.vehicleController.resetVehicles().then(data => res.json(data));
        });
        this.express.get('/api/reset/bookings', (req, res) => {
            console.log(req.body);
            this.bookingController.resetBookings().then(data => res.json(data));
        });
        this.express.post('/api/book', (req, res) => {
            console.log(req.body);
            this.bookingController.createBooking(req.body).then(data => res.json(data));
        });

        this.express.put('/api/vehicle', (req, res) => {
            this.vehicleController.updateVehicle(req.body.vehicle).then(data => res.json(data));
        });

        this.express.get('/api/tick', (req, res) => {

            this.vehicleController.tickVehicle().then(data => res.json(data));
        });

        this.express.delete('/api/vehicle/:id', (req, res) => {
            this.vehicleController.deleteVehicle(req.params.id).then(data => res.json(data));
        });

        this.express.get("/", (req, res, next) => {
            res.send("Typescript App works!!");
        });

        // swagger docs
        this.express.use('/api/docs', swaggerUi.serve,
            swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));

        // handle undefined routes
        this.express.use("*", (req, res, next) => {
            res.send("Make sure url is correct!!!");
        });
    }
}

export default new App().express;
