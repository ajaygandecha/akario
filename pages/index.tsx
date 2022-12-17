import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import PuzzleThumbnail from "../components/PuzzleThumbnail";
import PuzzleThumbnailTile from "../components/PuzzleThumbnailTile";
import UserDataManager, { UserData } from "../modules/UserData";

interface PuzzleProps {
  puzzles: Puzzle[];
}

export default function Home({puzzles}: PuzzleProps) {

  const [userDataRef, setUserDataRef] = useState<UserData | null>();

  useEffect(() => {
    setUserDataRef(UserDataManager.getUserData());
  }, []);

  return (
    <>
    { (userDataRef != null) ? (
      <div className="h-screen bg-slate-100 dark:bg-slate-800">
      {/* Header */}
      <header className="">
        <h1 className="text-center font-mono font-bold text-5xl pt-8">
          AKARI
        </h1>
      </header>
      {/* Main content */}
      <main>

        <h2 className="text-center font-mono font-bold text-3xl">
          Puzzle Library
        </h2>
        <h3 className="text-center font-mono font-bold text-2xl">
          Easy (7x7)
        </h3>

        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap pt-10 pb-10">
        {
          (puzzles.filter((puzzle) => puzzle.difficulty === 1)).map((puzzle) => 
            <Link className="inline-block ml-6" href={"/puzzle/" + puzzle.id.toString()}>
              <PuzzleThumbnailTile puzzle={puzzle} puzzleID={puzzle.id} difficulty={puzzle.difficulty} userDataForPuzzle={UserDataManager.getDataForPuzzleFromUserData(userDataRef, puzzle.id)} />
            </Link>
          )
        }
        </div>

        <h3 className="text-center font-mono font-bold text-2xl">
          Medium (10x10)
        </h3>

        <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap pt-10 pb-10">
        {
          (puzzles.filter((puzzle) => puzzle.difficulty === 2)).map((puzzle) => 
            <Link className="inline-block ml-6" href={"/puzzle/" + puzzle.id.toString()}>
              <PuzzleThumbnailTile puzzle={puzzle} puzzleID={puzzle.id} difficulty={puzzle.difficulty} userDataForPuzzle={UserDataManager.getDataForPuzzleFromUserData(userDataRef, puzzle.id)} />
            </Link>
          )
        }
        </div>

        <div className="flex items-center justify-center">
          <em className="font-mono text-center">Hard (14x14) puzzles coming soon!</em>
        </div>

      </main>
      {/* Footer */}
      <footer className="">
        <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
      </footer>
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const prisma = new PrismaClient();
  const puzzles = await prisma.puzzle.findMany();

  return {
    props : { puzzles }
  };
}