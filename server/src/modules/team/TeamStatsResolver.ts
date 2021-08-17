import { Resolver, Mutation } from 'type-graphql';
import { Team } from '../../entity/Team';
import { TeamStats } from '../../entity/Team-Stats';
import { Result } from '../../shared';
import * as https from 'https';

const axios = require('axios');

@Resolver()
export class TeamStatsResolver {
    @Mutation(() => Result)
    async addTeamStats(): Promise<Result> {
        const year = new Date().getFullYear() - 1;
        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios
                .get(`https://fly.sportsdata.io/v3/nfl/stats/json/TeamSeasonStats/${year}REG?key=${process.env.SPORTS_DATA_KEY}`, { httpsAgent });

            const statList = response.data;

            statList.forEach(async (team: any) => {
                const statExists = await Team.findOne({
                    where: {
                        id: team.TeamId
                    },
                    select: ['id']
                });

                if (!statExists) {
                    await TeamStats.create({
                        team: team.TeamID, 
                        timeOfPossession: team.TimeOfPossession,
                        year: team.Season,
                        firstDowns: team.FirstDowns,
                        firstDownsByRushing: team.FirstDownsByRushing,
                        firstDownsByPassing: team.FirstDownsByPassing,
                        plays: team.OffensivePlays,
                        yards: team.OffensiveYards,
                        yardsPerPlay: team.OffensiveYardsPerPlay,
                        touchdowns: team.Touchdowns,
                        rushingAttempts: team.RushingAttempts,
                        rushingYards: team.RushingYards,
                        rushingYardsPerAttempt: team.RushingYardsPerAttempt,
                        rushingTouchdowns: team.RushingTouchdowns,
                        passingAttempts: team.PassingAttempts,
                        passingCompletions: team.PassingCompletions,
                        passingYards: team.PassingYards,
                        passingYardsPerAttempt: team.PassingYardsPerAttempt,
                        passingTouchdowns: team.PassingTouchdowns,
                        thirdDownPercentage: team.ThirdDownPercentage,
                        redzoneAttempts: team.RedZoneAttempts,
                        turnovers: team.Giveaways
                    }).save();
                }
            });
            return {
                success: [
                    {
                        path: 'team-stats',
                        message: 'Successfully added team stats',
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'team',
                        message: error
                    }
                ]
            }
        }
    }
}
