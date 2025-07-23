# Real-Time Speech to Text Application

A modern, real-time speech-to-text application built with React, TypeScript, and Azure AI Speech Services. This application provides continuous speech recognition with support for multiple languages and an intuitive user interface.

## 🎬 Preview

You can watch a preview of the application in action below:
![Real-Time Speech to Text App Preview](/doc/intro.gif)

## 🚀 Features

- **Real-time Speech Recognition**: Continuous speech-to-text conversion powered by Azure AI
- **Multi-language Support**: Currently supports English (US/IN) and Sinhala (සිංහල)
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Live Transcription**: See your words appear as you speak with intermediate results
- **Cross-platform**: Works on Windows, macOS, and Linux
- **Secure Token Management**: Automatic token refresh with secure cookie storage

## 🛠️ Technology Stack

**Frontend:**

- React 19 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Lucide React for icons
- Azure Cognitive Services Speech SDK

**Backend:**

- Node.js with Express
- TypeScript
- CORS enabled for cross-origin requests
- Azure Speech Services integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- An [Azure subscription](https://azure.microsoft.com/free/) with Speech Services enabled

## 🔧 Setup Guide

### 1. Azure Speech Services Setup

1. **Create an Azure Speech Service resource:**

   - Go to the [Azure Portal](https://portal.azure.com)
   - Create a new "Speech Services" resource
   - Note down the **Key** and **Region** from the resource

2. **Configure Environment Variables:**
   - In the `api` folder, create a `.env` file:
   ```env
   SPEECH_KEY=your_azure_speech_key_here
   SPEECH_REGION=your_azure_region_here
   PORT=3000
   ```

### 2. Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/zaselalk/realtime-speech-to-text
   cd speech-to-text
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd api
   npm install
   cd ..
   ```

### 3. Running the Application

1. **Start the backend server:**

   ```bash
   cd api
   npm run dev
   ```

   The API server will start on `http://localhost:3000`

2. **Start the frontend development server:**

   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

3. **Open your browser:**
   Navigate to `http://localhost:5173` to use the application

## 🎤 Usage

1. **Select Language**: Choose your preferred language from the dropdown menu
2. **Start Recording**: Click the microphone button to begin speech recognition
3. **Speak Clearly**: Speak into your microphone - you'll see live transcription
4. **Stop Recording**: Click the microphone button again to stop

## 📁 Project Structure

```
speech-to-text/
├── api/                    # Backend Express server
│   ├── src/
│   │   └── server.ts      # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env               # Environment variables
├── src/                   # Frontend React application
│   ├── components/        # Reusable React components
│   │   ├── Header.tsx
│   │   ├── MicroPhone.tsx
│   │   └── SelectLanguage.tsx
│   ├── App.tsx           # Main application component
│   ├── token_util.ts     # Azure token management
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── package.json          # Frontend dependencies
└── README.md
```

## 🔒 Security Notes

- The backend server securely manages Azure Speech Service tokens
- Tokens are automatically refreshed and stored in secure cookies
- Never expose your Azure Speech Service keys in the frontend code

## 🚀 Building for Production

1. **Build the frontend:**

   ```bash
   npm run build
   ```

2. **Build the backend:**

   ```bash
   cd api
   npm run build
   ```

3. **Start the production server:**
   ```bash
   cd api
   npm start
   ```

## 🛠️ Available Scripts

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend:**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Troubleshooting

**Common Issues:**

1. **Microphone not working**: Ensure your browser has microphone permissions
2. **Token errors**: Verify your Azure Speech Service keys and region
3. **CORS errors**: Make sure the backend server is running on port 3000
4. **Build errors**: Ensure all dependencies are installed with `npm install`

## 📚 Additional Resources

- [Azure Speech Services Documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
