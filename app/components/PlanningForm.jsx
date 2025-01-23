"use client";
import React, { useState, useEffect } from "react";
import { calcularCustoTotal, getSaturationByType } from "../utils/gameLogic";

export default function PlanningForm({ onSubmit, budget }) {
	const [newProduct, setNewProduct] = useState({
		type: "season",
		name: "",
		price: "$",
	});

	const [products, setProducts] = useState([]);
	const [costPreview, setCostPreview] = useState(0);
	const priceLevels = ["Free", "$", "$$", "$$$"];

	useEffect(() => {
		setCostPreview(calcularCustoTotal(products));
	}, [products]);

	const handleInputChange = (e) => {
		setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
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
				saturationIndex: getSaturationByType(newProduct.type),
			},
		]);
		setNewProduct({ type: "season", name: "", price: "$" });
	};

	const removeProduct = (id) => {
		setProducts(products.filter((p) => p.id !== id));
	};

	const handleConfirm = () => {
		onSubmit({ newProducts: products });
		setProducts([]);
	};

	return (
		<div className="bg-gray-800 p-4 rounded">
			<h2 className="text-lg font-bold">📝 Planejamento do Mês</h2>

			<div className="mt-2 flex flex-col gap-2">
				<select
					name="type"
					value={newProduct.type}
					onChange={handleInputChange}
					className="p-2 rounded text-black">
					<option value="season">Temporada</option>
					<option value="bundle">Bundle</option>
					<option value="skin">Skin</option>
					<option value="event">Evento</option>
				</select>

				<input
					type="text"
					name="name"
					placeholder="Nome do Produto"
					value={newProduct.name}
					onChange={handleInputChange}
					className="p-2 rounded text-black"
				/>

				<select
					name="price"
					value={newProduct.price}
					onChange={handleInputChange}
					className="p-2 rounded text-black">
					{priceLevels.map((level, index) => (
						<option
							key={index}
							value={level}>
							{level}
						</option>
					))}
				</select>

				<button
					className="bg-blue-500 p-2 rounded"
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
							<span>
								{product.type} {product.name} - {product.price}
							</span>
							<button onClick={() => removeProduct(product.id)}>❌</button>
						</div>
					))
				) : (
					<p className="text-gray-400">Nenhum produto adicionado.</p>
				)}
			</div>

			{/* Prévia de custos */}
			<div className="mt-4">
				<h3 className="text-md font-bold">💰 Custo Estimado</h3>
				<p className={`font-bold ${costPreview > budget ? "text-red-500" : "text-green-500"}`}>
					${costPreview} / ${budget}
				</p>
			</div>

			<button
				className="bg-green-500 p-2 rounded w-full mt-4"
				onClick={handleConfirm}
				disabled={costPreview > budget}>
				✅ Confirmar Planejamento
			</button>
		</div>
	);
}
