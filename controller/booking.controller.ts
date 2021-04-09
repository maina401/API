import { APILogger } from '../logger/api.logger';
import { BookingService } from '../service/booking.service';

export class BookingController {

    private bookingService: BookingService;
    private logger: APILogger;

    constructor() {
        this.bookingService = new BookingService();
        this.logger = new APILogger()
    }

    async getBookings() {
        this.logger.info('Controller: getBookings', null)
        return await this.bookingService.getBookings();
    }

    async createBooking(booking) {
        this.logger.info('Controller: createBooking', booking);
        return await this.bookingService.createBooking(booking);
    }
    async bookBooking(booking) {
        this.logger.info('Controller: createBooking', booking);
        return await this.bookingService.bookBooking(booking);
    }

    async updateBooking(booking) {
        this.logger.info('Controller: updateBooking', booking);
        return await this.bookingService.updateBooking(booking);
    }

    async resetBookings() {
        this.logger.info('Controller: resetBooking',"You decided to unbook all bookings");
        return await this.bookingService.resetBookings();
    }
}
