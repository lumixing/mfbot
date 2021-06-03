const error = require("../functions/error");
const emotes = require("../resources/emotes.json");

function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// like timeout but sync
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

module.exports.run = async (msg, args) => {
	let startLoadingMessages = [
		"loading music-ai-reader...",
		"loading songer...",
		"initializing variables...",
		"copying files from tools/music...",
		"getting things done...",
		"constructing api-request...",
		"analyzing user input..."
	];

	let midLoadingMessages = [
		"processing url-grabber...",
		"grabbing user's ip...",
		"applying haptic hybernation...",
		"analyzing soundwaves...",
		"analyzing personal information...",
		`collecting ${msg.author.username}'s snowflake ids...`,
		"spying on members...",
		"reading code...",
		"returning void value to all non-void methods...",
		"deviding by zero...",
		"mentioning private fields as public...",
		"learning about async/await...",
		`deleting ${msg.guild.name}...`,
		`scanning files C:/mfbot/members/${msg.author.tag}/personal-info...`
	];

	let endLoadingMessages = [
		"almost done...!",
		"i am trying my best to get this done with...",
		"finalizing results...",
		"rigging result score...",
		"generating random number...",
		"relaxing...",
		"help me...",
		`storing ip value: ${msg.author.tag} to database ${msg.author.id}...`,
		"watching you...",
		"please wait...",
		"loading..."
	];

	// good luck trying to understand this code :)
	// dont touch it, it just works!
	// todo: optimise this shit

	let startLoadingMessagesCount = randomInteger(2, 4);
	let midLoadingMessagesCount = randomInteger(4, 6);
	let endLoadingMessagesCount = randomInteger(2, 4);
	let totalLoadingMessagesCount = startLoadingMessagesCount + midLoadingMessagesCount + endLoadingMessagesCount;
	let currentTotalI = 0;

	let loadingMessage = await msg.channel.send(`${emotes.loading} \`0%\` starting process...`);

	for (let i = 0; i < startLoadingMessagesCount; i++) {
		currentTotalI++;
		let perc = 99 / totalLoadingMessagesCount * currentTotalI;
		let time = randomInteger(300, 1000);
		let rng = Math.floor(Math.random() * startLoadingMessages.length);
		let message = startLoadingMessages.splice(rng, 1);

		loadingMessage.edit(`${emotes.loading} \`${Math.floor(perc)}%\` ${message}`);

		pause(time);
	}

	for (let i = 0; i < midLoadingMessagesCount; i++) {
		currentTotalI++;
		let perc = 99 / totalLoadingMessagesCount * currentTotalI;
		let time = randomInteger(500, 1500);
		let rng = Math.floor(Math.random() * midLoadingMessages.length);
		let message = midLoadingMessages.splice(rng, 1);

		loadingMessage.edit(`${emotes.loading} \`${Math.floor(perc)}%\` ${message}`);

		pause(time);
	}

	for (let i = 0; i < endLoadingMessagesCount; i++) {
		currentTotalI++;
		let perc = 99 / totalLoadingMessagesCount * currentTotalI;
		let time = randomInteger(300, 1000);
		let rng = Math.floor(Math.random() * endLoadingMessages.length);
		let message = endLoadingMessages.splice(rng, 1);

		loadingMessage.edit(`${emotes.loading} \`${Math.floor(perc)}%\` ${message}`);

		pause(time);
	}

	loadingMessage.edit(`✅ \`100%\` done!\npepejam rating: \`${randomInteger(0, 100)}%\``);
}
module.exports.meta = {
	name: "pepejamrate",
	aliases: ["pjr", "pjrate"],
	description: "rates your song",
	usage: "pepejamrate [song]",
	argsRequired: true,
	category: "fun"
}