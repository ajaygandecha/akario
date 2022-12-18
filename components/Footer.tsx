
/**
 * Component for the footer.
 * @returns the render for the footer.
 */
export default function Footer() {

    return(
        // Footer Section
        <div>
            {/* Copyright */}
            <p className="text-center font-mono">
                © Copyright 2022 Ajay Gandecha
                {/* Version */}
                <span className=" float-left">
                    v0.1
                </span>
                {/* GitHub Repository Link */}
                <span className="float-right">
                    <a className="underline" href="https://github.com/ajaygandecha/akari" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </span>
            </p>
        </div>
    );
}