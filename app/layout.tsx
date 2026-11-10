import "./globals.css";
export const metadata={title:"MÉTÉO ACADEMY",description:"Apprendre la météorologie en français."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}