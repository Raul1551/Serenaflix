import { Movie } from "@prisma/client";

export type CarouselMovieProps = {
  movies: Movie[];
  isMyLIst: boolean;
};
