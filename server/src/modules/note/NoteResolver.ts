import { Resolver, Query, Mutation, Arg, UseMiddleware, Subscription, Root, PubSubEngine, PubSub } from 'type-graphql';
import { Note } from '../../entity';
import { Result } from '../../types';
import { NoteInput, SubscriptionInput } from './inputs';
import { getRepository } from 'typeorm';
import { isAuth, logger } from '../../middleware';

const NOTE = 'NOTE';

@Resolver()
export class NoteResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => [Note])
    async notes() {
        return getRepository(Note)
            .find({
                relations: ['user', 'player'],
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Query(() => Note)
    async note(@Arg('id') id: string) {
        return getRepository(Note)
            .findOne({
                relations: ['user', 'player'],
                where: { id },
                order: {
                    creationTime: 'DESC'
                }
            });
    }

    @UseMiddleware(isAuth, logger)
    @Mutation(() => Result)
    async createNote(
        @PubSub() pubsub: PubSubEngine,
        @Arg('input') {
            user,
            player,
            title,
            body,
            source,
            isPrivate
        }: NoteInput
    ): Promise<Result> {
        const likes = 0;
        const shares = 0;

        const titleExists = await Note.findOne({
            where: {
                user,
                player,
                title
            },
            select: ['id']
        });

        if (titleExists) {
            return {
                errors: [
                    {
                        path: 'note',
                        message: 'User has already created note with this title for this player!'
                    }
                ]
            }
        }

        const creationTime = new Date().toISOString();

        await Note.create({
            user,
            player,
            creationTime,
            title,
            body,
            source,
            isPrivate,
            likes,
            shares
        }).save();

        const newNote = await Note.findOne({
            where: {
                user,
                player,
                creationTime,
                title,
                body,
                source,
            }
        });

        await pubsub.publish(NOTE, newNote);
        
        return {
            success: [
                {
                    path: 'note',
                    message: 'Successfully added note!'
                }
            ]
        }
    }

    @UseMiddleware(isAuth, logger)
    @Subscription(() => Note,
        {
            topics: NOTE
        })
    newUserNote(
        @Root() note: Note,
        @Arg('input') { user, player }: SubscriptionInput
    ): Note | undefined {
        if (user === note.user && player === note.player) {
            return note;
        }
        return undefined;
    }

    @UseMiddleware(isAuth, logger)
    @Subscription(() => Note,
        {
            topics: NOTE
        })
    newPlayerNote(
        @Root() note: Note,
        @Arg('input') { player }: SubscriptionInput
    ): Note | undefined {
        if (player === note.player) {
            return note;
        }
        return undefined;
    }

    @UseMiddleware(isAuth, logger)
    @Subscription(() => Note,
        {
            topics: NOTE
        })
    newNote(
        @Root() note: Note,
    ): Note | undefined {
        return note;
    }
}