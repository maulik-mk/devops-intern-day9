import React, { useEffect, useState, useMemo } from 'react';

function App() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchLogs = async (silent = false) => {
      if (!silent) setError(null);
      try {
        const res = await fetch('/logs/all');
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setLogs(data);
      } catch (e) {
        console.error("Fetch failed:", e);
        if (!silent) {
          setError("Failed to load logs. Check if the server is running.");
        }
      }
    };

    fetchLogs();

    const interval = setInterval(() => fetchLogs(true), 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return logs.filter(log =>
      log._id.toLowerCase().includes(q) ||
      log.level.toLowerCase().includes(q) ||
      log.message.toLowerCase().includes(q) ||
      new Date(log.timestamp).toLocaleString().toLowerCase().includes(q)
    );
  }, [logs, searchTerm]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white font-sans relative overflow-hidden gradient-bg">
      <div className="relative z-10 w-full max-w-6xl">
        <h2 className="text-5xl font-bold mb-6 text-center bg-clip-text bg-gradient-to-r from-cyan-400 to-black-500">
          Application Logs
        </h2>

        <input
          type="text"
          placeholder="Search logs..."
          className="w-full mb-4 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-lg text-sm backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 bg-gray-900 bg-opacity-70 text-white font-semibold px-4 py-2 uppercase text-xs">
            <span>ID</span>
            <span>Timestamp</span>
            <span>Level</span>
            <span>Message</span>
          </div>

          {error && (
            <div className="text-center py-4 text-red-500 bg-red-900 bg-opacity-10">{error}</div>
          )}

          {!error && filteredLogs.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              {searchTerm ? "No matching logs found." : "No logs available."}
            </div>
          )}

          {!error && filteredLogs.length > 0 && (
            <div className="max-h-[50vh] overflow-y-auto px-4 py-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              {filteredLogs.map((log) => (
                <div
                  key={log._id}
                  className="grid grid-cols-1 md:grid-cols-4 border border-gray-700 rounded-md px-3 py-2 text-gray-200 hover:bg-gray-700 transition"
                >
                  <span className="truncate font-mono break-all pr-2" title={log._id}>{log._id}</span>
                  <span className="font-light pr-2">{new Date(log.timestamp).toLocaleString()}</span>
                  <span className={`font-semibold uppercase tracking-wide pr-2 ${
                    log.level === 'error' ? 'text-red-400' :
                    log.level === 'warn' ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {log.level}
                  </span>
                  <span className="break-words" title={log.message}>{log.message}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
