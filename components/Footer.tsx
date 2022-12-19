
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
                Created by Ajay Gandecha - 2022
                {/* Version */}
                <span className=" float-left">
                    v1.0.0
                </span>
                {/* GitHub Repository Link */}
                <span className="float-right">
                    <a className="underline" href="https://github.com/ajaygandecha/akari" target="_blank" rel="noopener noreferrer">View on GitHub</a>
                </span>
            </p>
        </div>
    );
}