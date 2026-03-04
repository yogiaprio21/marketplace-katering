export default function EmptyState({ message }) {
    return (
        <div className="card empty-state">
            <p className="text-muted">{message}</p>
        </div>
    )
}
