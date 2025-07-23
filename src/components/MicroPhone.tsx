import { Mic, MicOff } from 'lucide-react'
import React from 'react'
import { LoadingSpinner } from './LoadingSpinner';

interface MicroPhoneProps {
    isRecording: boolean;
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
    isConnecting?: boolean;
}
export const MicroPhone: React.FC<MicroPhoneProps> = ({
    isRecording,
    setIsRecording,
    isConnecting
}) => {
    return (
        <div className="absolute bottom-10 right-10 flex items-end justify-center">
            <button
                onClick={() => setIsRecording(!isRecording)}
                className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${isRecording
                    ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/30'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                    }`}
            >
                {/* Show connecting */}
                {isConnecting && (<LoadingSpinner />
                )}


                {/* Show mic off icon */}
                {!isConnecting && isRecording && (
                    <MicOff className="w-8 h-8 text-white" />
                )}

                {!isConnecting && !isRecording && (
                    <Mic className="w-8 h-8 text-white" />
                )}
            </button>
            {isRecording && (
                <>
                    <div className="absolute w-16 h-16  animate-ping bg-blue-400 rounded-full opacity-20"></div>
                    <div className="absolute w-16 h-16  animate-pulse bg-blue-500 rounded-full opacity-30 animation-delay-150"></div>
                    <div className="absolute w-16 h-16  animate-ping bg-blue-600 rounded-full opacity-20 animation-delay-300"></div>
                </>
            )}
        </div>
    )
}
