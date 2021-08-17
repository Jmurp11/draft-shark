import { Resolver, Mutation, UseMiddleware, Query } from 'type-graphql';
import * as https from 'https';
import { Stadium } from '../../entity/Stadium';
import { Result } from '../../shared';
import { logger } from '../../middleware';
import { getRepository } from 'typeorm';

const axios = require('axios');

@Resolver()
export class stadiumResolver {

    @UseMiddleware(logger)
    @Query(() => [Stadium])
    async stadiums() {
        return getRepository(Stadium)
            .find();
    }

    @UseMiddleware(logger)
    @Mutation(() => Result)
    async updateStadiums(): Promise<Result> {

        try {
            const httpsAgent = new https.Agent({
                rejectUnauthorized: false
            });


            const response = await axios
                .get(`https://fly.sportsdata.io/v3/nfl/scores/json/Stadiums?key=${process.env.SPORTS_DATA_KEY}`, { httpsAgent });

            const stadiumList = response.data;

            stadiumList.forEach(async (stadium: any) => {
                const stadiumExists = await Stadium.findOne({
                    where: {
                        id: stadium.StadiumId
                    },
                    select: ['id']
                });

                if (stadiumExists) {
                    await Stadium.update(
                        {
                            id: stadium.StadiumID
                        }, {
                        name: stadium.Name,
                        city: stadium.City,
                        state: stadium.State,
                        country: stadium.Country,
                        capacity: stadium.Capacity,
                        type: stadium.Type,
                        playingSurface: stadium.PlayingSurface
                    });
                } else {
                    await Stadium.create({
                        id: stadium.StadiumID,
                        name: stadium.Name,
                        city: stadium.City,
                        state: stadium.State,
                        country: stadium.Country,
                        capacity: stadium.Capacity,
                        type: stadium.Type,
                        playingSurface: stadium.PlayingSurface
                    }).save();
                }
            });

            return {
                success: [
                    {
                        path: 'stadium',
                        message: 'Successfully retrieved stadium data!'
                    }
                ]
            }
        } catch (error) {
            return {
                errors: [
                    {
                        path: 'stadium',
                        message: error
                    }
                ]
            }
        }
    }
}