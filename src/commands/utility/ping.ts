import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "pings the bot",
    aliases: ["p"]
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        const pingMessage = await reply(message, "pinging...");

        const botLatency = this.container.client.ws.ping;
        const apiLatency = (pingMessage.editedTimestamp || pingMessage.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);

        reply(message, `bot: ${botLatency}ms / api: ${apiLatency}ms`);
    }
}
