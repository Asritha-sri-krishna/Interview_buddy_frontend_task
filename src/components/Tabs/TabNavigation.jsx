import React, { memo } from 'react';

const TabNavigation = memo(({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex gap-12 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-4 px-0 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-purple-600 border-b-2 border-orange-500'
                : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
});

TabNavigation.displayName = 'TabNavigation';

export default TabNavigation;