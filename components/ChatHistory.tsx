"use client"
import { useState, useEffect } from "react";
import { Plus, MessageSquare, Trash2, Edit2, Search } from "lucide-react";
import axios from 'axios';

interface ConversationItem {
  id: string;
  title: string;
  messages: Array<{
    role: string;
    content: string;
    timestamp: string;
  }>;
  created_at: string;
  updated_at: string;
}

interface ChatHistoryProps {
  userId?: string;
  currentConversationId?: string | null;
  onConversationSelect?: (conversationId: string, messages: any[]) => void;
  onNewConversation?: () => void;
  refreshTrigger?: number;
}

const ChatHistory = ({
  userId,
  currentConversationId,
  onConversationSelect,
  onNewConversation,
  refreshTrigger = 0
}: ChatHistoryProps) => {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadConversations();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userId, refreshTrigger]);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${userId}/conversations`);
      setConversations(response.data);
    } catch (error) {
      console.error("Error loading conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewConversation = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations?user_id=${userId}`, {
        title: "New Conversation"
      });
      await loadConversations();
      onNewConversation?.();
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (!confirm("Are you sure you want to delete this conversation?")) return;

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}`);
      await loadConversations();
      if (conversationId === currentConversationId) {
        onNewConversation?.();
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const handleEditTitle = async (conversationId: string, newTitle: string) => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/conversations/${conversationId}`, {
        title: newTitle
      });
      await loadConversations();
      setEditingId(null);
      setEditTitle("");
    } catch (error) {
      console.error("Error updating conversation title:", error);
    }
  };

  const startEditing = (conversationId: string, currentTitle: string) => {
    setEditingId(conversationId);
    setEditTitle(currentTitle);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleConversationClick = (conversation: ConversationItem) => {
    const messages = conversation.messages.map((msg, index) => ({
      id: `${conversation.id}-${index}`,
      role: msg.role === "ai" ? "assistant" : msg.role,
      content: msg.content,
      createdAt: new Date(msg.timestamp)
    }));

    onConversationSelect?.(conversation.id, messages);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.messages.some(msg => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="w-[350px] h-full bg-[#0a101d] overflow-y-auto border-r border-neutral-700 flex flex-col">

      <div className="p-4 border-b border-neutral-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-semibold">Chat History</h2>
          <button
            onClick={handleNewConversation}
            className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
            title="New Conversation"
          >
            <Plus className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* searchbar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-transparent border border-r-4 border-b-4 border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-neutral-500"
          />
        </div>
      </div>

      {/* convo history */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-neutral-400">Loading conversations...</div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-4 text-center text-neutral-400">
            {searchQuery ? "No conversations found" : "No conversations yet"}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${conversation.id === currentConversationId
                    ? "border border-r-4 border-b-4 border-neutral-600"
                    : "hover:bg-[#00040f]/80"
                  }`}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      {editingId === conversation.id ? (
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => handleEditTitle(conversation.id, editTitle)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleEditTitle(conversation.id, editTitle);
                            } else if (e.key === 'Escape') {
                              cancelEditing();
                            }
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-neutral-700 border border-neutral-600 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-neutral-500"
                          autoFocus
                        />
                      ) : (
                        <h3 className="font-medium text-white text-sm truncate flex-1">
                          {conversation.title}
                        </h3>
                      )}
                    </div>

                    {conversation.messages.length > 0 && (
                      <p className="text-xs text-neutral-400 truncate mb-1">
                        {conversation.messages[conversation.messages.length - 1].content}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span>{formatDate(conversation.updated_at)}</span>
                      <span>{conversation.messages.length} messages</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(conversation.id, conversation.title);
                      }}
                      className="p-1 hover:bg-neutral-600 rounded transition-colors"
                      title="Edit title"
                    >
                      <Edit2 className="w-3 h-3 text-neutral-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteConversation(conversation.id);
                      }}
                      className="p-1 hover:bg-red-600 rounded transition-colors"
                      title="Delete conversation"
                    >
                      <Trash2 className="w-3 h-3 text-neutral-400 hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;