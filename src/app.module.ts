/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AeropuertoAerolineaModule } from './aeropuerto-aerolinea/aeropuerto-aerolinea.module';

@Module({
  imports: [AerolineaModule, AeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'coberturaaerolineas',
      entities: [AerolineaEntity, AeropuertoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    AeropuertoAerolineaModule,
  
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
