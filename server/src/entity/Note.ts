import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Like, Player, Share, User } from './index';
import { ObjectType, Field } from 'type-graphql';

@Entity('notes')
@ObjectType()
export class Note extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Player, {
        eager: true
    })
    @JoinColumn({ name: 'player' })
    @Field(() => Player)
    @Column('text')
    player!: number;

    @Field()
    @Column('text')
    title!: string;

    @Field()
    @Column('text')
    body!: string;

    @Field()
    @Column('text')
    source!: string;

    @Field()
    @Column('boolean', { default: false })
    isPrivate!: boolean;

    @Field(() => [Like], { nullable: true })
    @OneToMany(() => Like, like => like.note)
    likes: Like[];

    @Field(() => [Share], { nullable: true })
    @OneToMany(() => Share, share => share.note)
    shares: Share[];

    @Field(() => Date)
    @Column('timestamp')
    creationTime!: string;
}
