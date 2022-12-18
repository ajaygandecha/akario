import { useEffect } from "react";


export default function PuzzleLanding() {

    useEffect(() => {
        window.location.href = "/";
      }, []);

    return (
        <div className="h-screen bg-slate-100 dark:bg-slate-800">
        </div>
    );
}