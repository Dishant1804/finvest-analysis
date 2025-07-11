"use client"
import ChatHistory from "@/components/ChatHistory";
import PromptSuggestion from "@/components/PromptSuggestion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { logoGreen } from "../assets";
import { useRouter } from "next/navigation";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { Message } from "@/components/ui/chat-message";
import axios from 'axios'

const Analyze = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPromptSuggestion, setShowPromtSuggestion] = useState<boolean>(true);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUserId(window.localStorage.getItem("userid"));
  }, []);

  const handleConversationSelect = (selectedConversationId: string, conversationMessages: Message[]) => {
    setConversationId(selectedConversationId);
    setMessages(conversationMessages);
    setShowPromtSuggestion(false);
  };

  const handleNewConversation = () => {
    setConversationId(null);
    setMessages([]);
    setShowPromtSuggestion(true);
  };

  const handleSendButton = async () => {
    if (!prompt.trim()) return;

    const currentPrompt = prompt;
    setPrompt("");
    setIsGenerating(true);
    setShowPromtSuggestion(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentPrompt,
      createdAt: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/analyze`, {
        query: currentPrompt,
        user_id: userId,
        conversation_id: conversationId
      }, {
        withCredentials: true,
      });

      if (response.data.status === 'success') {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.data.data,
          createdAt: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);

        if (!conversationId && response.data.conversation_id) {
          setConversationId(response.data.conversation_id);
          setRefreshHistory(prev => prev + 1);
        }
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `Error: ${response.data.error || 'Unknown error occurred'}`,
          createdAt: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Error occurred while processing your request.",
        createdAt: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleNavClick = () => {
    router.push('/')
  }

  return (
    <div className="bg-[#00040f] text-dim-white w-full h-screen flex flex-col">
      {/* nav or header */}
      <div className="flex flex-row relative w-full bg-[#0a101d] border-b border-neutral-700 items-center text-xl font-family-poppins gap-3 px-8 py-4 h-16 flex-shrink-0">
        <Image src={logoGreen} alt="" className="h-6 w-6" />
        <h1 className="text-xl text-white cursor-pointer" onClick={handleNavClick}>
          Finvest Analysis
        </h1>
      </div>

      {/* content*/}
      <div className="flex flex-row w-full flex-1 min-h-0">
        {/* chat hsitory*/}
        <ChatHistory
          userId={userId || ""}
          currentConversationId={conversationId}
          onConversationSelect={handleConversationSelect}
          onNewConversation={handleNewConversation}
          refreshTrigger={refreshHistory}
        />

        {/* chat*/}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="w-full max-w-5xl mx-auto">
              {showPromptSuggestion && messages.length === 0 && (
                <PromptSuggestion setPrompt={setPrompt} />
              )}

              {messages.length > 0 && (
                <div className="py-6">
                  <MessageList
                    messages={messages}
                    isTyping={isGenerating}
                    showTimeStamps={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* input query */}
          <div className="flex-shrink-0 border-neutral-700  px-4 py-4">
            <div className="w-full max-w-2xl mx-auto">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSendButton();
              }} className="w-full">
                <MessageInput
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  isGenerating={isGenerating}
                  enableInterrupt={true}
                  className="border rounded-lg border-neutral-700 border-r-4 border-b-4 bg-transparent pr-12 text-md"
                  placeholder="e.g. What is the latest news about PFC?"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analyze;