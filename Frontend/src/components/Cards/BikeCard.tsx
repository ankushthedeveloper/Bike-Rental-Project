import Image from "next/image";
import React from "react";

const BikeCard = ({
  bike,
}: {
  bike: { src: string; name: string; description: string; price: string };
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <Image
        src={bike.src}
        alt={bike.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-left">
        <h3 className="font-bold text-lg">{bike.name}</h3>
        <p className="text-slate-500 text-sm">{bike.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-bold text-blue-600">{bike.price}</span>
          <a
            href="#"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            Rent Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
