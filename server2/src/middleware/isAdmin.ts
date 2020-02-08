import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../types";
import { User } from "../entity";

export const isAdmin: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const user = await User.findOne({
        where: {
            id: context.req.session!.userId
        }
    });

    if (!user) {
        throw new Error("Not an Admin!");
    }
    
    if (!user!.isAdmin) {
        throw new Error("Not an Admin!");
    }

    return next();
};