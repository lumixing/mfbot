import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, container } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";
import { emojis } from "../../assets/emojis.json";

@ApplyOptions<CommandOptions>({
    description: "guess the name of a randome emoji",
    aliases: ["ge"]
})
export class UserCommand extends Command {
    public async messageRun(message: Message) {
        // im so sorry for this
        let streak = container.guessEmojiStreak.has(message.guild?.id!)
            ? container.guessEmojiStreak.get(message.guild?.id!)
            : container.guessEmojiStreak.set(message.guild?.id!, 0).get(message.guild?.id!);

        const randomEmoji = emojis[~~(Math.random() * emojis.length)];
        const emojiMessage = await reply(message, `:${randomEmoji}:`);

        const filter = (m: Message) => m.author.id === message.author.id;
        try {
            const collection = await message.channel.awaitMessages({ filter, time: 15000, max: 1, errors: ["time"] });
            const replyMessage = collection.first()?.content.toLowerCase().replaceAll(" ", "_");

            if (replyMessage === randomEmoji) {
                container.guessEmojiStreak.set(message.guild?.id!, streak! + 1);
                return reply(emojiMessage, `${message.member?.toString()} got it right!\nstreak: \`${++streak!}\``);
            }

            container.guessEmojiStreak.set(message.guild?.id!, 0);
            return reply(emojiMessage, `${message.member?.toString()} got it wrong...\nit was \`${randomEmoji}\``);
        } catch (err: any) {
            container.guessEmojiStreak.set(message.guild?.id!, 0);
            return reply(emojiMessage, `${message.member?.toString()} ran out of time...\nit was \`${randomEmoji}\``);
        }
    }
}
