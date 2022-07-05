import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import type { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    description: "shows account age and joined date",
    flags: ["unix", "u"]
})
export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const isRequestingUnix = args.getFlags("unix", "u");
        const member = await args.pick("member").catch(() => message.member);

        const createdDate = ~~(member?.user.createdTimestamp! / 1000);
        const joinedDate = ~~(member?.joinedTimestamp! / 1000);
        const embed = {
            color: 0xfffffe,
            author: {
                name: member?.user.tag,
                icon_url: member?.user.avatarURL()!
            },
            fields: [
                {
                    name: "created",
                    value: `<t:${createdDate}:R>${isRequestingUnix ? `\n\`${createdDate}\`` : ""}`,
                    inline: true
                },
                {
                    name: "joined",
                    value: `<t:${joinedDate}:R>${isRequestingUnix ? `\n\`${joinedDate}\`` : ""}`,
                    inline: true
                }
            ]
        };

        reply(message, { embeds: [embed] });
    }
}
