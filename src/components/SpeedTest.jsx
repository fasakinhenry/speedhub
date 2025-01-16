import React, { useState, useEffect, useRef } from 'react';
import SpeedTest from '@cloudflare/speedtest';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import LocationMap from './LocationMap';
import MetricsDisplay from './MetricsDisplay';
import TestControls from './TestControls';
import ServerInfo from './ServerInfo';
import NetworkQuality from './NetworkQuality';

const SpeedTestComponent = () => {
  const [metrics, setMetrics] = useState({
    download: 0,
    upload: 0,
    latency: 0,
    jitter: 0,
    packetLoss: 0,
  });
  const [testStatus, setTestStatus] = useState('idle');
  const [downloadData, setDownloadData] = useState([]);
  const [uploadData, setUploadData] = useState([]);
  const [serverInfo, setServerInfo] = useState(null);
  const [networkScores, setNetworkScores] = useState(null);
  const speedTestRef = useRef(null);

  const initializeSpeedTest = () => {
    if (speedTestRef.current) {
      speedTestRef.current.pause();
    }

    speedTestRef.current = new SpeedTest({
      autoStart: false,
      measurements: [
        { type: 'latency', numPackets: 20 },
        { type: 'download', bytes: 1e5, count: 8 },
        { type: 'download', bytes: 1e6, count: 8 },
        { type: 'download', bytes: 1e7, count: 6 },
        { type: 'upload', bytes: 1e5, count: 8 },
        { type: 'upload', bytes: 1e6, count: 6 },
        { type: 'upload', bytes: 1e7, count: 4 },
        { type: 'packetLoss', numPackets: 1000, responsesWaitTime: 3000 },
      ],
      measureDownloadLoadedLatency: true,
      measureUploadLoadedLatency: true,
    });

    speedTestRef.current.onConnect = (info) => {
      setServerInfo({
        city: info.city || 'Unknown City',
        country: info.country || 'Unknown Country',
        ip: info.ip || 'Unknown IP',
        protocol: info.ipVersion === 6 ? 'IPv6' : 'IPv4',
        isp: info.isp || 'Unknown ISP',
        latitude: info.latitude,
        longitude: info.longitude,
      });
    };

    speedTestRef.current.onResultsChange = ({ type }) => {
      const results = speedTestRef.current.results;

      switch (type) {
        case 'download':
          const downloadPoint = results
            .getDownloadBandwidthPoints()
            .slice(-1)[0];
          if (downloadPoint) {
            const mbps = (downloadPoint.bps / 1000000).toFixed(2);
            setMetrics((prev) => ({ ...prev, download: mbps }));
            setDownloadData((prev) => [
              ...prev,
              {
                time: prev.length,
                speed: parseFloat(mbps),
              },
            ]);
          }
          break;

        case 'upload':
          const uploadPoint = results.getUploadBandwidthPoints().slice(-1)[0];
          if (uploadPoint) {
            const mbps = (uploadPoint.bps / 1000000).toFixed(2);
            setMetrics((prev) => ({ ...prev, upload: mbps }));
            setUploadData((prev) => [
              ...prev,
              {
                time: prev.length,
                speed: parseFloat(mbps),
              },
            ]);
          }
          break;

        case 'latency':
          const latency = results.getUnloadedLatency();
          const jitter = results.getUnloadedJitter();
          if (latency) {
            setMetrics((prev) => ({
              ...prev,
              latency: latency.toFixed(1),
              jitter: jitter ? jitter.toFixed(1) : prev.jitter,
            }));
          }
          break;

        case 'packetLoss':
          const packetLoss = results.getPacketLoss();
          if (packetLoss !== null) {
            setMetrics((prev) => ({
              ...prev,
              packetLoss: (packetLoss * 100).toFixed(1),
            }));
          }
          break;
      }
    };

    speedTestRef.current.onFinish = () => {
      setTestStatus('completed');
      calculateNetworkScores();
    };

    speedTestRef.current.onError = (error) => {
      console.error('Speed test error:', error);
      setTestStatus('error');
    };
  };

  useEffect(() => {
    initializeSpeedTest();
    return () => {
      if (speedTestRef.current) {
        speedTestRef.current.pause();
      }
    };
  }, []);

  const calculateNetworkScores = () => {
    const download = parseFloat(metrics.download);
    const upload = parseFloat(metrics.upload);
    const latency = parseFloat(metrics.latency);
    const jitter = parseFloat(metrics.jitter);
    const packetLoss = parseFloat(metrics.packetLoss);

    const gamingScore = Math.round(
      (Math.max(0, 100 - latency / 2) +
        Math.max(0, 100 - jitter * 5) +
        Math.max(0, 100 - packetLoss * 10)) /
        3
    );

    const streamingScore = Math.round(
      Math.min(100, (download / 25) * 100) * 0.8 +
        Math.min(100, (upload / 5) * 100) * 0.2
    );

    const rtcScore = Math.round(
      Math.max(0, 100 - latency / 2) * 0.4 +
        Math.max(0, 100 - jitter * 5) * 0.3 +
        Math.min(100, (upload / 5) * 100) * 0.3
    );

    setNetworkScores({
      gaming: gamingScore,
      streaming: streamingScore,
      rtc: rtcScore,
    });
  };

  const startTest = () => {
    setTestStatus('running');
    setDownloadData([]);
    setUploadData([]);
    setMetrics({
      download: 0,
      upload: 0,
      latency: 0,
      jitter: 0,
      packetLoss: 0,
    });
    setNetworkScores(null);
    setServerInfo(null);

    try {
      // Reinitialize the speed test instance
      initializeSpeedTest();
      // Start the test
      speedTestRef.current.restart();
    } catch (error) {
      console.error('Failed to start speed test:', error);
      setTestStatus('error');
    }
  };

  const pauseTest = () => {
    if (speedTestRef.current) {
      speedTestRef.current.pause();
      setTestStatus('paused');
    }
  };

  return (
    <div className='space-y-8'>
      <MetricsDisplay metrics={metrics} />

      <TestControls
        status={testStatus}
        onStart={startTest}
        onPause={pauseTest}
      />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {serverInfo && <ServerInfo serverInfo={serverInfo} />}
        {networkScores && <NetworkQuality scores={networkScores} />}
      </div>

      {serverInfo && serverInfo.latitude && serverInfo.longitude && (
        <LocationMap serverInfo={serverInfo} />
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h3 className='text-lg font-semibold mb-4'>Download Speed</h3>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={downloadData}>
              <XAxis dataKey='time' />
              <YAxis domain={[0, 'auto']} />
              <Tooltip formatter={(value) => `${value} Mbps`} />
              <Line
                type='monotone'
                dataKey='speed'
                stroke='#FF6B6B'
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h3 className='text-lg font-semibold mb-4'>Upload Speed</h3>
          <ResponsiveContainer width='100%' height={200}>
            <LineChart data={uploadData}>
              <XAxis dataKey='time' />
              <YAxis domain={[0, 'auto']} />
              <Tooltip formatter={(value) => `${value} Mbps`} />
              <Line
                type='monotone'
                dataKey='speed'
                stroke='#4ECDC4'
                strokeWidth={2}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SpeedTestComponent;
