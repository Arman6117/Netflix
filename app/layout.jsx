import "./globals.css";

export const metadata = {
  title: "Netflix-Watch TV shows online,watch movies online",
  description:
    "Netflix is a streaming service that offers a wide variety of award-winning TV Shows, movies, anime, documentaries,and more entertainment... ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
