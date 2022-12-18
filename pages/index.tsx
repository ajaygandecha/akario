import { PrismaClient, Puzzle } from "@prisma/client";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import PuzzleThumbnailTile from "../components/PuzzleThumbnailTile";
import UserDataManager, { UserData } from "../modules/UserData";

/** Interface for the parameter of the `Home` component. */
interface PuzzleProps {
  puzzles: Puzzle[];
}

/**
 * Home page for the website.
 * @param - Puzzles retrieved from the database.
 * @returns - Render for the home page.
 */
export default function Home({ puzzles }: PuzzleProps) {

  // State variables for the userData from `localStorage`.  
  const [userDataRef, setUserDataRef] = useState<UserData | null>();

  // Fetch the user's data as soon as the site loads.
  useEffect(() => {
    setUserDataRef(UserDataManager.getUserData());
  }, []);

  // Return the home page view.
  return (
    <>
      {/* Determine if the user data has been loaded in. */}
      {(userDataRef != null) ? (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">
          {/* Header */}
          <header className="">
            {/* Header Text */}
            <h1 className="text-center font-mono font-bold text-5xl pt-8">
              AKARI
            </h1>
          </header>

          {/* Main Content */}
          <main>

            {/* Header Caption Section */}
            <div className="flex justify-center items-center mt-6">
              {/* Introduction to Akari */}
              <p className="text-center font-mono text-lg w-9/12">
                Welcome to AKARI!
                <br /><br />
                Akari, also known as <i>Light Up</i>, is a logic puzzle game originally created by <a className="underline" href="https://www.nikoli.co.jp/en/" target="_blank" rel="noopener noreferrer"><i>Nikoli (ニコリ)</i></a>, a Japanese publisher that specializes in creating games and logic puzzles. Nikoli became prominent around the world due to the popularity of another logic puzzle game they created, <i>Sudoku</i>.
              </p>
            </div>

            {/* Puzzle Library Section */}
            <h2 className="text-center font-mono font-bold text-3xl mt-6">
              Puzzle Library
            </h2>

            {/* Horizontal Scroll Tooltip */}
            <p className="text-center font-mono text-md mt-4">
              <i>Scroll to view all the puzzles for each category!</i>
            </p>

            {/* Easy Puzzle Header */}
            <h3 className="text-center font-mono font-bold text-2xl mt-4">
              Easy (7x7)
            </h3>

            {/* Easy Puzzles Gallery */}
            <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap pt-10 pb-10 ml-3 mr-3">
              {
                (puzzles.filter((puzzle) => puzzle.difficulty === 1)).map((puzzle) =>
                  <Link key={puzzle.id} className="inline-block ml-3 mr-3" href={"/puzzle/" + puzzle.id.toString()}>
                    <PuzzleThumbnailTile puzzle={puzzle} puzzleID={puzzle.id} difficulty={puzzle.difficulty} userDataForPuzzle={UserDataManager.getDataForPuzzleFromUserData(userDataRef, puzzle.id)} />
                  </Link>
                )
              }
            </div>

            {/* Medium Puzzle Header */}
            <h3 className="text-center font-mono font-bold text-2xl">
              Medium (10x10)
            </h3>

            {/* Medium Puzzles Gallery */}
            <div className="overflow-x-scroll overflow-y-hidden whitespace-nowrap pt-10 pb-10 ml-3 mr-3">
              {
                (puzzles.filter((puzzle) => puzzle.difficulty === 2)).map((puzzle) =>
                  <Link key={puzzle.id} className="inline-block ml-3 mr-3" href={"/puzzle/" + puzzle.id.toString()}>
                    <PuzzleThumbnailTile puzzle={puzzle} puzzleID={puzzle.id} difficulty={puzzle.difficulty} userDataForPuzzle={UserDataManager.getDataForPuzzleFromUserData(userDataRef, puzzle.id)} />
                  </Link>
                )
              }
            </div>

            {/* More Puzzles Coming Soon Text */}
            <div className="flex items-center justify-center">
              <em className="font-mono text-center">More puzzles, including Hard (14x14) and Insane (25x25) puzzles coming soon!</em>
            </div>

            {/* How to Play Header */}
            <h2 className="text-center font-mono font-bold text-3xl mt-6">
              How to Play
            </h2>

            {/* How to Play Text */}
            <div className="flex justify-center items-center mt-6">
              <p className="text-center font-mono text-lg w-9/12">
                Akari is a game played on a square grid that contains <b>white cooridor</b> and <b>black wall</b> cells.
                <br /><br />
                By clicking on a white cell, you can place a <b>lamp</b> on the cell. Lamps illuminate all cells vertically and horizontally from themselves <i>up to black wall cells</i>.
                <br /><br />
                <b>The goal of the game is to illuminate all of the white cells on the board</b> such that <i>no two lamps look at each other</i>!
                <br /><br />
                In addition, certain black wall cells have a <b>number from 0-4</b> on them, which indicates the <i>number of lamps</i> that must touch that cell.
                <br /><br />
                For example, a cell with a 4 must have four bulbs around it, one on each side. Cells with a 0 cannot have a bulb next to any of its sides.
                <br /><br />
                Cells with no number can have any number of bulbs around them.
              </p>
            </div>
          </main>

          {/* Footer */}
          <footer className="bg-black text-white p-8 mt-8">
            <Footer />
          </footer>
        </div>
      ) : (
        // Page to show as the user data is loading,.
        <p>Loading...</p>
      )}
    </>
  )
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