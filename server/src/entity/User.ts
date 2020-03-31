import * as bcrypt from 'bcryptjs';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    BeforeInsert,
    OneToMany
} from "typeorm";
import { ObjectType, Field } from 'type-graphql';
import { Like, Note, Share } from '.';

@Entity("users")
@ObjectType()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Field()
    @Column("varchar", { length: 255 })
    email!: string;

    @Field()
    @Column("text")
    password!: string;

    @Field()
    @Column("text")
    username!: string;

    @Field()
    @Column("boolean", { default: false })
    confirmed!: boolean;

    @Field()
    @Column("boolean", { default: false })
    forgotPasswordLock!: boolean;

    @Field()
    @Column("boolean", { default: false })
    isLoggedIn!: boolean;

    @Field(() => Date)
    @Column("timestamp")
    creationTime!: string;

    @Field(() => Date)
    @Column("timestamp")
    lastLoggedIn!: string;

    @Field()
    @Column("boolean", { default: false })
    isAdmin!: boolean;

    @Field(() => String, { nullable: true })
    @Column("text", { nullable: true } )
    profileImage: string;
    
    @Field()
    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field(() => [Note], { nullable: true })
    @OneToMany(() => Note, note => note.user)
    notes: Note[];

    @Field(() => [Like], { nullable: true })
    @OneToMany(() => Like, like => like.user)
    likes: Like[];

    @Field(() => [Share], { nullable: true })
    @OneToMany(() => Share, share => share.user)
    shares: Share[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }
}
