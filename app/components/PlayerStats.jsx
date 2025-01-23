"use client";
import React from "react";

export default function PlayerStats({ players, money, month, year, gameName }) {
	const stats = [
		{ emoji: "🎮", label: "Jogadores", value: players },
		{ emoji: "💰", label: "Dinheiro", value: `$${money.toLocaleString()}` },
		{ emoji: "📅", label: "Data", value: `${month}/${year}` },
	];

	return (
		<div className=" gap-6 p-4 bg-gray-800 rounded">
			<h1 className="text-xl">{gameName}</h1>
			<div className="flex  justify-between">
				{stats.map((stat, index) => (
					<div
						key={index}
						className="relative group">
						{/* Emoji */}
						<span className="text-md cursor-pointer">
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
		</div>
	);
}
