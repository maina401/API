import { BookingRepository } from '../repository/booking.repository';

export class BookingService {

    private bookingRepository: BookingRepository;

    constructor() {
        this.bookingRepository = new BookingRepository();
    }

    async getBookings() {
        return await this.bookingRepository.getBookings();
    }

    async createBooking(booking) {

        return await this.bookingRepository.createBooking(booking);
    }

   async bookBooking(booking) {
        return await this.bookingRepository.createBooking(booking);
    }

    async updateBooking(booking) {
        return await this.bookingRepository.updateBooking(booking);
    }

    async resetBookings() {
        return await this.bookingRepository.resetBookings();
    }

}
