"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";

import { trendingMovies } from "./TrendingMovie.data";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function TrendingMovie() {
  const [isLoading, setIsLoading] = useState(false);

  const uploadTrendingMovies = async () => {
    await axios.post("/api/create-popular-movies", { movies: trendingMovies });
    toast({ title: "¡Películas subidas con éxito!" });
    setIsLoading(true);
    try {
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="border rounded-lg border-white-400 p-6 hover:bg-slate-500 transition-all duration-300">
      <h1 className="text-xl font-bold mb-4">Subir películas populares</h1>
      <Button
        className="w-full"
        variant={"secondary"}
        onClick={uploadTrendingMovies}
        disabled={isLoading}
      >
        Subir películas
        <Upload className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
