import { VehicleRepository } from '../repository/vehicle.repository';

export class VehicleService {

    private vehicleRepository: VehicleRepository;

    constructor() {
        this.vehicleRepository = new VehicleRepository();
    }

    async getVehicles() {
        return await this.vehicleRepository.getVehicles();
    }
    async getAvailableVehicles() {
        return await this.vehicleRepository.getAvailableVehicles();
    }

    async createVehicle(vehicle) {
        return await this.vehicleRepository.createVehicle(vehicle);
    }
   async resetVehicles() {
        return await this.vehicleRepository.resetVehicles();
    }

    async updateVehicle(vehicle) {
        return await this.vehicleRepository.updateVehicle(vehicle);
    }

    async deleteVehicle(vehicleId) {
        return await this.vehicleRepository.deleteVehicle(vehicleId);
    }
    async tickVehicle() {
        return await this.vehicleRepository.tickVehicle();
    }

}
