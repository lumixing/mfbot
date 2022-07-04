import "./lib/setup";
import { LogLevel, SapphireClient } from "@sapphire/framework";

const client = new SapphireClient({
    defaultPrefix: ";",
    caseInsensitiveCommands: true,
    logger: { level: LogLevel.Debug },
    shards: "auto",
    intents: ["GUILDS", "GUILD_MESSAGES"]
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
