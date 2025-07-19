import React, { useState, useEffect } from "react";

interface TabItem {
    label: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    defaultActiveTab?: string;
    onTabChange?: (label: string) => void;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    defaultActiveTab,
    onTabChange,
    className = "",
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.label);

    useEffect(() => {
        if (activeTab && onTabChange) {
            onTabChange(activeTab);
        }
    }, [activeTab, onTabChange]);

    const handleTabClick = (label: string) => {
        setActiveTab(label);
    };

    const activeContent = tabs.find((tab) => tab.label === activeTab)?.content;

    return (
        <div className={`w-full ${className}`}>
            {/* Tab Headers */}
            <div className="flex flex-wrap border-b mb-4">
                {tabs.map(({ label, icon }) => (
                    <button
                        key={label}
                        onClick={() => handleTabClick(label)}
                        className={`flex items-center gap-2 py-2 px-4 transition-all duration-300 border-b-2 ${activeTab === label
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-600 hover:text-blue-600"
                            }`}
                    >
                        {icon && <span>{icon}</span>}
                        {label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">{activeContent}</div>
        </div>
    );
};
