import { ApplyOptions } from "@sapphire/decorators";
import { Command, CommandOptions, container } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { GuildMember, Message } from "discord.js";
import { emojis } from "../../assets/emojis.json";

@ApplyOptions<CommandOptions>({
    description: "guess the name of a randome emoji",
    aliases: ["ge"]
})
export class UserCommand extends Command {
    private guildID!: string;
    private member!: GuildMember;
    private emoji!: string;

    public async messageRun(message: Message) {
        this.guildID = message.guild?.id!;
        this.member = message.member!;

        // im so sorry for everything oh god remind me to rewrite this
        let streak = container.guessEmojiStreak.has(this.guildID)
            ? container.guessEmojiStreak.get(this.guildID)
            : container.guessEmojiStreak.set(this.guildID, 0).get(this.guildID);

        const randomEmoji = emojis[~~(Math.random() * emojis.length)];
        const emojiMessage = await reply(message, `:${randomEmoji}:`);
        this.emoji = randomEmoji;

        const filter = (m: Message) => m.author.id === message.author.id;
        try {
            const collection = await message.channel.awaitMessages({ filter, time: 15000, max: 1, errors: ["time"] });
            const replyMessage = collection.first()?.content.toLowerCase().replaceAll(" ", "_");

            if (replyMessage === randomEmoji) return this.setStreakAndReply(streak! + 1, emojiMessage, "success");
            this.setStreakAndReply(0, emojiMessage, "fail");
        } catch (err: any) { this.setStreakAndReply(0, emojiMessage, "timeout"); }
    }

    private setStreakAndReply(streak: number, emojiMessage: Message, type: "success" | "fail" | "timeout") {
        container.guessEmojiStreak.set(this.guildID, streak);
        reply(emojiMessage, { content: this.member.toString(), embeds: [this.returnEmbed(streak!, type)] });
    }

    private returnEmbed(streak: number, type: "success" | "fail" | "timeout") {
        let title;

        if (type === "success") title = `correct emote!`;
        else if (type === "fail") title = `wrong emote!\nit was \`${this.emoji}\``;
        else title = `ran out of time!\nit was \`${this.emoji}\``;

        return {
            color: type === "success" ? 0x2ecc71 : 0xe74c3c,
            author: {
                name: this.member.nickname! ?? this.member.user.username,
                icon_url: this.member?.user.avatarURL()!
            },
            title,
            description: `${type === "success" ? "current" : "lost"} streak: \`${streak}\``
        };
    }
}
