import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PurchaseSummary } from "../App";
import { toast } from "react-toastify";

interface PurchaseSummaryModalProps {
  visible: boolean;
  onClose: () => void;
  purchaseSummary: PurchaseSummary;
  walletAddress: string;
}

const PurchaseSummaryModal: React.FC<PurchaseSummaryModalProps> = ({
  visible,
  onClose,
  purchaseSummary,
  walletAddress,
}) => {
  const handleCopyPurchaseLink = () => {
    const link = `https://mymmatickets.com/purchase/${purchaseSummary.tokenId}`;
    navigator.clipboard.writeText(link);
    toast.success("Purchase link copied!");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-96 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl transition"
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Purchase Summary</h2>
            <p>
              <strong>Ticket:</strong> {purchaseSummary.ticketName}
            </p>
            <p>
              <strong>Identity:</strong> {walletAddress}
            </p>
            <p>
              <strong>Token ID:</strong> #{purchaseSummary.tokenId}
            </p>
            <p>
              <strong>Event Date:</strong> {purchaseSummary.date}
            </p>
            <p>
              <strong>Event Time:</strong> {purchaseSummary.time}
            </p>
            <button
              onClick={handleCopyPurchaseLink}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
            >
              Copy Purchase Link
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseSummaryModal;
