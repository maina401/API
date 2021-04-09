import { APILogger } from '../logger/api.logger';
import { VehicleService } from '../service/vehicle.service';

export class VehicleController {

    private vehicleService: VehicleService;
    private logger: APILogger;

    constructor() {
        this.vehicleService = new VehicleService();
        this.logger = new APILogger()
    }

    async getVehicles() {
        this.logger.info('Controller: getVehicles', null)
        return await this.vehicleService.getVehicles();
    }

    async getAvailableVehicles() {
        this.logger.info('Controller: getVehicles', null)
        return await this.vehicleService.getAvailableVehicles();
    }

    async createVehicle(vehicle) {
        this.logger.info('Controller: createVehicle', vehicle);
        return await this.vehicleService.createVehicle(vehicle);
    }
    async resetVehicles() {
        this.logger.info('Controller: createVehicle', "vehicle");
        return await this.vehicleService.resetVehicles();
    }

    async updateVehicle(vehicle) {
        this.logger.info('Controller: updateVehicle', vehicle);
        return await this.vehicleService.updateVehicle(vehicle);
    }

    async deleteVehicle(vehicleId) {
        this.logger.info('Controller: deleteVehicle', vehicleId);
        return await this.vehicleService.deleteVehicle(vehicleId);
    }
    async tickVehicle() {
        return await this.vehicleService.tickVehicle();
    }
}
