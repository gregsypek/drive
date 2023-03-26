import React, { useState } from "react";

import "../css/SideList.css";
import LastItem from "./LastItem";
import { toast } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";

const TransferItem = ({ item, children, level }) => {
	const { filterCurrentDisplayItems, transferValue, setTransferValue } =
		useStateContext();

	console.log(
		"🚀 ~ file: TransferItem.js:14 ~ TransferItem ~ moveInto:",
		transferValue.moveInto
	);

	const handleChange = (event) => {
		const { name, value, defaultValue } = event.target;
		console.log(
			"🚀 ~ file: TransferItem.js:17 ~ handleChange ~ name:",
			defaultValue
		);
		setTransferValue((prevState) => ({
			...prevState,
			[name]: defaultValue,
		}));
	};

	return (
		<>
			{level ? (
				<li
					className={item.type === "folder" ? "folder" : "project"}
					style={{ marginLeft: 10 }}
				>
					<details>
						<summary>{item.itemText}</summary>
						<ul>
							{item.level.map((item, index) => (
								<TransferItem
									item={item}
									level={item.level !== undefined}
									key={item.itemText + index}
								>
									{item?.level && (
										<ul>
											{item.level.map((item) => (
												<TransferItem item={item} key={item.itemText + index} />
											))}
										</ul>
									)}
								</TransferItem>
							))}
						</ul>
					</details>
					{item.type === "folder" && (
						<input
							type="radio"
							id={item.itemText}
							name="moveInto"
							value={item.itemText}
							checked={transferValue.moveInto === item.itemText}
							onChange={handleChange}
						/>
					)}
				</li>
			) : (
				<>
					<li
						className={item.type === "folder" ? "folder" : "project"}
						style={{
							marginLeft: 10,
						}}
					>
						{item.itemText}
						{children}
						{item.type === "folder" && (
							<input
								type="radio"
								id={item.itemText}
								name="moveInto"
								value={item.itemText}
								checked={transferValue.moveInto === item.itemText}
								onChange={handleChange}
							/>
						)}
					</li>
				</>
			)}
		</>
	);
};

export default TransferItem;
