import { useEffect } from "react";

/**
 * Landing page at the URL /puzzle when no puzzle ID is given.
 * @returns temporary puzzle page.
 */
export default function PuzzleLanding() {

    // Immediately redirect back to the index.
    useEffect(() => {
        window.location.href = "/";
    }, []);

    // Return a blank page.
    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">
        </div>
    );
}