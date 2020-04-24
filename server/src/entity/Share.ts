import {
    Entity,
    Column,
    BaseEntity,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Note, User } from './index';

@Entity('shares')
@ObjectType()
export class Share extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @ManyToOne(() => User, user => user.shares, {
        eager: true
    })
    @JoinColumn({ name: 'user' })
    @Field(() => User)
    @Column('uuid')
    user!: string;

    @ManyToOne(() => Note, note => note.shares, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: 'note' })
    @Field(() => Note)
    @Column('uuid')
    note!: string;
}