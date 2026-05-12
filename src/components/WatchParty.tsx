import { useState, useEffect, useRef, useMemo } from "react";
import { Movie } from "../App";
import { CustomPlayer } from "./CustomPlayer";
import { InviteSheet } from "./InviteSheet";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  MessageSquare, 
  Send,
  Zap
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";

interface WatchPartyProps {
  movie: Movie | null;
  localFile: File | null;
  onLeave: () => void;
}

export function WatchParty({ movie, localFile, onLeave }: WatchPartyProps) {
  const [messages, setMessages] = useState<{ id: string; user: string; text: string; color: string }[]>([
    { id: "1", user: "System", text: "Welcome to the party! Share the link to invite friends.", color: "text-rose-400" },
  ]);
  const [inputText, setInputText] = useState("");
  const [participants] = useState(["You", "Alex", "Jordan"]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use useMemo to prevent creating a new object URL on every render
  const videoUrl = useMemo(() => {
    if (movie) return "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    if (localFile) return URL.createObjectURL(localFile);
    return "";
  }, [movie, localFile]);

  // Clean up the object URL when the component unmounts or when the localFile changes
  useEffect(() => {
    return () => {
      if (videoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      text: inputText,
      color: "text-white",
    };

    setMessages([...messages, newMessage]);
    setInputText("");

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        user: "Alex",
        text: "This part is so good! \ud83d\udd25",
        color: "text-blue-400"
      }]);
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex flex-col h-screen"
    >
      {/* Navbar */}
      <header className="flex items-center justify-between p-4 border-b border-white/5 bg-black/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onLeave}
            className="rounded-full hover:bg-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="font-bold text-lg leading-tight">
              {movie?.title || localFile?.name || "Local Video"}
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Live Watch Party</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center -space-x-2 mr-4">
            {participants.map((p, i) => (
              <div 
                key={i} 
                className="w-8 h-8 rounded-full border-2 border-black bg-rose-600 flex items-center justify-center text-[10px] font-bold"
                title={p}
              >
                {p[0]}
              </div>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-rose-400">
              +{participants.length}
            </div>
          </div>
          <InviteSheet />
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-xl px-4 flex items-center gap-2 shadow-lg shadow-rose-900/40">
            <Zap className="w-4 h-4 fill-current" /> Sync All
          </Button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Video Section */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          <CustomPlayer url={videoUrl} title={movie?.title || localFile?.name || "Watch Party"} />
        </div>

        {/* Chat Section */}
        <aside className="w-full lg:w-[400px] border-l border-white/5 bg-zinc-950/50 flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-rose-500" />
              <span className="font-bold text-sm uppercase tracking-wider">Live Chat</span>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono bg-rose-500/10 border-rose-500/20 text-rose-400">
              {messages.length} MSG
            </Badge>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-[11px] font-black uppercase tracking-tighter ${msg.color}`}>
                      {msg.user}
                    </span>
                    <span className="text-[9px] text-gray-600">Just now</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 shadow-sm">
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-white/5">
            <form onSubmit={sendMessage} className="relative">
              <Input 
                placeholder="Say something nice..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-zinc-900/50 border-white/10 rounded-2xl pr-12 focus:ring-rose-500 focus:border-rose-500 h-12"
              />
              <Button 
                type="submit"
                size="icon" 
                variant="ghost"
                className="absolute right-1 top-1 text-rose-500 hover:text-rose-400 hover:bg-transparent"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </aside>
      </main>
    </motion.div>
  );
}