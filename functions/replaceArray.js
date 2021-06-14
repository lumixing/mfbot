module.exports = (arrayToReplace, arrayBeforeReplace, arrayAfterReplace) => {
	let returnArray = [];
	arrayToReplace.forEach(element => {
		if (!arrayAfterReplace[arrayBeforeReplace.indexOf(element)]) return;
		returnArray.push(arrayAfterReplace[arrayBeforeReplace.indexOf(element)]);
	});
	return returnArray;
}