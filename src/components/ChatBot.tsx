
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize, Maximize } from 'lucide-react';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! I'm the RCS assistant. How can I help with your construction needs today?", isBot: true, timestamp: new Date() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const apiKey = "AIzaSyBdGQJXvMp4BMLWPpoxCTk2U9iB5phhcz4";

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { content: message, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setMessage('');

    try {
      // Updated to use gemini-2.0-flash model
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are a helpful assistant for Rodelas Construction Services. Answer questions about construction services, projects, and general inquiries. 
                  If asked about services, mention commercial construction, residential construction, renovation & remodeling, and construction management.
                  If asked about the company, mention that RCS has been operating since 2010 with a focus on quality and customer satisfaction.
                  Now answer this question in a friendly manner: ${message}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      let botResponse = "I apologize, but I couldn't process your request. Please try again.";
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        botResponse = data.candidates[0].content.parts[0].text;
      }

      // Add bot message
      setMessages(prev => [...prev, { content: botResponse, isBot: true, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages(prev => [...prev, { 
        content: "I'm having trouble connecting right now. Please try again later or contact us directly.", 
        isBot: true, 
        timestamp: new Date() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 md:bottom-6 right-6 z-40 bg-rcs-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* Chat window */}
      <div
        ref={chatBoxRef}
        className={`fixed z-50 bottom-20 md:bottom-6 right-6 bg-white rounded-lg shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        } ${isMinimized ? 'h-14' : 'h-[500px]'} w-[350px] max-w-[95vw]`}
      >
        {/* Chat header */}
        <div className="bg-rcs-blue text-white p-3 flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">RCS Construction Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleChat} 
              className="hover:bg-blue-800 rounded p-1"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
            </button>
            <button 
              onClick={closeChat} 
              className="hover:bg-blue-800 rounded p-1"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat messages */}
        {!isMinimized && (
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-rcs-blue text-white'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs text-right mt-1 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Chat input */}
        {!isMinimized && (
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rcs-blue"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-rcs-blue text-white px-4 py-2 rounded-r-lg hover:bg-blue-800 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isLoading || !message.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default ChatBot;
