const DiscordRPC = require("discord-rpc");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const client = new DiscordRPC.Client({ transport: "ipc" });
let startTimestamp;
if(!config.startTimestamp) {
	startTimestamp = new Date();
} else {
	startTimestamp = config.startTimestamp;
}

async function setActivity() {
	if(!client) return;
	
	await client.setActivity({
		details: config.details,
		state: config.state,
		startTimestamp,
		largeImageKey: config.largeImage,
		largeImageText: config.largeImageText,
		smallImageKey: config.smallImage,
		smallImageText: config.smallImageText
	});
}

client.on("ready", () => {
	setActivity();
	console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
});

client.login({ clientId: config.clientId }).catch(console.error);