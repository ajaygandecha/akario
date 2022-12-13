import { useRouter } from "next/router";
import Tile, { TileType } from "../../components/Tile";
import GameModel from "../../modules/GameModel";

export default function PuzzleView() {

    const router = useRouter();
    const { id } = router.query;

    let gameModel = new GameModel();

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
                    <div className="bg-slate-400 p-2 sm:w-7/12 md:w-5/12 lg:w-3/12 aspect-square">
                        <div className="grid grid-cols-7 gap-2">

                            <Tile model={gameModel} r={0} c={0} />
                            <Tile model={gameModel} r={0} c={1} />
                            <Tile model={gameModel} r={0} c={2} />
                            <Tile model={gameModel} r={0} c={3} />
                            <Tile model={gameModel} r={0} c={4} />
                            <Tile model={gameModel} r={0} c={5} />
                            <Tile model={gameModel} r={0} c={6} />

                            <Tile model={gameModel} r={1} c={0} />
                            <Tile model={gameModel} r={1} c={1} />
                            <Tile model={gameModel} r={1} c={2} />
                            <Tile model={gameModel} r={1} c={3} />
                            <Tile model={gameModel} r={1} c={4} />
                            <Tile model={gameModel} r={1} c={5} />
                            <Tile model={gameModel} r={1} c={6} />

                            <Tile model={gameModel} r={2} c={0} />
                            <Tile model={gameModel} r={2} c={1} />
                            <Tile model={gameModel} r={2} c={2} />
                            <Tile model={gameModel} r={2} c={3} />
                            <Tile model={gameModel} r={2} c={4} />
                            <Tile model={gameModel} r={2} c={5} />
                            <Tile model={gameModel} r={2} c={6} />

                            <Tile model={gameModel} r={3} c={0} />
                            <Tile model={gameModel} r={3} c={1} />
                            <Tile model={gameModel} r={3} c={2} />
                            <Tile model={gameModel} r={3} c={3} />
                            <Tile model={gameModel} r={3} c={4} />
                            <Tile model={gameModel} r={3} c={5} />
                            <Tile model={gameModel} r={3} c={6} />

                            <Tile model={gameModel} r={4} c={0} />
                            <Tile model={gameModel} r={4} c={1} />
                            <Tile model={gameModel} r={4} c={2} />
                            <Tile model={gameModel} r={4} c={3} />
                            <Tile model={gameModel} r={4} c={4} />
                            <Tile model={gameModel} r={4} c={5} />
                            <Tile model={gameModel} r={4} c={6} />

                            <Tile model={gameModel} r={5} c={0} />
                            <Tile model={gameModel} r={5} c={1} />
                            <Tile model={gameModel} r={5} c={2} />
                            <Tile model={gameModel} r={5} c={3} />
                            <Tile model={gameModel} r={5} c={4} />
                            <Tile model={gameModel} r={5} c={5} />
                            <Tile model={gameModel} r={5} c={6} />

                            <Tile model={gameModel} r={6} c={0} />
                            <Tile model={gameModel} r={6} c={1} />
                            <Tile model={gameModel} r={6} c={2} />
                            <Tile model={gameModel} r={6} c={3} />
                            <Tile model={gameModel} r={6} c={4} />
                            <Tile model={gameModel} r={6} c={5} />
                            <Tile model={gameModel} r={6} c={6} />

                       </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="">
                <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
            </footer>
        </div>
    )
}