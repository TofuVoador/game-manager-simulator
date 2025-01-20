import { useState } from "react";

const PlanningForm = ({ onSubmit, budget }) => {
	const [products, setProducts] = useState([]);
	const [marketing, setMarketing] = useState(0);

	const addProduct = (type) => {
		const newProduct = {
			id: Date.now(),
			name: `Novo ${type}`,
			price: "$",
			type,
			revenue: 0,
			playerImpact: 0,
			selected: true,
		};
		setProducts([...products, newProduct]);
	};

	const handleConfirm = () => {
		onSubmit({ products, marketing });
	};

	return (
		<div className="bg-gray-800 text-white p-4 rounded-lg">
			<h2 className="text-lg font-bold">📋 Planejamento</h2>

			<div className="mb-2">
				<button
					onClick={() => addProduct("bundle")}
					className="bg-blue-500 px-4 py-2 rounded">
					+ Bundle
				</button>
				<button
					onClick={() => addProduct("skin")}
					className="bg-blue-500 px-4 py-2 rounded ml-2">
					+ Skin
				</button>
				<button
					onClick={() => addProduct("season")}
					className="bg-blue-500 px-4 py-2 rounded ml-2">
					+ Temporada
				</button>
				<button
					onClick={() => addProduct("event")}
					className="bg-blue-500 px-4 py-2 rounded ml-2">
					+ Evento
				</button>
			</div>

			{products.map((product) => (
				<div
					key={product.id}
					className="flex justify-between p-2 border-b">
					<span>
						{product.name} ({product.type})
					</span>
					<select
						value={product.price}
						onChange={(e) => (product.price = e.target.value)}>
						<option value="Free">Free</option>
						<option value="$">$</option>
						<option value="$$">$$</option>
						<option value="$$$">$$$</option>
					</select>
				</div>
			))}

			<p className="mt-4">📢 Orçamento de Marketing: ${budget}</p>
			<input
				type="range"
				min="0"
				max={budget}
				value={marketing}
				onChange={(e) => setMarketing(e.target.value)}
			/>

			<button
				onClick={handleConfirm}
				className="bg-green-500 px-4 py-2 rounded mt-4 w-full">
				✅ Confirmar
			</button>
		</div>
	);
};

export default PlanningForm;
