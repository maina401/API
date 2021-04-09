import { connect, disconnect } from "../config/db.config";
import { VehicleModel } from '../model/vehicle.model';
import { APILogger } from '../logger/api.logger';
import {BookingModel} from "../model/booking.model";

export class VehicleRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getVehicles() {
        const vehicles = await VehicleModel.find({});
        console.log('vehicles:::', vehicles);
        return vehicles;
    }
    async getAvailableVehicles() {
        const vehicles = await VehicleModel.find({available:true});
        console.log('vehicles:::', vehicles);
        return vehicles;
    }

    async createVehicle(vehicle) {
        let data = {};
        try {
            data = await VehicleModel.create(vehicle);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }  async resetVehicles() {
        let notify = {};
        try {
           let update=VehicleModel.updateMany({},{geo:{x:0,y:0},available:true,updatedDate:Date.now()}).exec().then(function (notify) {
               notify={update:"successful"}
               return notify;
           });
           notify=update.then(notify);

        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return notify;
    }

    async updateVehicle(vehicle) {
        let data = {};
        try {
            data = await VehicleModel.updateOne(vehicle);
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }
    async tickVehicle() {
        console.log("ticking Vehicles");

        let data = {};
        try {
            var conditions = {available: false};
            var new_value = {$inc:{x:0.1,y:0.001}};
            await VehicleModel.updateMany(conditions,new_value).then((err,res)=>{
                console.log(res)
               return  res
            });

        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async deleteVehicle(vehicleId) {
        let data: any = {};
        try {
            data = await VehicleModel.deleteOne({_id : vehicleId});
        } catch(err) {
            this.logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }
}
