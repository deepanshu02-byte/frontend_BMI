import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type InputType = "text" | "email" | "password" | "number" | "textarea" | "select" | "multiselect";

interface OptionType {
    label: string;
    value: string;
}

interface InputProps {
    id: string;
    label: string;
    type: InputType;
    value: string | string[];
    onChange: (name: string, value: unknown) => void;
    onBlur?: () => void;
    options?: OptionType[];
    required?: boolean;
    error?: string;
    placeholder?: string;
    className?: string;
    validation?: {
        pattern?: RegExp;
        minLength?: number;
        maxLength?: number;
    };
}

export const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    value,
    onChange,
    onBlur,
    options = [],
    required = false,
    error,
    placeholder = " ",
    className = "",
    validation = {},
}) => {
    const animatedComponents = makeAnimated();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        onChange(e.target.name, e.target.value);
    };

    const handleSelectChange = (selected: unknown) => {
        if (type === "multiselect") {
            onChange(id, (selected as OptionType[]).map((opt) => opt.value));
        } else {
            onChange(id, (selected as OptionType)?.value || "");
        }
    };

    const inputClasses = `block py-2.5 px-0 w-full text-sm text-gray-800 bg-transparent border-0 border-b-2 
    border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer 
    dark:text-gray-800 dark:border-gray-600 dark:focus:border-blue-500 ${className}`;

    return (
        <div className="relative z-0 w-full mb-5 group">
            {["text", "email", "password", "number"].includes(type) && (
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value as string}
                    onChange={handleChange}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    pattern={validation.pattern?.source}
                    minLength={validation.minLength}
                    maxLength={validation.maxLength}
                    className={inputClasses}
                />
            )}

            {type === "textarea" && (
                <textarea
                    id={id}
                    name={id}
                    value={value as string}
                    onChange={handleChange}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    minLength={validation.minLength}
                    maxLength={validation.maxLength}
                    className={`${inputClasses} resize-none h-24`}
                />
            )}

            {(type === "select" || type === "multiselect") && (
                <>
                    <label className="block mb-1 text-sm text-gray-800">{label}</label>
                    <Select
                        isMulti={type === "multiselect"}
                        options={options}
                        value={
                            type === "multiselect"
                                ? options.filter((opt) => (value as string[]).includes(opt.value))
                                : options.find((opt) => opt.value === value)
                        }
                        onChange={handleSelectChange}
                        components={animatedComponents}
                        className="react-select-container text-sm"
                        classNamePrefix="react-select"
                        menuPlacement="auto"
                        maxMenuHeight={150}
                        menuPortalTarget={document.body}
                        styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                        }}

                    />
                </>
            )}

            {type !== "select" && type !== "multiselect" && (
                <label
                    htmlFor={id}
                    className="absolute text-sm text-gray-800 dark:text-gray-600 duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] 
            peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:left-0"
                >
                    {label}
                </label>
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};