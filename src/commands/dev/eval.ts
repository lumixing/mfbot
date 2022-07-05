import { ApplyOptions } from "@sapphire/decorators";
import { Args, Command, CommandOptions } from "@sapphire/framework";
import { reply } from "@sapphire/plugin-editable-commands";
import Type from "@sapphire/type";
import { codeBlock, isThenable } from "@sapphire/utilities";
import type { Message } from "discord.js";
import { inspect } from "util";

@ApplyOptions<CommandOptions>({
    description: "evaluates code",
    aliases: ["ev"],
    flags: ["async", "a", "hidden", "h", "silent", "s"],
    options: ["depth"],
    preconditions: ["OwnerOnly"]
})
export class UserCommand extends Command {
    public async messageRun(message: Message, args: Args) {
        const code = await args.rest("string");

        const { success, result, type } = await this.eval(code, {
            async: args.getFlags("async", "a"),
            hidden: args.getFlags("hidden", "h"),
            depth: Number(args.getOption("depth")) ?? 0
        });

        const output = success ? codeBlock("js", result) : `an error occured: ${codeBlock("bash", result)}`;
        if (args.getFlags("silent", "s")) return null;

        const typeFooter = `type: ${codeBlock("typescript", type)}`;

        if (output.length > 2000) return reply(message, {
            content: `output was over 2000 characters, sending as a file\n\n${typeFooter}`,
            files: [{ attachment: Buffer.from(output), name: "output.js" }]
        });

        return reply(message, `${output}\n${typeFooter}`);
    }

    private async eval(code: string, flags: { async: boolean; hidden: boolean; depth: number }) {
        if (flags.async) code = `(async () => {${code}})();`;

        let success = true;
        let result = null;

        try { result = eval(code) }
        catch (err) {
            if (err && err instanceof Error && err.stack) this.container.logger.error(err);
            success = false;
            result = err;
        }

        const type = new Type(result).toString();

        if (isThenable(result)) result = await result;
        if (typeof result !== "string") result = inspect(result, flags.hidden, flags.depth);

        return { success, result, type };
    }
}
