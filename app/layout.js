import { Comfortaa, Sanchez, Space_Mono } from "next/font/google";
import "./globals.css";

const comfortaa = Comfortaa({
	variable: "--font-comfortaa",
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

const sanches = Sanchez({
	variable: "--font-sanches",
	subsets: ["latin"],
	weight: ["400"],
});

const spaceMono = Space_Mono({
	variable: "--font-space-mono",
	subsets: ["latin"],
	weight: ["400", "700"],
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
				className={`${comfortaa.variable} ${sanches.variable} ${spaceMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
