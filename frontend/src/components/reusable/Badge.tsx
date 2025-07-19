import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    color?: "green" | "yellow" | "red" | "gray";
}

export const Badge: React.FC<BadgeProps> = ({ children, color = "gray" }) => {
    const colorClasses: Record<string, string> = {
        green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };

    return (
        <span
            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm ${colorClasses[color]}`}
        >
            {children}
        </span>
    );
};
