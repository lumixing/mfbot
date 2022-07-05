import "./lib/setup";
import { LogLevel, SapphireClient } from "@sapphire/framework";

const client = new SapphireClient({
    defaultPrefix: ";",
    caseInsensitiveCommands: true,
    logger: { level: LogLevel.Debug },
    shards: "auto",
    intents: ["GUILDS", "GUILD_MESSAGES"],
    failIfNotExists: false,
    presence: { activities: [{ name: "random message here! | ;help" }] }
});

const main = async () => {
    try {
        client.logger.info("Logging in...");
        await client.login();
        client.logger.info("Logged in!");
    } catch (error) {
        client.logger.fatal(error);
        client.destroy();
        process.exit(1);
    }
};

main();
