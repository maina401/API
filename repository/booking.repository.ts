import {connect, disconnect} from "../config/db.config";
import {VehicleModel} from '../model/vehicle.model';
import {APILogger} from '../logger/api.logger';
import {BookingModel} from "../model/booking.model";


export class BookingRepository {

    private logger: APILogger;

    constructor() {
        connect();
        this.logger = new APILogger()
    }

    async getBookings() {
        const bookings = await BookingModel.find({});
        console.log('bookings:::', bookings);
        return bookings;
    }

    async createBooking(booking) {
        let data = {}
        try {

            console.log(booking)



            var conditions = {available: true, 'vehicle_id': booking['vehicle_id']};
            var new_value = {$set: {available: false}};
            let created=await VehicleModel.findOneAndUpdate(conditions, new_value, {new: false,useFindAndModify:false}, async (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                    data=await BookingModel.create(booking);


                return data;


            });

            return created;

        } catch (err) {
            this.logger.error('Error::' + err);
        }



    }

    async bookBooking(booking) {
        let data = {};
        try {
            data = await BookingModel.create(booking);
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async updateBooking(booking) {
        let data = {};
        try {
            data = await BookingModel.updateOne(booking);
        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;
    }

    async resetBookings() {
        let data = {}
        try {
            let del=BookingModel.deleteMany({}).exec().then(function (data) {

                data={"Reset":"succesful"}
                return data;
            });
            data=del.then(data);


        } catch (err) {
            this.logger.error('Error::' + err);
        }
        return data;


    }
}
