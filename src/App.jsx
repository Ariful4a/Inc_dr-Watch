import React, { useState, useEffect } from 'react';
import { Plus, Minus, Play, Pause, RotateCcw } from 'lucide-react';

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const startStop = () => setIsRunning((prev) => !prev);
  const reset = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Counter & Stopwatch
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Counter Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
              Number Counter
            </h2>

            <div className="flex flex-col items-center space-y-6">
              <div className="text-6xl font-bold text-indigo-400 bg-gray-900 rounded-2xl px-8 py-4 min-w-[200px] text-center border border-gray-600">
                {count}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={decrement}
                  className="flex items-center justify-center w-14 h-14 bg-red-600 hover:bg-red-500 text-white rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Minus size={24} />
                </button>

                <button
                  onClick={increment}
                  className="flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-500 text-white rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Plus size={24} />
                </button>
              </div>

              <button
                onClick={() => setCount(0)}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-xl shadow-md transition-all duration-200 hover:scale-105"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Stopwatch Section */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-200 mb-6 text-center">
              Stopw<span className='text-orange-600'>atch</span>
            </h2>

            <div className="flex flex-col items-center space-y-6">
              <div className="text-4xl font-mono font-bold text-blue-400 bg-gray-900 rounded-2xl px-6 py-4 tracking-wider border border-gray-600">
                {formatTime(time)}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={startStop}
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 ${
                    isRunning
                      ? 'bg-orange-600 hover:bg-orange-500 text-white'
                      : 'bg-green-600 hover:bg-green-500 text-white'
                  }`}
                >
                  {isRunning ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <button
                  onClick={reset}
                  className="flex items-center justify-center w-14 h-14 bg-gray-600 hover:bg-gray-500 text-white rounded-2xl shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <RotateCcw size={24} />
                </button>
              </div>

              <div className="text-sm text-gray-400 text-center">
                {isRunning ? 'Running...' : 'Stopped'}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 text-center">
            Current Stats
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-600">
              <div className="text-2xl font-bold text-indigo-400">{count}</div>
              <div className="text-sm text-gray-400">Counter <span className='shadow-2xl text-amber-300'>Value</span></div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-600">
              <div className="text-2xl font-bold text-blue-400">{formatTime(time)}</div>
              <div className="text-sm text-gray-400">Elapsed <span className='text-amber-300'>Time</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
