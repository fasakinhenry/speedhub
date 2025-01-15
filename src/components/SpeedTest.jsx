import React, { useState, useEffect } from "react";

const SpeedTest = () => {
  const [downloadSpeed, setDownloadSpeed] = useState(null);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [ping, setPing] = useState(null);
  const [provider, setProvider] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Network Provider and IP Address
    const fetchNetworkDetails = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setIpAddress(data.ip);
        setProvider("Your Network Provider"); // Placeholder, replace with actual provider logic if possible.
      } catch (err) {
        console.error("Failed to fetch IP address:", err);
      }
    };

    fetchNetworkDetails();
  }, []);

  const testSpeed = async () => {
    setLoading(true);

    // Mock logic for testing speeds
    try {
      // Test download speed
      const startTime = Date.now();
      await fetch("https://via.placeholder.com/1000"); // Replace with a reliable large file
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      const fileSize = 1000 * 1000 * 8; // 1MB in bits
      const speedMbps = (fileSize / duration / (1024 * 1024)).toFixed(2);
      setDownloadSpeed(speedMbps);

      // Test upload speed (placeholder logic)
      setTimeout(() => {
        setUploadSpeed((Math.random() * 50).toFixed(2)); // Randomized speed for demo
        setPing(Math.floor(Math.random() * 100)); // Randomized ping for demo
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Error testing speed:", err);
      setDownloadSpeed("Error");
      setUploadSpeed("Error");
      setPing("Error");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">SpeedHub</h1>
      <button
        onClick={testSpeed}
        disabled={loading}
        className={`px-6 py-3 rounded-md shadow-lg text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Testing..." : "Test Network Speed"}
      </button>

      <div className="mt-8 w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Test Results</h2>
        <p className="text-gray-700">
          <strong>Download Speed:</strong>{" "}
          {downloadSpeed ? `${downloadSpeed} Mbps` : "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Upload Speed:</strong>{" "}
          {uploadSpeed ? `${uploadSpeed} Mbps` : "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Ping:</strong> {ping ? `${ping} ms` : "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>Network Provider:</strong> {provider || "N/A"}
        </p>
        <p className="text-gray-700">
          <strong>IP Address:</strong> {ipAddress || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default SpeedTest;
