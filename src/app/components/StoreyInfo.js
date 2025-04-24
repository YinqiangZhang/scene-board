
export default function StoreyInfo() {
    return (
        <div className="m-2 place-items-center">
            <details className="dropdown bg-accent rounded-box shadow-lg">
                <summary className="btn btn-primary font-bold text-neutral-content">
                    Storey Info
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box m-2 shadow-lg">
                    <li><a>Floor 06</a></li>
                    <li><a>Floor 07</a></li>
                    <li><a>Floor 08</a></li>
                    <li><a>Floor 09</a></li>
                    <li><a>Floor 10</a></li>
                </ul>
            </details>
        </div>
    )
}
