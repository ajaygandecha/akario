import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import PuzzleBoard from "../../components/PuzzleBoard";

interface PuzzleProps {
    puzzles: Puzzle[];
  }

export default function PuzzleView({puzzles}: PuzzleProps) {

    const router = useRouter();
    const { id } = router.query;
  
    let puzzleFilter = puzzles.filter(puzzle => puzzle.id.toString() === id);

    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">
            <div className="relative min-h-screen">
                {/* Header */}
                <header className="">
                <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4 border-b-4 border-r-4 border-red-700 hover:border-red-500" href={"/"}>
                    X
                </Link>
                <h1 className="text-center font-mono font-bold text-2xl pt-8">
                    Puzzle #{id}
                </h1>
                </header>

                {/* Main content */}
                <main>
                    {/* Puzzle Container */}
                    {
                        (puzzleFilter.length > 0) ?
                        (<PuzzleBoard puzzle={puzzleFilter[0]}/>) :
                        (<p className="text-center font-mono">Invalid puzzle ID</p>)
                    }
                </main>

                {/* Footer */}
                <footer className="bg-black text-white p-8 mt-8 w-full absolute bottom-0">
                    <div>
                    <p className="text-left font-mono">
                    © Copyright 2022 Ajay Gandecha
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps: GetStaticProps = async () => {

    const prisma = new PrismaClient();
    const puzzles = await prisma.puzzle.findMany();
  
    return {
      props : { puzzles }
    };
  }