import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import PuzzleBoard from "../../components/PuzzleBoard";

interface PuzzleProps {
    puzzles: Puzzle[];
  }

export default function PuzzleView({puzzles}: PuzzleProps) {

    const router = useRouter();
    const { id } = router.query;

    
    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">

            {/* Header */}
            <header className="">
                <h1 className="text-center font-mono font-bold text-2xl pt-8">
                    Puzzle #{id}
                </h1>
            </header>

            {/* Main content */}
            <main>
                <div className="flex items-center justify-center mt-8">
                    {/* Puzzle Container */}
                    {
                        (puzzles.filter(puzzle => puzzle.id.toString() === id).length > 0) ?
                        (<PuzzleBoard puzzle={puzzles.filter(puzzle => puzzle.id.toString() === id)[0]}/>) :
                        (<p className="text-center font-mono">Invalid puzzle ID</p>)
                    }
                </div>
            </main>

            {/* Footer */}
            <footer className="">
                <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
            </footer>
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