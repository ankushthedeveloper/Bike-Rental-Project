export interface BikeDetails {
  brand: string;
  model: string;
  images: string[];
}
export type BookingStatus = "active" | "completed";
export interface Booking {
  id: number;
  bikeId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: BookingStatus;
  manager?: string;
}

export interface User {
  name?: string;
  id?: string;
}
