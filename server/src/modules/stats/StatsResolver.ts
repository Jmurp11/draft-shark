import { Resolver, Mutation, UseMiddleware } from 'type-graphql';
import * as https from 'https';
import { Stats } from '../../entity/Stats';
import { Result } from '../../shared';
import { logger } from '../../middleware';
import { Player } from '../../entity/Player';

const axios = require('axios');

@Resolver()
export class StatsResolver {
    @UseMiddleware(logger)
    @Mutation(() => Result)
    async addStats(): Promise<Result> {

        const year = new Date().getFullYear() - 1;

        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios
                .get(`https://fly.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/${year}REG?key=${process.env.SPORTS_DATA_KEY}`, { httpsAgent });

            const statList = response.data;

            statList.forEach(async (player: any) => {
                const playerExists = await Player.findOne({
                    where: {
                        id: player.PlayerID
                    }
                });

                const statExists = await Stats.findOne({
                    where: {
                        player: player.PlayerID,
                        year: player.Season
                    },
                    select: ['id']
                });

                if (playerExists && !statExists) {
                    await Stats.create({
                        player: player.PlayerID,
                        year: player.Season,
                        gamesPlayed: player.Played,
                        completions: player.PassingCompletions,
                        attempts: player.PassingAttempts,
                        passTd: player.PassingTouchdowns,
                        passYards: player.PassingYards,
                        interception: player.PassingInterceptions,
                        carries: player.RushingAttempts,
                        rushYards: player.RushingYards,
                        rushTd: player.RushingTouchdowns,
                        fumbles: player.Fumbles,
                        targets: player.ReceivingTargets,
                        receptions: player.Receptions,
                        receivingYards: player.ReceivingYards,
                        receivingTd: player.ReceivingTouchdowns,
                        offensiveTeamSnaps: player.OffensiveTeamSnaps,
                        offensiveSnapsPlayed: player.OffensiveSnapsPlayed 
                    }).save();
                }
            });
            return {
                success: [
                    {
                        path: 'Stats',
                        message: 'Stats added successfully!'
                    }
                ]
            };
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'Stats',
                        message: error
                    }
                ]
            };
        }
    }
}