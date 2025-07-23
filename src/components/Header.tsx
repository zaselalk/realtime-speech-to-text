import { Volume2 } from 'lucide-react'
import React from 'react'
import { SelectLanguage } from './SelectLanguage'

interface HeaderProps {
    onLanguageChange: (language: string) => void;
    language: string;
}

export const Header: React.FC<HeaderProps> = ({ language, onLanguageChange }) => {
    return (
        <header className='flex justify-between'>
            <div className=" mb-12">
                <div className="flex justify-start items-center mb-4">
                    <Volume2 className="w-8 h-8 text-blue-400 mr-3" />
                    <h1 className="text-4xl font-bold text-white">
                        Real-Time Speech Recognition
                    </h1>
                </div>
                <p className="text-slate-300 text-lg">
                    Powered by Azure AI speech
                </p>
            </div>
            <SelectLanguage selectedLanguage={language} onLanguageChange={onLanguageChange} />
        </header>
    )
}
