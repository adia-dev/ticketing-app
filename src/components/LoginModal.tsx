import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLoginMagic: () => void;
  onLoginMetamask: () => void;
  onLoginAddress: (address: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  visible,
  onClose,
  onLoginMagic,
  onLoginMetamask,
  onLoginAddress,
}) => {
  const [addressInput, setAddressInput] = useState("");

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
            <h2 className="text-2xl mb-4">Login</h2>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <button
                onClick={onLoginMagic}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Login with Magic Wallet
              </button>
            </div>
            <div className="mb-4">
              <button
                onClick={onLoginMetamask}
                className="w-full bg-orange-500 text-white p-2 rounded flex items-center justify-center hover:bg-orange-600 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png"
                  alt="MetaMask"
                  className="w-5 h-5 mr-2"
                />
                Login with MetaMask
              </button>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Wallet Address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <button
                onClick={() => onLoginAddress(addressInput)}
                className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
              >
                Login with Address
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
