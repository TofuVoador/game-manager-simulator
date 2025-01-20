const PlayerStats = ({ players, money, month, year }) => {
	return (
		<div className="bg-gray-800 text-white p-4 rounded-lg flex justify-between">
			<span>👥 Jogadores: {players.toLocaleString()}</span>
			<span>💰 Dinheiro: ${money.toLocaleString()}</span>
			<span>
				📅 {month}/{year}
			</span>
		</div>
	);
};

export default PlayerStats;
