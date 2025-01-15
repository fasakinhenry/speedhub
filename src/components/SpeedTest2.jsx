import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaUpload, FaWifi } from "react-icons/fa";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const fetchNetworkDetails = async () => {
      try {
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipResponse.json();
        setIpAddress(ip);

        const providerResponse = await fetch(
          `https://ipapi.co/${ip}/json/`
        );
        const providerData = await providerResponse.json();
        setProvider(providerData.org || "Unknown Provider");
      } catch (error) {
        console.error("Error fetching network details:", error);
        setProvider("Error fetching provider");
      }
    };

    fetchNetworkDetails();
  }, []);

  const testSpeed = async () => {
    setTesting(true);

    try {
      // Simulate real download speed test
      const downloadStartTime = Date.now();
      await fetch("https://via.placeholder.com/1000");
      const downloadDuration = (Date.now() - downloadStartTime) / 1000;
      const fileSize = 1000 * 1000 * 8; // 1MB in bits
      setDownloadSpeed((fileSize / downloadDuration / (1024 * 1024)).toFixed(2));

      // Simulate upload and ping
      setTimeout(() => {
        setUploadSpeed((Math.random() * 50).toFixed(2)); // Simulated upload speed
        setPing(Math.floor(Math.random() * 100)); // Simulated ping
        setTesting(false);
      }, 2000);
    } catch (error) {
      console.error("Error testing speed:", error);
      setDownloadSpeed("Error");
      setUploadSpeed("Error");
      setPing("Error");
      setTesting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <motion.h1
        className="text-4xl font-bold mb-8 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        SpeedHub
      </motion.h1>

      <button
        onClick={testSpeed}
        disabled={testing}
        className={`px-6 py-3 rounded-md shadow-md text-white text-lg ${
          testing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {testing ? "Testing..." : "Start Speed Test"}
      </button>

      <motion.div
        className="mt-10 w-full max-w-lg p-6 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Test Results
        </h2>
        <div className="flex items-center gap-4 mb-4">
          <FaDownload className="text-blue-500 text-3xl" />
          <p className="text-gray-700">
            <strong>Download Speed:</strong>{" "}
            {downloadSpeed ? `${downloadSpeed} Mbps` : "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <FaUpload className="text-green-500 text-3xl" />
          <p className="text-gray-700">
            <strong>Upload Speed:</strong>{" "}
            {uploadSpeed ? `${uploadSpeed} Mbps` : "N/A"}
          </p>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <FaWifi className="text-yellow-500 text-3xl" />
          <p className="text-gray-700">
            <strong>Ping:</strong> {ping ? `${ping} ms` : "N/A"}
          </p>
        </div>
        <p className="text-gray-700">
          <strong>Network Provider:</strong> {provider || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>IP Address:</strong> {ipAddress || "N/A"}
        </p>
      </motion.div>
    </div>
  );
};

export default SpeedTest;
