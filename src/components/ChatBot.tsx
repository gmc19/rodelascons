
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize, Maximize, Phone, Mail, MapPin, Info, Calculator } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: Array<{
    text: string;
    action: string;
  }>;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Hello! I'm the RCS assistant. How can I help with your construction needs today?", 
      isBot: true, 
      timestamp: new Date(),
      buttons: [
        { text: "Services", action: "What services do you offer?" },
        { text: "Contact", action: "How can I contact you?" },
        { text: "Pricing", action: "Can you tell me about your pricing?" }
      ]
    }
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

  const handleButtonClick = (action: string) => {
    // Add user message showing what button they clicked
    const userMessage = { content: action, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    // Process the button action
    handleUserQuery(action);
  };

  const getCompanyInfo = (query: string) => {
    if (query.toLowerCase().includes('contact') || query.toLowerCase().includes('reach')) {
      return {
        content: "You can contact Rodelas Construction Services through:\n\nPhone: (02) 8123-4567\nEmail: info@rodelasconstruction.com\nAddress: 123 Builders Avenue, Makati City, Philippines",
        buttons: [
          { text: "Call Now", action: "I want to call" },
          { text: "Send Email", action: "I want to email" },
          { text: "View Map", action: "Show me your location" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('pricing') || query.toLowerCase().includes('cost') || query.toLowerCase().includes('estimate')) {
      return {
        content: "Our pricing depends on the project size and specifications. For a basic estimate:\n\n• Residential construction: ₱35,000-₱50,000 per sqm\n• Commercial construction: ₱45,000-₱65,000 per sqm\n• Renovation: ₱15,000-₱30,000 per sqm\n\nWant me to calculate an estimate for you?",
        buttons: [
          { text: "Calculate", action: "I need a price calculation" },
          { text: "Talk to Sales", action: "I want to talk to someone about pricing" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('calculate') || query.toLowerCase().includes('estimation')) {
      return {
        content: "Para sa price calculation, I need a few details:\n\n• Project type (residential, commercial, renovation)\n• Approximate size in square meters\n• Basic, Standard, or Premium finish\n\nKindly share these details para I can give you an estimate.",
        buttons: []
      };
    }
    
    if (query.toLowerCase().includes('location') || query.toLowerCase().includes('address') || query.toLowerCase().includes('map')) {
      return {
        content: "Our main office is located at: 123 Builders Avenue, Makati City, Philippines. We're open Monday-Friday, 8am-5pm.",
        buttons: [
          { text: "Get Directions", action: "I need directions" }
        ]
      };
    }
    
    return null;
  };
  
  const processCalculation = (query: string) => {
    // Simple regex to extract numbers and project type
    const numberMatch = query.match(/\d+/);
    const sqm = numberMatch ? parseInt(numberMatch[0]) : null;
    
    if (!sqm) return null;
    
    let baseRate = 0;
    let projectType = "";
    
    if (query.toLowerCase().includes('residential')) {
      baseRate = 42500;
      projectType = "residential construction";
    } else if (query.toLowerCase().includes('commercial')) {
      baseRate = 55000;
      projectType = "commercial construction";
    } else if (query.toLowerCase().includes('renovation') || query.toLowerCase().includes('remodel')) {
      baseRate = 22500;
      projectType = "renovation";
    } else {
      return null;
    }
    
    // Adjust for finish quality
    if (query.toLowerCase().includes('premium')) {
      baseRate *= 1.2;
    } else if (query.toLowerCase().includes('basic')) {
      baseRate *= 0.85;
    }
    
    const estimate = baseRate * sqm;
    const formattedEstimate = new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP' 
    }).format(estimate);
    
    return {
      content: `Based on your ${sqm} sqm ${projectType} project, the estimated cost would be around ${formattedEstimate}. Note that this is just a rough estimate ha! The final price will depend on materials, design complexity, and other factors. Want to discuss your project with our team?`,
      buttons: [
        { text: "Contact Sales", action: "I want to talk to someone about my project" },
        { text: "Get Detailed Quote", action: "I need a detailed quote" }
      ]
    };
  };

  const handleUserQuery = async (userQuery: string) => {
    setIsLoading(true);

    // First check if this is a specific company info request
    const companyInfoResponse = getCompanyInfo(userQuery);
    
    // Or if it's a calculation request
    const calculationResponse = processCalculation(userQuery);
    
    if (companyInfoResponse || calculationResponse) {
      const response = companyInfoResponse || calculationResponse;
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: response!.content, 
          isBot: true, 
          timestamp: new Date(),
          buttons: response!.buttons
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
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
                  
                  IMPORTANT INSTRUCTIONS:
                  1. Respond in conversational Taglish (70% English, 30% Tagalog) like "Hi! How can I help you today? Ano ang hanap mo?" 
                  2. Don't use deep Tagalog words, use casual conversational Taglish that's easy to understand.
                  3. Keep responses friendly and helpful.
                  4. If you're asked about pricing, mention average costs for construction in the Philippines.
                  
                  Now answer this question in the style described above: ${userQuery}`
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
      let buttons: Array<{text: string, action: string}> = [];
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        botResponse = data.candidates[0].content.parts[0].text;
        
        // Add relevant buttons based on response content
        if (botResponse.toLowerCase().includes('service')) {
          buttons.push({ text: "Services Details", action: "Tell me more about your services" });
        }
        if (botResponse.toLowerCase().includes('contact') || botResponse.toLowerCase().includes('email') || botResponse.toLowerCase().includes('call')) {
          buttons.push({ text: "Contact Info", action: "How can I contact you?" });
        }
        if (botResponse.toLowerCase().includes('project') || botResponse.toLowerCase().includes('portfolio')) {
          buttons.push({ text: "See Projects", action: "Show me your past projects" });
        }
      }

      // Add bot message
      setMessages(prev => [...prev, { 
        content: botResponse, 
        isBot: true, 
        timestamp: new Date(),
        buttons: buttons.length > 0 ? buttons : undefined
      }]);
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

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage = { content: message, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    await handleUserQuery(message);
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
                  
                  {msg.isBot && msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.buttons.map((btn, btnIndex) => (
                        <Button
                          key={btnIndex}
                          size="sm"
                          variant="outline"
                          className="bg-white text-rcs-blue border-rcs-blue hover:bg-rcs-blue hover:text-white text-xs py-1 h-auto"
                          onClick={() => handleButtonClick(btn.action)}
                        >
                          {btn.text === "Call Now" && <Phone className="h-3 w-3 mr-1" />}
                          {btn.text === "Send Email" && <Mail className="h-3 w-3 mr-1" />}
                          {btn.text === "View Map" && <MapPin className="h-3 w-3 mr-1" />}
                          {btn.text === "Calculate" && <Calculator className="h-3 w-3 mr-1" />}
                          {btn.text === "Services Details" && <Info className="h-3 w-3 mr-1" />}
                          {btn.text}
                        </Button>
                      ))}
                    </div>
                  )}
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
