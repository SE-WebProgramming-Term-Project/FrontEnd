import React from "react";
import './css/MenuPazination.css'

function Pagination({ total, limit, page, setPage }) {
    const numPages = Math.ceil(total / limit);

    return (
        <nav className="menu-pagination-nav">
            <button
                className="menu-pagination-button"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                &lt;
            </button>
            {Array(numPages)
                .fill()
                .map((_, i) => (
                    <button
                        key={i + 1}
                        className={
                            page === i + 1
                                ? "menu-pagination-button menu-pagination-button-active"
                                : "menu-pagination-button"
                        }
                        onClick={() => setPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            <button
                className="menu-pagination-button"
                onClick={() => setPage(page + 1)}
                disabled={page === numPages}
            >
                &gt;
            </button>
        </nav>
    );
}

export default Pagination;