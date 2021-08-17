import { Resolver, Mutation, UseMiddleware, Query } from 'type-graphql';
import * as https from 'https';
import { Result } from '../../shared';
import { logger } from '../../middleware';
import { News } from '../../entity/News';
import { Player } from '../../entity/Player';
import { getRepository, SelectQueryBuilder } from 'typeorm';

const axios = require('axios');

@Resolver()
export class NewsResolver {

    @UseMiddleware(logger)
    @Query(() => [News])
    async news() {
        const query: SelectQueryBuilder<News> = getRepository(News)
            .createQueryBuilder('news')
            .leftJoinAndSelect('news.playerId', 'player')
            .orderBy('news.updated', 'DESC')

        return query.getMany()
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async getNews(): Promise<Result> {

        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios
                .get(`https://fly.sportsdata.io/v3/nfl/scores/json/News?key=${process.env.SPORTS_DATA_KEY}`, { httpsAgent });

            const news = response.data;

            news.forEach(async (n: any) => {
                const newsExists = await News.findOne({
                    where: { id: n.NewsID },
                    select: ['id']
                });

                const playerExists = await Player.findOne({
                    where: { id: n.PlayerID },
                    select: ['id']
                });

                if (newsExists && playerExists) {
                    await News.update(
                        {
                            id: n.NewsID
                        }, {
                        source: n.Source,
                        timeAgo: n.TimeAgo,
                        title: n.Title,
                        content: n.Content,
                        playerId: n.PlayerID,
                        teamId: n.TeamID,
                        updated: n.Updated,
                        originalSource: n.OriginalSource,
                        originalSourceUrl: n.OriginalSourceUrl
                    });
                } else if (!newsExists && playerExists) {
                    await News.create({
                        id: n.NewsID,
                        source: n.Source,
                        timeAgo: n.TimeAgo,
                        title: n.Title,
                        content: n.Content,
                        playerId: n.PlayerID,
                        teamId: n.TeamID,
                        updated: n.Updated,
                        originalSource: n.OriginalSource,
                        originalSourceUrl: n.OriginalSourceUrl
                    }).save();
                }
            });

            return {
                success: [
                    {
                        path: 'news',
                        message: 'Successfully retrieved News!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'news',
                        message: error
                    }
                ]
            }
        }
    }

    // TODO: SHOULD BE ISADMIN, ISAUTH
    @UseMiddleware(logger)
    @Mutation(() => Result)
    async getLatestNews(): Promise<Result> {
        let curDate = new Date().toLocaleDateString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric'
        }).split(' ');

        const formattedDate = `${curDate[2]}-${curDate[0].toUpperCase()}-${curDate[1].substring(0, 2)}`

        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });

            const response = await axios
                .get(`https://fly.sportsdata.io/v3/nfl/scores/json/NewsByDate/${formattedDate}?key=${process.env.SPORTS_DATA_KEY}`, { httpsAgent });

            const news = response.data;

            news.forEach(async (n: any) => {
                const newsExists = await News.findOne({
                    where: { id: n.NewsID },
                    select: ['id']
                });

                const playerExists = await Player.findOne({
                    where: { id: news.PlayerID },
                    select: ['id']
                });

                if (newsExists && playerExists) {
                    await News.update(
                        {
                            id: n.NewsID
                        }, {
                        source: n.Source,
                        timeAgo: n.TimeAgo,
                        title: n.Title,
                        content: n.Content,
                        playerId: n.PlayerID,
                        teamId: n.TeamID,
                        updated: n.Updated,
                        originalSource: n.OriginalSource,
                        originalSourceUrl: n.OriginalSourceUrl
                    });
                } else if (!newsExists && playerExists) {
                    await News.create({
                        id: n.NewsID,
                        source: n.Source,
                        timeAgo: n.TimeAgo,
                        title: n.Title,
                        content: n.Content,
                        playerId: n.PlayerID,
                        teamId: n.TeamID,
                        updated: n.Updated,
                        originalSource: n.OriginalSource,
                        originalSourceUrl: n.OriginalSourceUrl
                    }).save();
                }
            });

            return {
                success: [
                    {
                        path: 'news',
                        message: 'Successfully retrieved News!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'news',
                        message: error
                    }
                ]
            }
        }
    }
}