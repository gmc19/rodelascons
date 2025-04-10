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
      content: "Hi! I'm your RCS Assistant. How can I help you today?", 
      isBot: true, 
      timestamp: new Date(),
      buttons: [
        { text: "Services", action: "What are your services?", path: "/services" },
        { text: "Get Quote", action: "I need a quote", path: "/contact" },
        { text: "Projects", action: "Show me your projects", path: "/projects" }
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

  // Removed getCompanyInfo function entirely to rely on the LLM
  
  const processCalculation = (query: string) => {
    const numberMatch = query.match(/\d+/);
    const sqm = numberMatch ? parseInt(numberMatch[0]) : null;
    
    if (!sqm) return null;
    
    let baseRate = 0;
    let projectType = "";
    let finishType = "standard";
    
    // Determine project type
    if (query.toLowerCase().includes('residential')) {
      projectType = "residential construction";
      if (query.toLowerCase().includes('premium')) {
        baseRate = 65000;
        finishType = "premium";
      } else if (query.toLowerCase().includes('basic')) {
        baseRate = 40000;
        finishType = "basic";
      } else {
        baseRate = 50000;
      }
    } else if (query.toLowerCase().includes('commercial')) {
      projectType = "commercial construction";
      if (query.toLowerCase().includes('premium')) {
        baseRate = 75000;
        finishType = "premium";
      } else if (query.toLowerCase().includes('basic')) {
        baseRate = 50000;
        finishType = "basic";
      } else {
        baseRate = 60000;
      }
    } else if (query.toLowerCase().includes('renovation') || query.toLowerCase().includes('remodel')) {
      projectType = "renovation";
      if (query.toLowerCase().includes('premium')) {
        baseRate = 40000;
        finishType = "premium";
      } else if (query.toLowerCase().includes('basic')) {
        baseRate = 20000;
        finishType = "basic";
      } else {
        baseRate = 30000;
      }
    } else {
      return null;
    }
    
    const estimate = baseRate * sqm;
    const formattedEstimate = new Intl.NumberFormat('en-PH', { 
      style: 'currency', 
      currency: 'PHP' 
    }).format(estimate);
    
    return {
      content: `Based on your requirements:\n\n• Project Type: ${projectType}\n• Floor Area: ${sqm} sqm\n• Finish Type: ${finishType}\n\nThe estimated cost would be around ${formattedEstimate}.\n\nNote: This is an initial estimate. Actual costs may vary based on:\n• Specific design requirements\n• Material selections\n• Site conditions\n• Timeline requirements\n\nWould you like to schedule a consultation for a detailed quotation?`,
      buttons: [
        { text: "Schedule Consultation", action: "I want to schedule a consultation", path: "/contact" },
        { text: "Modify Estimate", action: "I want to try different specifications" },
        { text: "Learn More", action: "Tell me more about your services", path: "/services" }
      ]
    };
  };

  const handleUserQuery = async (userQuery: string) => {
    setIsLoading(true);

    // Simple greetings
    if (userQuery.toLowerCase().match(/^(hi|hello|hey|kumusta|hi po|hello po)$/)) {
      setMessages(prev => [...prev, { 
        content: "Hi! How can I help you today?", 
        isBot: true, 
        timestamp: new Date(),
        buttons: [
          { text: "Services", action: "What are your services?", path: "/services" },
          { text: "Get Quote", action: "I need a quote", path: "/contact" }
        ]
      }]);
      setIsLoading(false);
      return;
    }

    // Handle unclear responses
    if (userQuery.toLowerCase().includes('hindi ko gets') || 
        userQuery.toLowerCase().includes('di ko maintindihan') ||
        userQuery.toLowerCase().includes('ano ulit')) {
      setMessages(prev => [...prev, { 
        content: "Let me help you better. What specific service do you need?", 
        isBot: true, 
        timestamp: new Date(),
        buttons: [
          { text: "Installation", action: "Installation services" },
          { text: "Renovation", action: "Renovation services" },
          { text: "Construction", action: "Construction services" }
        ]
      }]);
      setIsLoading(false);
      return;
    }
    
    // Check specifically for calculation requests first
    const calculationResponse = processCalculation(userQuery);
    if (calculationResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          content: calculationResponse.content, 
          isBot: true, 
          timestamp: new Date(),
          buttons: calculationResponse.buttons
        }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    // Removed the getCompanyInfo check here to prioritize LLM call

    try {
      // Prepare conversation history for the API
      const history = messages.slice(-5).map(msg => ({ // Send last 5 messages
        role: msg.isBot ? "model" : "user",
        parts: [{ text: msg.content }]
      }));

      // Add the current user query to the history
      history.push({
        role: "user",
        parts: [{ text: userQuery }]
      });
      
      // Remove the last user message from history if it's the same as the current query (to avoid duplication if called via button)
      if (history.length > 1 && history[history.length - 2].role === "user" && history[history.length - 2].parts[0].text === userQuery) {
        history.splice(history.length - 2, 1);
      }


      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          // Send conversation history
          contents: history, 
          // System instruction to guide the model
          systemInstruction: { 
            role: "system",
            parts: [{
              text: `You are the AI assistant for Rodelas Construction Services (RCS). Key information:
              
              Company Info:
              - Founded by Engr. Arnold Rodelas in 2010
              - Specializes in commercial construction, residential construction, renovation & remodeling
              - Known for quality workmanship and professional service
              - Based in Cabuyao, Laguna (Block 8 Lot 7 Phase 2 Gregory Street, St. Joseph Village, 7 Marinig, Cabuyao, 4025 Laguna)
              - Contact: Globe: 09670598903/09951858305, Landline: 049-547-0926, Email: engineeringdreams.rcs@gmail.com
              - Office Hours: Mon-Fri 8AM-6PM, Sat 9AM-2PM
              
              Services & Pricing (Estimates):
              - Residential Construction: Basic ₱35k-45k/sqm, Standard ₱45k-55k/sqm, Premium ₱55k-75k/sqm
              - Commercial Construction: Basic ₱45k-55k/sqm, Standard ₱55k-65k/sqm, Premium ₱65k-85k/sqm
              - Renovation: Basic ₱15k-25k/sqm, Standard ₱25k-35k/sqm, Premium ₱35k-45k/sqm
              - Installation: Aircon, fixtures, etc. (Needs details for quote)
              - Painting: Needs site visit for quote.
              - Design & Planning: Architectural, Interior, 3D Viz, Permits.
              
              Quote Process:
              - For renovation, painting, or complex projects, ALWAYS state that a site visit is needed for an accurate quote and that the visit is FREE. Offer to schedule the visit or provide contact info.
              - For simple installations (like aircon), ask for necessary details (type, room size, location).
              - For construction estimates, ask for Project Type, Floor Area (sqm), Finish Type (Basic/Standard/Premium), and Special Requirements.
              
              Communication Style Guidelines:
              1. Use 80% English, 20% Taglish (minimal, basic words like 'po', 'opo', 'sige').
              2. Keep responses SHORT and DIRECT (1-3 sentences usually).
              3. Be professional, friendly, and helpful.
              4. Use the provided conversation history to understand context and avoid repetition. If the user confirms something (e.g., "yes" to a quote offer), proceed to the next step (e.g., ask for details or offer to schedule a visit).
              5. If unsure, ask clarifying questions or offer to connect the user with a human agent via the contact page or phone number.
              
              Example GOOD flow:
              User: Magkano parenovate ng bahay?
              Bot: For house renovation po, we need to check the area first to give an accurate quote. The site inspection is free. Would you like to schedule a visit? [Button: Schedule Visit] [Button: Call Us]
              User: yes
              Bot: Okay po. Please provide your contact details on our contact page, or you can call us directly to schedule the free site visit. [Button: Contact Page] [Button: Call Now]
              
              Now, respond to the latest user message based on the conversation history.`
            }]
          },
          generationConfig: {
            temperature: 0.6, // Slightly lower temperature for more predictable responses
            maxOutputTokens: 400
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      let botResponse = "I apologize, but I couldn't process your request. Please try again or contact us directly.";
      
      // Check structure carefully before accessing parts
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        botResponse = data.candidates[0].content.parts[0].text;
        
        // Removed aggressive length limiter
        // Removed automatic button generation based on response keywords
      }

      setMessages(prev => [...prev, { 
        content: botResponse, 
        isBot: true, 
        timestamp: new Date(),
        buttons: undefined // Let the AI generate suggestions within its text response
      }]);
    } catch (error) {
      console.error('Error fetching AI response:', error); // Log the specific error
      setMessages(prev => [...prev, { 
        content: "Sorry, may problem po. Please contact us at 09670598903 or engineeringdreams.rcs@gmail.com", 
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
        className={`fixed bottom-6 right-6 z-40 bg-rcs-blue text-white rounded-full p-4 shadow-lg hover:bg-blue-800 transition-all duration-300 flex items-center justify-center gap-2 ${
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
