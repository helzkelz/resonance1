import { createContext, useState } from "react";

const starterItems = [
	{
		title: "Web Design Witchcraft",
		desc: "Building unapologetically weird and gorgeous sites.",
		type: "Skill",
	},
	{
		title: "Neurodivergent Alchemy Zine",
		desc: "Zine series on transforming chaos into creativity.",
		type: "Zine",
	},
];

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
	const [items, setItems] = useState(starterItems);

	const addItem = (item) => setItems((prev) => [item, ...prev]);
	const removeItem = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

	return <PortfolioContext.Provider value={{ items, addItem, removeItem }}>{children}</PortfolioContext.Provider>;
}

export { PortfolioContext };