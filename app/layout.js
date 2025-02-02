import { Montserrat, Roboto_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
	variable: "--font-montserrat",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto_Mono({
	variable: "--font-roboto",
	subsets: ["latin"],
	weight: ["400"],
});

export const metadata = {
	title: "Game Manager",
	description:
		"Simulador de Gerenciamento de Jogo. Planeje o lançamento de conteúdo, mapas e skins enquanto evita a descontinuação do jogo.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${montserrat.variable} ${roboto.variable} antialiased justify-center items-center flex bg-gray-900`}>
				<div className="container">{children}</div>
			</body>
		</html>
	);
}
