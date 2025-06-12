import { useState } from 'react';

const tabs = ['Overview', 'Ingredients', 'Reviews'];

export default function TailwindTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => setActiveTab(idx)}
            className={`flex-1 text-center py-2 px-4 font-medium ${
              activeTab === idx
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="p-4 border border-t-0 rounded-b-lg bg-white">
        {activeTab === 0 && <p>Overview content here</p>}
        {activeTab === 1 && <p>Ingredients list here</p>}
        {activeTab === 2 && <p>Customer reviews here</p>}
      </div>
    </div>
  );
}
