import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
    JoinColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Team } from '../entity/Team';

@Entity('teamstats')
@ObjectType()
export class TeamStats extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'team' })
    @Field(() => Team, { nullable: true })
    @Column('int', { nullable: true })
    team!: number;

    @Field()
    @Column('text')
    timeOfPossession!: string;

    @Field()
    @Column('int')
    year!: number;
    
    @Field()
    @Column('int')
    firstDowns!: number;

    @Field()
    @Column('int')
    firstDownsByRushing!: number;

    @Field()
    @Column('int')
    firstDownsByPassing!: number;

    @Field()
    @Column('int')
    plays!: number;

    @Field()
    @Column('int')
    yards!: number;

    @Field()
    @Column('float')
    yardsPerPlay!: number;

    @Field()
    @Column('int')
    touchdowns!: number;

    @Field()
    @Column('int')
    rushingAttempts!: number;

    @Field()
    @Column('int')
    rushingYards!: number;

    @Field()
    @Column('float')
    rushingYardsPerAttempt!: number;

    @Field()
    @Column('int')
    rushingTouchdowns!: number;

    @Field()
    @Column('int')
    passingAttempts!: number;

    @Field()
    @Column('int')
    passingCompletions!: number;

    @Field()
    @Column('int')
    passingYards!: number;

    @Field()
    @Column('float')
    passingYardsPerAttempt!: number;

    @Field()
    @Column('int')
    passingTouchdowns!: number;

    @Field()
    @Column('float')
    thirdDownPercentage!: number;

    @Field()
    @Column('int')
    redzoneAttempts!: number;

    @Field()
    @Column('int')
    turnovers!: number;
}