import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import { Collection, GuildMember, Message } from "discord.js";
import { emojis } from "../../assets/emojis.json";
import { correct, incorrect, timeout } from "../../assets/guessEmojiMessages.json";

@ApplyOptions<CommandOptions>({
    description: "guess the name of a randome emoji",
    aliases: ["ge"]
})
export class UserCommand extends Command {
    private guildID!: string;
    private member!: GuildMember;
    private streaks!: Collection<string, number>;
    private streak!: number;
    private emoji!: string;

    public async messageRun(message: Message) {
        this.guildID = message.guild?.id!;
        this.member = message.member!;
        this.streaks = this.container.guessEmojiStreak;
        this.streak = this.streaks.has(this.guildID) ? this.streaks.get(this.guildID)! : 0;
        this.emoji = emojis[~~(Math.random() * emojis.length)];

        const emojiMessage = await reply(message, `:${this.emoji}:`);

        const filter = (msg: Message) => msg.author.id === message.author.id;

        message.channel.awaitMessages({ filter, time: 15000, max: 1, errors: ["time"] })
            .then((collection) => {
                const response = collection.first()?.content.toLocaleLowerCase().replaceAll(" ", "_");

                if (response === this.emoji) {
                    return this.setStreakAndReply(++this.streak!, emojiMessage, "correct");
                }

                return this.setStreakAndReply(0, emojiMessage, "incorrect");
            })
            .catch((err) => {
                if (err instanceof Collection) {
                    return this.setStreakAndReply(0, emojiMessage, "timeout");
                }

                this.container.logger.error(";Could not await messages in channel", err);
            });
    }

    private setStreakAndReply(newStreak: number, message: Message, type: string) {
        this.streaks.set(this.guildID, newStreak);

        reply(message, {
            content: this.member.toString(),
            embeds: [this.returnEmbed(type, newStreak)]
        });
    }

    private returnEmbed(type: string, streak: number) {
        let title;

        if (type === "correct") {
            title = correct[~~(Math.random() * correct.length)];
        } else if (type === "incorrect") {
            title = `${incorrect[~~(Math.random() * incorrect.length)]}\nit was \`${this.emoji}\``;
        } else {
            title = `${timeout[~~(Math.random() * timeout.length)]}\nit was \`${this.emoji}\``;
        }

        return {
            color: type === "correct" ? 0x2ecc71 : 0xe74c3c,
            title,
            description: type === "correct"
                ? `streak: \`${streak}\``
                : `lost streak: \`${this.streak}\``
        }
    }
}
