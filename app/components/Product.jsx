const Product = ({ product, onToggle }) => {
	const { name, price, type, revenue, selected, playerImpact, happening } = product;

	return (
		<div className="bg-gray-700 text-white p-3 rounded-lg flex justify-between items-center">
			<input
				type="checkbox"
				checked={selected}
				onChange={() => onToggle(product.id)}
				className="w-6 h-6"
			/>
			<div>
				<h3 className="font-bold">
					{name} ({type} | {price})
				</h3>
				<p>
					👥 {playerImpact > 0 ? `+${playerImpact}` : playerImpact} | 💵 ${revenue.toLocaleString()}
				</p>
				{happening.name ? (
					<div className="text-xs p-1">
						<h1 className="italic">❗ {happening.name}</h1>
						<div className="flex gap-2">
							<p>👥 x{happening.playersMultiplier}</p>
							<p>💵 x{happening.playersMultiplier}</p>
						</div>
					</div>
				) : (
					<p className="text-xs p-1 italic">Nada ocorreu...</p>
				)}
			</div>
		</div>
	);
};

export default Product;
