import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import PuzzleBoard from "../../components/PuzzleBoard";

/** Interface for the parameter of the `PuzzleView` component. */
interface PuzzleProps {
    puzzles: Puzzle[];
}

/**
 * Main view for the puzzle page.
 * @param - Puzzles retrieved from the database.
 * @returns - Render for the puzzle page.
 */
export default function PuzzleView({ puzzles }: PuzzleProps) {

    // Get router and ID from the URL.
    const router = useRouter();
    const { id } = router.query;

    // Filter to get the matching puzzle (in an array).
    let puzzleFilter = puzzles.filter(puzzle => puzzle.id.toString() === id);

    // Return the puzzle view.
    return (

        <div className="h-screen bg-slate-100 dark:bg-slate-800">
            <div className="relative min-h-screen">
                {/* Header */}
                <header className="">
                    {/* Back Button */}
                    <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4 border-b-4 border-r-4 border-red-700 hover:border-red-500" href={"/"}>
                        X
                    </Link>
                    {/* Header Text */}
                    <h1 className="text-center font-mono font-bold text-2xl pt-8">
                        Puzzle #{id}
                    </h1>
                </header>

                {/* Main content */}
                <main>
                    {/* Puzzle Container */}
                    {
                        (puzzleFilter.length > 0) ?
                            (<PuzzleBoard puzzle={puzzleFilter[0]} />) :
                            (<p className="text-center font-mono">Invalid puzzle ID</p>)
                    }
                </main>

                {/* Footer */}
                <footer className="bg-black text-white p-8 mt-8 w-full absolute bottom-0">
                    <div>
                        {/* Copyright */}
                        <p className="text-left font-mono">
                            © Copyright 2022 Ajay Gandecha
                            {/* GitHub Repository Link */}
                            <span className="float-right">
                                <a className="underline" href="https://github.com/ajaygandecha/akari" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                            </span>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

/**
 * Returns that paths that have to be created at build time.
 * @returns static paths.
 */
export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    // Return such that no pages need to be created at build time,
    // and a "blocking" fallback. 
    return {
        paths: [], fallback: "blocking"
    };
}

/**
 * Fetches the puzzles from the database.
 * @returns the puzzle library from the database.
 */
export const getStaticProps: GetStaticProps = async () => {

    // Create a new instance of the Prisma Client.
    const prisma = new PrismaClient();
    // Fetch all of the puzzles.
    const puzzles = await prisma.puzzle.findMany();

    // Return.
    return {
        props: { puzzles }
    };
}