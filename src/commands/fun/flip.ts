import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "flips a coin for you",
    aliases: ["fl"]
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        reply(message, "flipping coin...");

        setTimeout(() => {
            reply(message, Math.random() < 0.5 ? "landed on heads!" : "landed on tails!");
        }, 1000);
    }
}
