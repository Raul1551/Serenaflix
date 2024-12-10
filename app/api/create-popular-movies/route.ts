import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { movies } = await req.json();

  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return new NextResponse("Movies data is required", { status: 400 });
  }

  try {
    const createdMovies = await Promise.all(
      movies.map(async (movie) => {
        const {
          id,
          title,
          movieVideo,
          trailerVideo,
          thumbnailUrl,
          genre,
          duration,
          age,
          ranking,
        } = movie;

        if (
          !title ||
          !movieVideo ||
          !trailerVideo ||
          !thumbnailUrl ||
          !genre ||
          !duration ||
          !age ||
          !ranking
        ) {
          throw new Error(`Missing data for movie: ${title}`);
        }
        return await db.popularMovie.create({
          data: {
            id,
            title,
            movieVideo,
            trailerVideo,
            thumbnailUrl,
            genre,
            duration,
            age,
            ranking,
          },
        });
      })
    );
    return NextResponse.json(createdMovies, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}