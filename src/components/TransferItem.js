import React from "react";

import "../css/SideList.css";
import { useStateContext } from "../context/StateContext";

const TransferItem = ({ item, children, level }) => {
	const {  transferValue, setTransferValue } =
		useStateContext();


	const handleChange = (event) => {
		const { name,  defaultValue } = event.target;

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
							id={item.id}
							name="moveInto"
							value={item.id}
							checked={transferValue.moveInto === item.id}
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
								id={item.id}
								name="moveInto"
								value={item.id}
								checked={transferValue.moveInto === item.id}
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
