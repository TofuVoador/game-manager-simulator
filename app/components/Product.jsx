const Product = ({ product, onToggle }) => {
	const { name, price, type, revenue, selected, playerImpact, quality } = product;

	const productTypes = { season: "Temporada", bundle: "Pacote", skin: "Visual", event: "Evento" };
	const productEfforts = { low: "Baixo", medium: "Médio", high: "Alto" };

	return (
		<div className="bg-gray-700 text-white p-3 rounded-lg flex gap-4 items-center">
			<input
				type="checkbox"
				checked={selected}
				onChange={() => onToggle(product.id)}
				className="w-5 h-5"
			/>
			<div className="flex flex-col w-max">
				<h3 className="font-bold">{name}</h3>
				<p className="text-xs">
					{productTypes[type]} | {price}
				</p>
				<div className="p-2">
					<p className="text-md">
						👥{" "}
						{playerImpact > 0 ? `+${playerImpact.toLocaleString()}` : playerImpact.toLocaleString()}{" "}
						| 💵 {(revenue <= 0 ? `$` : `+$`) + revenue.toLocaleString()}
					</p>
				</div>
				<div className="text-xs  ">
					<p> x{quality.index}</p>
					<p className="text-gray-500 italic font-mono">{quality.desc}</p>
				</div>
			</div>
		</div>
	);
};

export default Product;
