import React from "react";

interface HeaderProps {
  walletAddress: string;
}

const Header: React.FC<HeaderProps> = ({ walletAddress }) => {
  const truncateAddress = (address: string) => {
    if (!address) return "0x...";
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
      <nav className="space-x-4">
        <a href="#" className="hover:underline transition">
          Home
        </a>
        <a href="#" className="hover:underline transition">
          Events
        </a>
        <a href="#" className="hover:underline transition">
          Tickets
        </a>
        <a href="#" className="hover:underline transition">
          Contact
        </a>
      </nav>
      <div className="flex items-center space-x-2">
        <img
          src="https://preview.redd.it/ufc-309-jones-vs-stipe-official-poster-v0-1s1dizd475wd1.jpeg?width=640&crop=smart&auto=webp&s=90fdc4c560bd5a95dd07fe8545589d53bb3eaaea"
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-sm">{truncateAddress(walletAddress)}</span>
      </div>
    </header>
  );
};

export default Header;
