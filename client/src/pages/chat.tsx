import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Bot, User, MessageCircle } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (data: { message: string; language: string; history: ChatMessage[] }) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Chat API error:", errorText);
        throw new Error(`Chat API error: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log("Chat response text:", responseText);
      
      try {
        return JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse chat response as JSON:", parseError);
        console.error("Raw response:", responseText);
        throw new Error('Invalid response format from chat API');
      }
    },
    onSuccess: (response) => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: language === 'es' 
          ? "Lo siento, hay un problema técnico. Intenta de nuevo más tarde."
          : "Sorry, there's a technical issue. Please try again later.",
        timestamp: new Date()
      }]);
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Mensaje de bienvenida
    const welcomeMessage = language === 'es' 
      ? "¡Hola! Soy tu asistente especializado en medicamentos. Puedo ayudarte con:\n\n• Información sobre medicamentos\n• Efectos secundarios\n• Dosis recomendadas\n• Interacciones medicamentosas\n• Usos y contraindicaciones\n\n¿En qué puedo ayudarte hoy?"
      : "Hello! I'm your specialized medication assistant. I can help you with:\n\n• Medication information\n• Side effects\n• Recommended dosages\n• Drug interactions\n• Uses and contraindications\n\nHow can I help you today?";
    
    setMessages([{
      role: 'assistant',
      content: welcomeMessage,
      timestamp: new Date()
    }]);
  }, [language]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    chatMutation.mutate({
      message: inputMessage,
      language: language,
      history: messages.slice(-10) // Solo últimos 10 mensajes para contexto
    });

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === 'es' ? 'es-ES' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjNmNGY2IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] flex flex-col overflow-hidden" style={{ height: '100vh', maxHeight: '100vh' }}>
      {/* Header - Fixed - WhatsApp Style */}
      <div className="bg-green-600 text-white px-4 py-3 flex items-center gap-3 shadow-md flex-shrink-0 safe-area-top">
        <Link href="/">
          <Button variant="ghost" size="sm" className="text-white hover:bg-green-700 p-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              {language === 'es' ? 'Asistente Médico' : 'Medical Assistant'}
            </h1>
            <p className="text-xs text-green-100">
              {language === 'es' ? 'En línea' : 'Online'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-hidden relative" style={{ minHeight: 0 }}>
        <div className="h-full overflow-y-auto px-3 py-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-3 pb-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-3 py-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words text-sm leading-5">
                      {message.content}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-500 dark:text-gray-400 px-1 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {chatMutation.isPending && (
              <div className="flex gap-2 justify-start">
                <div className="h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-3 py-2 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom - WhatsApp Style */}
      <div className="bg-gray-50 border-t border-gray-200 p-3 pb-6 flex-shrink-0 safe-area-bottom">
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-white rounded-full px-4 py-2 min-h-[42px] flex items-center shadow-sm border border-gray-200">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'es' ? 'Escribe tu pregunta...' : 'Type your question...'}
              className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm h-auto resize-none placeholder:text-gray-500"
              disabled={chatMutation.isPending}
            />
          </div>
          <Button 
            onClick={handleSendMessage} 
            size="icon" 
            className="h-10 w-10 rounded-full flex-shrink-0 bg-green-500 hover:bg-green-600 text-white"
            disabled={!inputMessage.trim() || chatMutation.isPending}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 px-2">
          {language === 'es' 
            ? 'Información educativa. Consulta con un profesional de la salud.'
            : 'Educational information. Consult with a healthcare professional.'}
        </div>
      </div>
    </div>
  );
}