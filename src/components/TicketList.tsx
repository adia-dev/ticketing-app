import React from "react";
import TicketCard from "./TicketCard";
import { Ticket } from "../App";

interface TicketListProps {
  tickets: Ticket[];
  onBuyTicket: (ticket: Ticket) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onBuyTicket }) => {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        MMA Ticket Marketplace
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onBuyTicket={onBuyTicket}
          />
        ))}
      </div>
    </main>
  );
};

export default TicketList;
