import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { send } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    aliases: ["p"],
    description: "pings the bot"
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        return send(message, `${this.container.client.ws.ping}ms`);
    }
}
