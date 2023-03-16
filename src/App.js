import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { buyItem, removeItem, buyWithInput } from "./Store/products";

function App() {
	const items = useSelector(state => state.products.items);
	const dispatch = useDispatch();

	const [money, setMoney] = useState(100000000000);

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const qwe = (e, id) => {
		console.log(e);
		const item = items.find(item => item.id === id);
		const qtd = e;
		let max = Math.floor(money / item.price);
		let adet = qtd - item.qtd;
		console.log(adet);
		if (qtd < item.qtd + max) {
			if (item.price * adet < money) {
				dispatch(buyWithInput({ id: id, count: adet + item.qtd }));
				setMoney(money - item.price * adet);
			}
		} else {
			dispatch(buyWithInput({ id: id, count: max + item.qtd }));
			setMoney(money - item.price * max);
		}
	};

	return (
		<div className='App'>
			<h1 style={{ textAlign: "center" }}>Spend Bill Gates' Money</h1>
			<div id='stickyDiv'>
				<h2
					style={{
						textAlign: "center",
						backgroundColor: "green",
						color: "white",
						width: "50%",
						margin: "0 auto",
						borderRadius: "5px",
						padding: "10px 0",
					}}>
					You have {formatter.format(money)}
				</h2>
			</div>
			<div className='items' style={{ width: "50%", display: "flex", flexWrap: "wrap", margin: "100px auto", gap: "20px 5% " }}>
				{items.map(item => (
					<div style={{ backgroundColor: "white", borderRadius: "20px", padding: "20px 0", flexBasis: "30%" }}>
						<div style={{ margin: "0 auto", textAlign: "center" }}>
							<div className='item-image'>
								<img style={{ maxWidth: "100%", height: "150px" }} src={item.img} alt={item.name} />
							</div>
							<div className='item-info'>
								<h3>{item.name}</h3>
								<p>{formatter.format(item.price)}</p>
							</div>
							<div>
								<button
									className='buyButton'
									style={{
										margin: "0 10px",
										backgroundColor: "green",
										color: "white",
										borderRadius: "5px",
										width: "50px",
										cursor: "pointer",
										padding: "5px 10px",
										border: "0",
										fontSize: "15px",
									}}
									disabled={money < item.price}
									onClick={() => {
										if (money >= item.price) {
											dispatch(buyItem(item.id));
											setMoney(money - item.price);
										}
									}}>
									Buy
								</button>
								<input
									type={"number"}
									value={item.qtd}
									style={{
										width: "50px",
										textAlign: "center",
										borderRadius: "5px",
										border: "none",
										backgroundColor: "lightgray",
										fontSize: "15px",
									}}
									onChange={e => {
										qwe(e.target.value, item.id);
									}}
								/>
								<button
									className='removeButton'
									style={{
										margin: "0 10px",
										backgroundColor: "red",
										color: "white",
										borderRadius: "5px",
										padding: "5px 10px",
										cursor: "pointer",
										width: "50",
										border: "0",
										fontSize: "15px",
									}}
									disabled={item.qtd === 0}
									onClick={() => {
										if (item.qtd > 0) {
											dispatch(removeItem(item.id));
											setMoney(money + item.price);
										}
									}}>
									Remove
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
