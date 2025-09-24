import { Booking } from "@/types/booking";
import { Calendar, CheckCircle, Clock, IndianRupee } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { InfoBlock } from "../common/InfoBlock";
import { formatDate } from "./utils/booking";

const getBookingStatus = (startDate: string, endDate: string) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  now.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  if (now > end) {
    return {
      text: "Completed",
      color: "bg-gray-500",
      icon: <CheckCircle size={14} />,
    };
  }
  if (now >= start && now <= end) {
    return { text: "Active", color: "bg-green-500", icon: <Clock size={14} /> };
  }
  return {
    text: "Upcoming",
    color: "bg-blue-500",
    icon: <Calendar size={14} />,
  };
};

const BookingCard: FC<{ booking: Booking }> = ({ booking }) => {
  const { bikeDetails, startDate, endDate, totalPrice } = booking;
  const status = getBookingStatus(startDate, endDate);

  const start = new Date(startDate);
  const end = new Date(endDate);
  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      <div className="relative h-48 w-full">
        <Image
          src={bikeDetails?.images?.[0] || "/placeholder-bike.jpg"}
          alt={`${bikeDetails.brand} ${bikeDetails.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div
          className={`absolute top-2 right-2 flex items-center gap-1.5 text-white text-xs font-semibold py-1 px-2 rounded-full ${status.color}`}
        >
          {status.icon} {status.text}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 truncate">
          {bikeDetails.brand} {bikeDetails.model}
        </h3>
        <div className="space-y-3 mt-4">
          <InfoBlock icon={<Calendar size={16} />} label="From">
            {formatDate(startDate)}
          </InfoBlock>
          <InfoBlock icon={<Calendar size={16} />} label="To">
            {formatDate(endDate)}
          </InfoBlock>
          <InfoBlock icon={<Clock size={16} />} label="Duration">
            {duration} {duration > 1 ? "Days" : "Day"}
          </InfoBlock>
          <InfoBlock icon={<IndianRupee size={16} />} label="Total">
            <span className="font-bold text-gray-900">
              ₹{totalPrice.toLocaleString("en-IN")}
            </span>
          </InfoBlock>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
