import { model, Schema, Model, Document } from 'mongoose';

export interface Vehicle extends Document {
    vehicle_id: string;
    geo: {x: number,
            y: number};
    available:boolean;
    updatedDate: number;
    createdBy: string;
    updatedBy: string;
}

const VehicleSchema: Schema = new Schema({
    vehicle_id: { type: String, required: true },
    geo:{ x: { type: Number, required: true ,default: 0},
        y: { type: Number, required:true,default: 0 }},
    available: { type: Boolean, default: true },
    updatedDate: { type: Date, default: Date.now },
    createdBy: { type: String, required: false },
    updatedBy: { type: String, required: false }
});

export const VehicleModel: Model<Vehicle> = model<Vehicle>('vehicles', VehicleSchema);
