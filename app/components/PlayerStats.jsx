"use client";
import React from "react";

export default function PlayerStats({ players, money, month, gameName }) {
	const stats = [
		{ emoji: "🎮", label: "Jogadores", value: players },
		{ emoji: "💰", label: "Dinheiro", value: `$${money.toLocaleString()}` },
		{ emoji: "📅", label: "Meses", value: month },
	];

	return (
		<div className="flex gap-6 p-4 bg-gray-800 rounded justify-between">
			<h1 className="text-xl">{gameName}</h1>
			{stats.map((stat, index) => (
				<div
					key={index}
					className="relative group">
					{/* Emoji */}
					<span className="text-xl cursor-pointer">
						{stat.emoji} {stat.value}
					</span>

					{/* Tooltip (hidden by default, appears on hover) */}
					<div
						className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 
                          bg-gray-900 text-white text-xs rounded p-2 opacity-0 group-hover:opacity-100">
						{stat.label}
					</div>
				</div>
			))}
		</div>
	);
}
