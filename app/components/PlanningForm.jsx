"use client";
import React, { useState, useEffect } from "react";
import {
	calculateCost,
	calculateTotalCost,
	calculateTotalEffort,
	getSaturationByType,
} from "../utils/gameLogic";
import { getProductQuality } from "../utils/quality";

export default function PlanningForm({ onSubmit, budget }) {
	const [newProduct, setNewProduct] = useState({
		type: "season",
		name: "",
		price: "$",
		effort: "medium",
	});

	const [products, setProducts] = useState([]);
	const [costPreview, setCostPreview] = useState(16000);
	const [totalCostPreview, setTotalCostPreview] = useState(0);
	const [effortPreview, setEffortPreview] = useState(0);

	useEffect(() => {
		setTotalCostPreview(calculateTotalCost(products));
		setEffortPreview(calculateTotalEffort(products));
	}, [products]);

	const handleInputChange = (e) => {
		let p = { ...newProduct, [e.target.name]: e.target.value };
		setNewProduct(p);
		setCostPreview(calculateCost(p));
	};

	const addProduct = () => {
		if (!newProduct.name.trim()) return;
		setProducts([
			...products,
			{
				...newProduct,
				id: Date.now(),
				selected: true,
				saturation: 1.0,
			},
		]);
		setNewProduct({ type: "season", name: "", price: "$", effort: "medium" });
		setCostPreview(16000);
	};

	const removeProduct = (id) => {
		setProducts(products.filter((p) => p.id !== id));
	};

	const handleConfirm = () => {
		// Define saturationIndex e quality apenas no momento da confirmação
		const updatedProducts = products.map((product) => ({
			...product,
			saturationIndex: getSaturationByType(product.type),
			quality: getProductQuality(product.effort),
		}));

		onSubmit({ newProducts: updatedProducts });
		setProducts([]);
	};

	return (
		<div className="bg-gray-800 p-4 rounded">
			<h2 className="text-lg font-bold">📝 Planejamento do Mês</h2>

			<div className="mt-2 flex flex-col gap-2 bg-gray-700 p-4 rounded-md">
				<h3 className="font-bold">Novo Produto</h3>
				<select
					name="type"
					value={newProduct.type}
					onChange={handleInputChange}
					className="p-2 rounded text-black text-sm flex-1">
					<option value="season">Temporada</option>
					<option value="bundle">Bundle</option>
					<option value="skin">Skin</option>
					<option value="event">Evento</option>
				</select>
				{/* Linha combinada para Tipo e Preço */}
				<div className="flex gap-2 mt-2">
					<div className="flex-1">
						<label className="block text-sm font-bold mb-1">Esforço</label>
						<select
							name="effort"
							value={newProduct.effort}
							onChange={handleInputChange}
							className="p-2 rounded text-black text-sm w-full">
							<option value="low">Baixo (1)</option>
							<option value="medium">Médio (2)</option>
							<option value="high">Alto (3)</option>
						</select>
					</div>

					<div className="flex-1">
						<label className="block text-sm font-bold mb-1">Preço</label>
						<select
							name="price"
							value={newProduct.price}
							onChange={handleInputChange}
							className="p-2 rounded text-black text-sm w-full">
							<option value="Free">Grátis</option>
							<option value="$">$</option>
							<option value="$$">$$</option>
							<option value="$$$">$$$</option>
						</select>
					</div>
				</div>

				{/* Campo de Nome */}
				<input
					type="text"
					name="name"
					placeholder="Nome do Produto"
					value={newProduct.name}
					onChange={handleInputChange}
					className="p-2 rounded text-black text-sm"
				/>

				<p className="text-sm italic mt-2">💵 Custo do Produto: ${costPreview.toLocaleString()}</p>

				{/* Botão de Adicionar */}
				<button
					className="bg-blue-500 p-2 rounded text-sm"
					onClick={addProduct}>
					➕ Adicionar
				</button>
			</div>

			<div className="mt-4">
				<h3 className="text-md font-bold">📦 Produtos Selecionados</h3>
				{products.length > 0 ? (
					products.map((product) => (
						<div
							key={product.id}
							className="flex justify-between bg-gray-700 p-2 rounded mt-2">
							<div>
								<p className="text-xs italic">{product.type}</p>
								<h4 className="font-bold text-md">{product.name}</h4>
								<div className="flex gap-2 text-sm">
									<p className="rounded-sm bg-gray-500 px-1 py-0.5">💵 {product.price}</p>
									<p className="rounded-sm bg-gray-500 px-1 py-0.5">💪 {product.effort}</p>
								</div>
							</div>
							<button onClick={() => removeProduct(product.id)}>❌</button>
						</div>
					))
				) : (
					<p className="text-gray-400 italic text-xs">Nenhum produto adicionado.</p>
				)}
			</div>

			{/* Prévia de custos */}
			<div className="mt-4">
				<h3 className="text-md font-bold">💰 Custo</h3>
				<p className={`font-bold ${totalCostPreview > budget ? "text-red-500" : "text-green-500"}`}>
					${totalCostPreview} / ${budget}
				</p>
			</div>

			<div className="mt-4">
				<h1 className="text-md font-bold">💪 Esforço</h1>
				<div className="flex gap-1">
					{[...Array(5)].map((_, index) => (
						<div
							key={index}
							className={`w-5 h-5 rounded ${
								effortPreview > 5
									? "bg-red-500"
									: index < effortPreview
									? "bg-blue-500"
									: "bg-gray-500"
							}`}></div>
					))}
					<span
						className={`ml-2 text-sm font-bold  ${
							effortPreview > 5 ? "text-red-500" : "text-gray-500"
						}`}>
						{effortPreview} / 5
					</span>
				</div>
			</div>

			<button
				className={`p-2 rounded w-full mt-8 ${
					totalCostPreview > budget || effortPreview > 5
						? "bg-gray-500 cursor-not-allowed"
						: "bg-green-500"
				}`}
				onClick={handleConfirm}
				disabled={totalCostPreview > budget || effortPreview > 5}>
				✅ Confirmar Planejamento
			</button>
		</div>
	);
}
