const Product = ({ product, onToggle }) => {
	const { name, price, type, revenue, selected, playerImpact, quality } = product;
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
					{type} | {price}
				</p>
				<div className="p-2">
					<p className="text-md">
						👥 {playerImpact > 0 ? `+${playerImpact}` : playerImpact} | 💵{" "}
						{revenue.toLocaleString() < 0 ? `-$` : `+$` + Math.abs(revenue.toLocaleString())}
					</p>
				</div>
				<div className="text-xs italic">
					<p>Qualidade x{quality}</p>
				</div>
			</div>
		</div>
	);
};

export default Product;
