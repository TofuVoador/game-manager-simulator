const Product = ({ product, onToggle }) => {
	const { name, price, type, revenue, selected, playerImpact } = product;

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
					{name} ({type})
				</h3>
				<p>
					💵 Preço: {price} | 📈 Receita: ${revenue.toLocaleString()}
				</p>
				<p>👥 Impacto: {playerImpact > 0 ? `+${playerImpact}` : playerImpact}</p>
			</div>
		</div>
	);
};

export default Product;
