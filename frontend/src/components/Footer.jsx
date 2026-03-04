export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            background: 'var(--color-surface-light)',
            borderTop: '1px solid var(--color-border-light)',
            padding: '3rem 1.5rem',
            marginTop: 'auto'
        }}>
            <div className="container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                padding: '0'
            }}>
                <div className="stack stack--sm">
                    <div className="brand" style={{ fontSize: '1.25rem' }}>Marketplace Katering</div>
                    <p className="text-muted" style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
                        Solusi terbaik untuk menghubungkan penyedia katering berkualitas dengan perusahaan dan kantor Anda.
                    </p>
                </div>

                <div className="stack stack--sm">
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Layanan</h4>
                    <a href="#/register-merchant" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>Daftar Mitra Katering</a>
                    <a href="#/register-customer" className="text-muted" style={{ textDecoration: 'none', fontSize: '0.9rem' }}>Daftar sebagai Perusahaan</a>
                </div>

                <div className="stack stack--sm">
                    <h4 style={{ margin: '0 0 0.5rem 0' }}>Kontak & Bantuan</h4>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>📍 Bandar Lampung, Lampung</span>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>📞 +62 822 8210 4482</span>
                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>✉️ yogiaprio@gmail.com</span>
                </div>
            </div>

            <div style={{
                maxWidth: '1200px',
                margin: '2rem auto 0 auto',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border-light)',
                textAlign: 'center',
            }}>
                <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
                    &copy; {currentYear} Marketplace Katering. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
