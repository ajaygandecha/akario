import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";

interface PuzzleProps {
  puzzles: Puzzle[];
}

export default function Home({puzzles}: PuzzleProps) {

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  let dateString = mm + '/' + dd + '/' + yyyy;

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-800">
      {/* Header */}
      <header className="">
        <h1 className="text-center font-mono font-bold text-5xl pt-8">
          Akari
        </h1>
      </header>
      {/* Main content */}
      <main>
        <h2 className="text-center font-mono font-bold text-2xl">
          Daily Puzzle
        </h2>
        <h3 className="text-center font-mono font-bold text-xl">
          {dateString}
        </h3>
        <h2 className="text-center font-mono font-bold text-2xl">
          Puzzle Library
        </h2>
      </main>
      {/* Footer */}
      <footer className="">
        <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prisma = new PrismaClient();
  const puzzles = await prisma.puzzle.findMany();

  return {
    props : { puzzles }
  };
}