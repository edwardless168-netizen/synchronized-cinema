import { useState, useEffect } from "react";
import { MovieSidebar } from "./components/MovieSidebar";
import { WatchParty } from "./components/WatchParty";
import { Toaster } from "./components/ui/sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Users, Globe, Smartphone } from "lucide-react";
import { Button } from "./components/ui/button";

export type Movie = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  rating: string;
};

const TOP_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Neon Odyssey",
    description: "In a world of neon and shadows, a young hacker discovers a secret that could change everything.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/600d36a3-dd88-4f50-8d1d-7426950da253/neon-odyssey-d9820641-1778592328247.webp",
    duration: "2h 15m",
    rating: "4.9",
  },
  {
    id: "2",
    title: "Shadow Protocol",
    description: "A rogue agent must race against time to stop a global conspiracy.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/600d36a3-dd88-4f50-8d1d-7426950da253/shadow-protocol-386386a0-1778592328229.webp",
    duration: "1h 58m",
    rating: "4.7",
  },
  {
    id: "3",
    title: "The Lost Forest",
    description: "A group of unlikely friends embark on a magical quest through a mystical forest.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/600d36a3-dd88-4f50-8d1d-7426950da253/the-lost-forest-40fa1d20-1778592327624.webp",
    duration: "1h 32m",
    rating: "4.8",
  },
  {
    id: "4",
    title: "Whispers in the Dark",
    description: "Something is haunting the old mansion on the hill. Can they survive the night?",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/600d36a3-dd88-4f50-8d1d-7426950da253/whispers-in-the-dark-e56351df-1778592330622.webp",
    duration: "1h 45m",
    rating: "4.5",
  },
  {
    id: "5",
    title: "Summer Spark",
    description: "Two strangers find love in the most unexpected place during a sun-drenched summer.",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/600d36a3-dd88-4f50-8d1d-7426950da253/summer-spark-99fc30ef-1778592328134.webp",
    duration: "1h 28m",
    rating: "4.6",
  },
];

function App() {
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [localVideoFile, setLocalVideoFile] = useState<File | null>(null);
  const [sessionMode, setSessionMode] = useState<boolean>(false);

  const startWatchParty = (movie: Movie) => {
    setActiveMovie(movie);
    setLocalVideoFile(null);
    setSessionMode(true);
  };

  const startLocalWatchParty = (file: File) => {
    setLocalVideoFile(file);
    setActiveMovie(null);
    setSessionMode(true);
  };

  const leaveSession = () => {
    setSessionMode(false);
    setActiveMovie(null);
    setLocalVideoFile(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-rose-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!sessionMode ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* Hero Background */}
            <div className="fixed inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 via-black to-black" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(225,29,72,0.15),transparent_50%)]" />
            </div>

            <header className="relative z-10 p-6 flex items-center justify-between border-b border-white/5 backdrop-blur-md sticky top-0 bg-black/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-600 rounded-lg">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-rose-400">
                  CineSync
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="hidden sm:flex text-gray-400 hover:text-white">
                  Trending
                </Button>
                <Button variant="ghost" className="hidden sm:flex text-gray-400 hover:text-white">
                  My List
                </Button>
                <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-full px-6">
                  Sign In
                </Button>
              </div>
            </header>

            <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                  <section>
                    <div className="relative rounded-3xl overflow-hidden aspect-[21/9] group cursor-pointer shadow-2xl shadow-rose-900/20">
                      <img
                        src={TOP_MOVIES[0].thumbnail}
                        alt="Hero Movie"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 space-y-4 max-w-2xl">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 rounded bg-rose-600 text-xs font-bold uppercase tracking-wider">Featured</span>
                          <span className="text-gray-300 text-sm font-medium">New Release</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black">{TOP_MOVIES[0].title}</h2>
                        <p className="text-gray-300 text-lg line-clamp-2 md:line-clamp-none">
                          {TOP_MOVIES[0].description}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                          <Button 
                            onClick={() => startWatchParty(TOP_MOVIES[0])}
                            size="lg" 
                            className="bg-white text-black hover:bg-rose-100 font-bold rounded-xl px-8 flex items-center gap-2"
                          >
                            <Play className="fill-current w-5 h-5" /> Start Party
                          </Button>
                          <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 font-bold rounded-xl px-8 flex items-center gap-2"
                          >
                            <Users className="w-5 h-5" /> Join Session
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold">Trending Now</h3>
                      <Button variant="link" className="text-rose-400">View All</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {TOP_MOVIES.slice(1).map((movie) => (
                        <div 
                          key={movie.id}
                          className="group relative rounded-xl overflow-hidden aspect-[2/3] cursor-pointer bg-zinc-900 border border-white/5"
                          onClick={() => startWatchParty(movie)}
                        >
                          <img
                            src={movie.thumbnail}
                            alt={movie.title}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-110 group-hover:opacity-40"
                          />
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                            <Play className="w-12 h-12 text-rose-500 mb-2 fill-current" />
                            <h4 className="font-bold text-sm mb-1">{movie.title}</h4>
                            <span className="text-xs text-gray-400">{movie.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="lg:col-span-4 space-y-8">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-rose-500" /> Watch Locally
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                      Have a movie downloaded on your device? Upload it here to watch it with friends in real-time.
                    </p>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-rose-500/50 hover:bg-white/5 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Smartphone className="w-8 h-8 text-rose-500 mb-2" />
                        <p className="text-sm text-gray-400">Click to upload file</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="video/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) startLocalWatchParty(file);
                        }}
                      />
                    </label>
                  </div>

                  <MovieSidebar movies={TOP_MOVIES} onSelect={startWatchParty} />
                </aside>
              </div>
            </main>
          </motion.div>
        ) : (
          <WatchParty 
            movie={activeMovie} 
            localFile={localVideoFile} 
            onLeave={leaveSession} 
          />
        )}
      </AnimatePresence>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;