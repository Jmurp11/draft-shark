import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { Player } from './Player';
import { ObjectType, Field } from 'type-graphql';

@Entity('news')
@ObjectType()
export class News extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id!: number;

    @Field()
    @Column()
    source: string;

    @Field()
    @Column()
    timeAgo: string;

    @Field(() => Date)
    @Column('timestamp')
    updated: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    content: string;

    @ManyToOne(() => Player, {
        eager: true
    })
    @JoinColumn({ name: 'player' })
    @Field(() => Player, { nullable: true })
    @Column('int', { nullable: true })
    playerId: string;

    @Field()
    @Column()
    teamId: string;

    @Field()
    @Column()
    originalSource: string;

    @Field()
    @Column()
    originalSourceUrl: string;
}