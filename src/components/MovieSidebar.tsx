import { Movie } from "../App";
import { Badge } from "./ui/badge";
import { Star, PlayCircle } from "lucide-react";

interface MovieSidebarProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export function MovieSidebar({ movies, onSelect }: MovieSidebarProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Top Picks</h3>
        <Badge variant="outline" className="text-rose-400 border-rose-400/30">Top 10</Badge>
      </div>
      <div className="space-y-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
            onClick={() => onSelect(movie)}
          >
            <div className="relative w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
              <img
                src={movie.thumbnail}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex flex-col justify-center py-1">
              <h4 className="font-bold text-sm group-hover:text-rose-400 transition-colors line-clamp-1">
                {movie.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-yellow-500 gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[10px] font-bold">{movie.rating}</span>
                </div>
                <span className="text-[10px] text-gray-500">•</span>
                <span className="text-[10px] text-gray-500">{movie.duration}</span>
              </div>
              <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                {movie.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}