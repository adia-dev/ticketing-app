import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import TicketList from "./components/TicketList";
import PurchaseSummaryModal from "./components/PurchaseSummaryModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Ticket = {
  id: number;
  name: string;
  date: string;
  time: string;
  price: string;
  image: string;
};

export type PurchaseSummary = {
  ticketName: string;
  tokenId: number;
  date: string;
  time: string;
};

const generateRandomWalletAddress = (): string => {
  const randomStr = Math.random().toString(36).substring(2, 12);
  return "0x" + randomStr;
};

const dummyTickets: Ticket[] = [
  {
    id: 1,
    name: "MMA Championship Fight",
    date: "10/10/2023",
    time: "7:00 PM",
    price: "1 ETH",
    image:
      "https://preview.redd.it/ufc-309-jones-vs-stipe-official-poster-v0-1s1dizd475wd1.jpeg?width=640&crop=smart&auto=webp&s=90fdc4c560bd5a95dd07fe8545589d53bb3eaaea",
  },
  {
    id: 2,
    name: "Title Fight",
    date: "11/10/2023",
    time: "8:00 PM",
    price: "1.5 ETH",
    image:
      "https://preview.redd.it/ufc-309-jones-vs-stipe-official-poster-v0-1s1dizd475wd1.jpeg?width=640&crop=smart&auto=webp&s=90fdc4c560bd5a95dd07fe8545589d53bb3eaaea",
  },
  {
    id: 3,
    name: "Undercard Battle",
    date: "12/10/2023",
    time: "6:00 PM",
    price: "0.8 ETH",
    image:
      "https://preview.redd.it/ufc-309-jones-vs-stipe-official-poster-v0-1s1dizd475wd1.jpeg?width=640&crop=smart&auto=webp&s=90fdc4c560bd5a95dd07fe8545589d53bb3eaaea",
  },
];

const App: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [showLoginModal, setShowLoginModal] = useState<boolean>(true);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [purchaseSummary, setPurchaseSummary] = useState<PurchaseSummary>({
    ticketName: "",
    tokenId: 0,
    date: "",
    time: "",
  });
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseSummary[]>([]);

  useEffect(() => {
    const savedWallet = localStorage.getItem("walletAddress");
    if (savedWallet) {
      setWalletAddress(savedWallet);
      setShowLoginModal(false);
    }
    const savedHistory = localStorage.getItem("purchaseHistory");
    if (savedHistory) {
      setPurchaseHistory(JSON.parse(savedHistory));
    }
  }, []);

  const loginWithMagic = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      const addr = generateRandomWalletAddress();
      setWalletAddress(addr);
      localStorage.setItem("walletAddress", addr);
      setShowLoginModal(false);
      toast.success("Welcome back! Connected with email.");
    }, 2000);
  };

  const loginWithMetamask = () => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      const addr = generateRandomWalletAddress();
      setWalletAddress(addr);
      localStorage.setItem("walletAddress", addr);
      setShowLoginModal(false);
      toast.success("Welcome back! Connected with MetaMask.");
    }, 2000);
  };

  const loginWithAddress = (address: string) => {
    if (address.trim() === "") {
      toast.error("Please enter a valid wallet address.");
      return;
    }
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setWalletAddress(address);
      localStorage.setItem("walletAddress", address);
      setShowLoginModal(false);
      toast.success("Welcome back! Connected with provided address.");
    }, 2000);
  };

  const buyTicket = (ticket: Ticket) => {
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      const summary: PurchaseSummary = {
        ticketName: ticket.name,
        tokenId: Math.floor(Math.random() * 1000),
        date: ticket.date,
        time: ticket.time,
      };
      setPurchaseSummary(summary);
      setShowPurchaseModal(true);
      const updatedHistory = [...purchaseHistory, summary];
      setPurchaseHistory(updatedHistory);
      localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));
      toast.info("Ticket purchased successfully!");
    }, 2000);
  };

  return (
    <div className="bg-gray-100 min-h-screen relative">
      {showLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />

      <Header walletAddress={walletAddress} />

      <LoginModal
        visible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginMagic={loginWithMagic}
        onLoginMetamask={loginWithMetamask}
        onLoginAddress={loginWithAddress}
      />

      <TicketList tickets={dummyTickets} onBuyTicket={buyTicket} />

      <PurchaseSummaryModal
        visible={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        purchaseSummary={purchaseSummary}
        walletAddress={walletAddress}
      />
    </div>
  );
};

export default App;
