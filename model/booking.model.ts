import { model, Schema, Model, Document } from 'mongoose';

export interface BookingModel extends Document {
    booking_id: string;
    vehicle_id: string;
    source: { x:number,y:number };
    destination: { x:number,y:number };
    createdBy: string;
    updatedBy: string;
}

const BookingSchema: Schema = new Schema({
    vehicle_id: { type: String, default: "veh (default)" },
    source : {  x: { type: Number, required: true ,default: 0},
                y: { type: Number, required:true,default: 0 },},
    destination : { x: { type: Number, required: true ,default: 0},
                    y: { type: Number, required:true,default: 0 },},
    successful: { type: Boolean, default: true },
    booking_id: { type: String, default: "booking (default)" },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false }
});

export const BookingModel: Model<BookingModel> = model<BookingModel>('booking', BookingSchema);
