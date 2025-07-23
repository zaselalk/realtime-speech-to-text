import React from "react";

interface LanguageSelectionProps {
    onLanguageChange: (language: string) => void;
    selectedLanguage: string;
}
export const SelectLanguage: React.FC<LanguageSelectionProps> = ({
    onLanguageChange,
    selectedLanguage
}) => {

    return (
        <div className="mb-8">
            <div className="max-w-xs mx-auto">
                <select
                    value={selectedLanguage}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="w-full  border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                >
                    <option value="en-IN" className="bg-slate-800">English (IN)</option>
                    <option value="en-US" className="bg-slate-800">English (US)</option>
                    <option value="si-LK" className="bg-slate-800">Sinhala (සිංහල)</option>
                </select>
            </div>
        </div>
    )
}
