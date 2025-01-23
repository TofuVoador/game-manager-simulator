"use client";
import React from "react";

export default function Reports({ history }) {
	if (history.length === 0) {
		return <p className="text-gray-400">Nenhum relatório disponível ainda.</p>;
	}

	// Último ciclo registrado
	const newReport = history[history.length - 1];
	const lastReport = history[history.length - 2];

	const lastPlayers = lastReport ? lastReport.players : 0;
	const lastMoney = lastReport ? lastReport.money : 0;

	const playersDiff = newReport.players - lastPlayers;
	const moneyDiff = newReport.money - lastMoney;

	return (
		<div className="bg-gray-800 p-4 rounded">
			<h2 className="text-lg font-bold">📊 Relatório do Último Mês</h2>
			<div className="mt-2">
				<p>
					👥 Jogadores Ganhos/Perdidos:{" "}
					<span className="font-bold">{playersDiff.toLocaleString()}</span>
				</p>
				<p>
					💰 Dinheiro Ganho/Perdido:{" "}
					<span className="font-bold">${moneyDiff.toLocaleString()}</span>
				</p>
			</div>
		</div>
	);
}
