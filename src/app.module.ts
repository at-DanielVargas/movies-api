import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

const MOVIES_SERVICE_PORT = Number(process.env.MOVIES_SERVICE_PORT) || 3001;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MOVIES_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'movies-microservice.internal',
          port: MOVIES_SERVICE_PORT,
        },
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
