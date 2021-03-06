import { InputType, Field } from 'type-graphql';

@InputType()
export class NoteInput {

    @Field()
    player: number;

    @Field()
    title: string;

    @Field()
    body: string;

    @Field()
    isPrivate: boolean;
}
