import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize, Maximize, Phone, Mail, MapPin, Info, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

interface Message {
  content: string;
  isBot: boolean;
  timestamp: Date;
  buttons?: Array<{
    text: string;
    action: string;
    path?: string;
  }>;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      content: "Hi! I'm your RCS Construction Assistant. How can I help you with your construction needs today?", 
      isBot: true, 
      timestamp: new Date(),
      buttons: [
        { text: "Our Services", action: "What services do you offer?", path: "/services" },
        { text: "Get a Quote", action: "I need a quote for my project", path: "/contact" },
        { text: "View Projects", action: "Show me your projects", path: "/projects" }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const handleButtonClick = (action: string, path?: string) => {
    const userMessage = { content: action, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    
    handleUserQuery(action).then(() => {
      if (path) {
        setTimeout(() => {
          navigate(path);
        }, 2000);
      }
    });
  };

  const getCompanyInfo = (query: string) => {
    if (query.toLowerCase().includes('about') || query.toLowerCase().includes('company') || query.toLowerCase().includes('rcs')) {
      return {
        content: "Rodelas Construction Services (RCS) has been a trusted name in construction since 2010. We specialize in:\n\n• Commercial & Residential Construction\n• Renovation & Remodeling\n• Construction Management\n\nOur team of experienced professionals is committed to delivering high-quality projects on time and within budget.",
        buttons: [
          { text: "Our Services", action: "Tell me about your services", path: "/services" },
          { text: "View Projects", action: "Show me your projects", path: "/projects" },
          { text: "Contact Us", action: "I want to get in touch", path: "/contact" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('arnold') || query.toLowerCase().includes('ceo') || query.toLowerCase().includes('founder') || query.toLowerCase().includes('owner')) {
      return {
        content: "Engr. Arnold Rodelas is the founder and CEO of Rodelas Construction Services. With his extensive experience in construction and engineering, he established RCS in 2010. Under his leadership, RCS has grown to become one of the most trusted names in the construction industry, known for delivering excellence in every project.",
        buttons: [
          { text: "Our Projects", action: "Show our completed projects", path: "/projects" },
          { text: "Get in Touch", action: "Contact us", path: "/contact" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('contact') || query.toLowerCase().includes('reach')) {
      return {
        content: "You can contact Rodelas Construction Services through:\n\nPhone:\n• Globe: 09670598903/09951858305\n• Landline: 049-547-0926\n\nEmail: engineeringdreams.rcs@gmail.com\n\nAddress: Block 8 Lot 7 Phase 2 Gregory Street, St. Joseph Village, 7 Marinig, Cabuyao, 4025 Laguna",
        buttons: [
          { text: "Call Now", action: "I want to call" },
          { text: "Send Email", action: "I want to email" },
          { text: "View Map", action: "Show me your location" },
          { text: "Contact Page", action: "Go to contact page", path: "/contact" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('pricing') || query.toLowerCase().includes('cost') || query.toLowerCase().includes('estimate')) {
      return {
        content: "Our pricing depends on the project size and specifications. For a basic estimate:\n\n• Residential construction: ₱35,000-₱50,000 per sqm\n• Commercial construction: ₱45,000-₱65,000 per sqm\n• Renovation: ₱15,000-₱30,000 per sqm\n\nWant me to calculate an estimate for you?",
        buttons: [
          { text: "Calculate", action: "I need a price calculation" },
          { text: "Talk to Sales", action: "I want to talk to someone about pricing", path: "/contact" }
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
        content: "Our main office is located at: Block 8 Lot 7 Phase 2 Gregory Street, St. Joseph Village, 7 Marinig, Cabuyao, 4025 Laguna. We're open Monday-Friday, 8am-5pm.",
        buttons: [
          { text: "Get Directions", action: "I need directions" },
          { text: "Contact Us", action: "Go to contact page", path: "/contact" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('service') || query.toLowerCase().includes('offer')) {
      return {
        content: "At Rodelas Construction Services, we offer various construction services including:\n\n• Commercial Construction\n• Residential Construction\n• Renovation & Remodeling\n• Construction Management\n\nWould you like to know more about any specific service?",
        buttons: [
          { text: "View All Services", action: "Go to services page", path: "/services" },
          { text: "Commercial", action: "Tell me about commercial construction" },
          { text: "Residential", action: "Tell me about residential construction" }
        ]
      };
    }
    
    if (query.toLowerCase().includes('project') || query.toLowerCase().includes('portfolio') || query.toLowerCase().includes('past work')) {
      return {
        content: "We have completed numerous successful projects across various categories including commercial buildings, residential complexes, renovations, and more. Would you like to see our project portfolio?",
        buttons: [
          { text: "View Projects", action: "Go to projects page", path: "/projects" },
          { text: "Commercial Projects", action: "Show me your commercial projects", path: "/projects" },
          { text: "Residential Projects", action: "Show me your residential projects", path: "/projects" }
        ]
      };
    }
    
    return null;
  };
  
  const processCalculation = (query: string) => {
    const numberMatch = query.match(/\d+/);
    const sqm = numberMatch ? parseInt(numberMatch[0]) : null;
    
    if (!sqm) return null;
    
    let baseRate = 0;
    let projectType = "";
    
    if (query.toLowerCase().includes('residential')) {
      baseRate = 45000;
      projectType = "residential construction";
    } else if (query.toLowerCase().includes('commercial')) {
      baseRate = 58000;
      projectType = "commercial construction";
    } else if (query.toLowerCase().includes('renovation') || query.toLowerCase().includes('remodel')) {
      baseRate = 25000;
      projectType = "renovation";
    } else {
      return null;
    }
    
    if (query.toLowerCase().includes('premium')) {
      baseRate *= 1.3;
    } else if (query.toLowerCase().includes('basic')) {
      baseRate *= 0.8;
    }
    
    const estimate = baseRate * sqm;
    const formattedEstimate = new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP' 
    }).format(estimate);
    
    return {
      content: `Based on your ${sqm} sqm ${projectType} project, the estimated cost would be around ${formattedEstimate}. Note that this is just an initial estimate. For a more accurate quotation, we'd be happy to have our team assess your specific requirements. Would you like to discuss your project with us?`,
      buttons: [
        { text: "Schedule Consultation", action: "I want to schedule a consultation", path: "/contact" },
        { text: "Learn More", action: "Tell me more about your services", path: "/services" }
      ]
    };
  };

  const handleUserQuery = async (userQuery: string) => {
    setIsLoading(true);

    const companyInfoResponse = getCompanyInfo(userQuery);
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
                  text: `You are the AI assistant for Rodelas Construction Services (RCS). Key information:
                  
                  Company Info:
                  - Founded by Engr. Arnold Rodelas in 2010
                  - Specializes in commercial construction, residential construction, renovation & remodeling
                  - Known for quality workmanship and professional service
                  - Based in Cabuyao, Laguna
                  
                  Communication Style:
                  1. Use conversational Taglish (70% English, 30% Tagalog)
                  2. Be professional but friendly
                  3. Show expertise in construction
                  4. Highlight RCS's experience and capabilities
                  5. Always aim to move the conversation towards a consultation or quote
                  
                  Now answer this query in the style described: ${userQuery}`
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
      
      let botResponse = "I apologize, but I couldn't process your request. Please try again or contact us directly.";
      let buttons: Array<{text: string, action: string, path?: string}> = [];
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        botResponse = data.candidates[0].content.parts[0].text;
        
        if (botResponse.toLowerCase().includes('service')) {
          buttons.push({ text: "View Services", action: "Tell me more about your services", path: "/services" });
        }
        if (botResponse.toLowerCase().includes('contact') || botResponse.toLowerCase().includes('email') || botResponse.toLowerCase().includes('call')) {
          buttons.push({ text: "Contact Us", action: "I want to get in touch", path: "/contact" });
        }
        if (botResponse.toLowerCase().includes('project') || botResponse.toLowerCase().includes('portfolio')) {
          buttons.push({ text: "Our Projects", action: "Show me your projects", path: "/projects" });
        }
        if (botResponse.toLowerCase().includes('quote') || botResponse.toLowerCase().includes('cost') || botResponse.toLowerCase().includes('price')) {
          buttons.push({ text: "Get Quote", action: "I need a quote for my project", path: "/contact" });
        }
        if (botResponse.toLowerCase().includes('consult') || botResponse.toLowerCase().includes('meet') || botResponse.toLowerCase().includes('discuss')) {
          buttons.push({ text: "Schedule Consultation", action: "I want to schedule a consultation", path: "/contact" });
        }
      }

      setMessages(prev => [...prev, { 
        content: botResponse, 
        isBot: true, 
        timestamp: new Date(),
        buttons: buttons.length > 0 ? buttons : undefined
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        content: "I'm having trouble connecting right now. Please try again or contact us directly at 09670598903 or engineeringdreams.rcs@gmail.com", 
        isBot: true, 
        timestamp: new Date(),
        buttons: [
          { text: "Contact Us", action: "Go to contact page", path: "/contact" }
        ]
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

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
      <button
        onClick={toggleChat}
        className={`fixed bottom-20 md:bottom-6 right-6 z-40 bg-rcs-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        } hover:scale-105`}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6" />
        <span className="hidden md:inline text-sm font-medium">Chat with us</span>
      </button>

      <div
        ref={chatBoxRef}
        className={`fixed z-50 bottom-0 md:bottom-6 right-0 md:right-6 bg-white rounded-lg shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        } ${isMinimized ? 'h-[60px] md:w-[300px]' : 'h-[80vh] md:h-[600px] w-full md:w-[400px]'} max-w-[100vw] md:max-w-[95vw]`}
      >
        <div className="bg-rcs-blue text-white p-4 flex items-center justify-between shadow-md">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-full mr-3">
              <MessageSquare className="h-5 w-5 text-rcs-blue" />
            </div>
            <div>
              <h3 className="font-semibold text-sm md:text-base">RCS Assistant</h3>
              {!isMinimized && (
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs text-gray-100">Online | Ready to help</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleChat} 
              className="hover:bg-blue-800 rounded p-1.5 transition-colors"
              aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
            >
              {isMinimized ? <Maximize size={16} /> : <Minimize size={16} />}
            </button>
            <button 
              onClick={closeChat} 
              className="hover:bg-blue-800 rounded p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.isBot ? 'justify-start' : 'justify-end'} items-end`}
              >
                {msg.isBot && (
                  <div className="w-6 h-6 rounded-full bg-rcs-blue flex items-center justify-center mr-2 mb-1 shadow-sm">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-lg p-4 shadow-sm ${
                    msg.isBot
                      ? 'bg-white text-gray-800 border border-gray-100'
                      : 'bg-rcs-blue text-white'
                  }`}
                >
                  <p className="text-sm md:text-base break-words leading-relaxed">{msg.content}</p>
                  <p className="text-xs text-right mt-2 opacity-70">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  
                  {msg.isBot && msg.buttons && msg.buttons.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {msg.buttons.map((btn, btnIndex) => (
                        <Button
                          key={btnIndex}
                          size="sm"
                          variant="outline"
                          className="bg-white text-rcs-blue border-rcs-blue hover:bg-rcs-blue hover:text-white text-xs py-2 h-auto min-h-[36px] px-4 rounded-md transition-all duration-300 hover:scale-105"
                          onClick={() => handleButtonClick(btn.action, btn.path)}
                        >
                          {btn.text === "Call Now" && <Phone className="h-3.5 w-3.5 mr-1.5" />}
                          {btn.text === "Send Email" && <Mail className="h-3.5 w-3.5 mr-1.5" />}
                          {btn.text === "View Map" && <MapPin className="h-3.5 w-3.5 mr-1.5" />}
                          {btn.text === "Calculate" && <Calculator className="h-3.5 w-3.5 mr-1.5" />}
                          {btn.text === "Services Details" && <Info className="h-3.5 w-3.5 mr-1.5" />}
                          {btn.text}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4 items-end">
                <div className="w-6 h-6 rounded-full bg-rcs-blue flex items-center justify-center mr-2 mb-1 shadow-sm">
                  <MessageSquare className="h-3 w-3 text-white" />
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm max-w-[80%] border border-gray-100">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 bg-rcs-blue rounded-full animate-bounce"></div>
                    <div className="w-2.5 h-2.5 bg-rcs-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2.5 h-2.5 bg-rcs-blue rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {!isMinimized && (
          <form onSubmit={sendMessage} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rcs-blue text-base bg-gray-50"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="bg-rcs-blue text-white p-3 rounded-lg hover:bg-blue-800 transition-all duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed min-w-[48px] hover:scale-105"
                disabled={isLoading || !message.trim()}
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default ChatBot;
