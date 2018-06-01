const getItems = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(['Mobile', 'Mac', 'Windows', 'Chome', 'Linux']);
		}, 2000);
	});
};

// getItems()
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
//
const processRequest = async () => {
	const results1 = await getItems();
	const results2 = await getItems();
	const results3 = await getItems();
	const results4 = await getItems();
	const results5 = await getItems();

	return [results1, results2, results3, results4, results5];
};

processRequest()
	.then(items => {
		console.log(items);
	})
	.catch(error => {
		console.log(error);
	});
