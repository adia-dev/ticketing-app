import React from "react";
import { toast } from "react-toastify";
import { Ticket } from "../App";

interface TicketCardProps {
  ticket: Ticket;
  onBuyTicket: (ticket: Ticket) => void;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, onBuyTicket }) => {
  const handleCopyLink = () => {
    const link = `https://mymmatickets.com/ticket/${ticket.id}`;
    navigator.clipboard.writeText(link);
    toast.success("Ticket link copied!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition">
      <img
        src={ticket.image}
        alt={ticket.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{ticket.name}</h3>
        <p>Date: {ticket.date}</p>
        <p>Time: {ticket.time}</p>
        <p className="font-semibold">Price: {ticket.price}</p>
        <div className="flex flex-col mt-4 space-y-2">
          <button
            onClick={() => onBuyTicket(ticket)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Buy Now
          </button>
          <button
            onClick={handleCopyLink}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
