import { Providers } from "./providers";
import "./styles/globals.css";
import CraftNavbar from "./navbar/Navbar";
import Footer from "./footer/footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className='light'>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Providers>
          <CraftNavbar />
          <main style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
