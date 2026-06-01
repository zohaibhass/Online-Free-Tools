export default function Loading() {
    return (
        <div className="shimmer-screen">
            <div className="shimmer-shell">
                <div className="shimmer-card">
                    <div className="shimmer-line shimmer-title" />
                    <div className="shimmer-line shimmer-text" />
                    <div className="shimmer-line shimmer-text shimmer-short" />

                    <div className="shimmer-grid">
                        <div className="shimmer-box" />
                        <div className="shimmer-box" />
                        <div className="shimmer-box" />
                    </div>
                </div>
            </div>
        </div>
    )
}
