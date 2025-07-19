import React from "react";
export interface ButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    isLoading?: boolean;
    isDisabled?: boolean;
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    type = "button",
    className = "",
    isLoading = false,
    isDisabled = false,
    variant = "primary",
    size = "md",
}) => {
    const baseStyles = `inline-flex items-center justify-center font-medium rounded-lg focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed`;

    const variantStyles: Record<string, string> = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    const sizeStyles: Record<string, string> = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled || isLoading}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        >
            {isLoading ? (
                <svg
                    className="w-5 h-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                </svg>
            ) : (
                label
            )}
        </button>
    );
};
