import { useRouter } from "next/router";
import PuzzleBoard from "../../components/PuzzleBoard";

export default function PuzzleView() {

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
                    <PuzzleBoard/>
                </div>
            </main>

            {/* Footer */}
            <footer className="">
                <p className="text-center font-mono">Copyright 2022 Ajay Gandecha</p>
            </footer>
        </div>
    )
}