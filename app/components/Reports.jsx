"use client";
import React from "react";

export default function Reports({ history, events }) {
	if (history.length === 0) {
		return <p className="text-gray-400">Nenhum relatório disponível ainda.</p>;
	}

	// Último ciclo registrado
	const lastReport = history[history.length - 1];

	return (
		<div className="bg-gray-800 p-4 rounded">
			<h2 className="text-lg font-bold">📊 Relatório do Último Mês</h2>

			<div className="mt-2">
				<p>
					👥 Jogadores Ativos:{" "}
					<span className="font-bold">{lastReport.players.toLocaleString()}</span>
				</p>
				<p>
					💰 Dinheiro Disponível:{" "}
					<span className="font-bold">${lastReport.money.toLocaleString()}</span>
				</p>
			</div>

			{/* Eventos do mês */}
			<div className="mt-2">
				<h3 className="text-md font-bold">📅 Eventos</h3>
				{events.length > 0 ? (
					<ul>
						{events.map((event, index) => (
							<li key={index}>
								{event.name} {event.impact}
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-400">Nenhum evento neste mês.</p>
				)}
			</div>
		</div>
	);
}
