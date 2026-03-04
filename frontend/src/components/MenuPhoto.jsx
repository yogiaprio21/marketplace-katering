export default function MenuPhoto({ url, alt }) {
    if (url) {
        return <img src={url} alt={alt} className="menu-photo" />
    }
    return <div className="menu-photo menu-photo-placeholder">No Image</div>
}
