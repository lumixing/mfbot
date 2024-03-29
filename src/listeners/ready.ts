import type { ListenerOptions, PieceContext } from "@sapphire/framework";
import { Listener, Store } from "@sapphire/framework";
import { blue, gray, green, yellow } from "colorette";
import { Collection } from "discord.js";

const dev = process.env.NODE_ENV !== "production";

export class UserEvent extends Listener {
    private readonly style = dev ? yellow : blue;

    public constructor(context: PieceContext, options?: ListenerOptions) {
        super(context, {
            ...options,
            once: true
        });
    }

    public run() {
        const { client, logger } = this.container;
        const stores = [...client.stores.values()];
        const last = stores.pop()!;

        for (const store of stores) logger.info(this.styleStore(store, false));
        logger.info(this.styleStore(last, true));
        logger.info(green("Ready!"));

        this.container.guessEmojiStreak = new Collection();
        this.container.guessEmojiPlaying = [];
    }

    private styleStore(store: Store<any>, last: boolean) {
        return gray(`${last ? "└─" : "├─"} Loaded ${this.style(store.size.toString().padEnd(3, " "))} ${store.name}.`);
    }
}

declare module "@sapphire/pieces" {
    interface Container {
        // Collection<GuildID: string, Streak: number>
        guessEmojiStreak: Collection<string, number>;

        // Collection<GuildID: string, isPlaying: boolean>
        guessEmojiPlaying: string[];
    }
}
