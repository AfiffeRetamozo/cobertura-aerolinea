/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { AeropuertoAerolineaController } from './aeropuerto-aerolinea.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AerolineaEntity, AeropuertoEntity])],
  providers: [AeropuertoAerolineaService],
  controllers: [AeropuertoAerolineaController]
})
export class AeropuertoAerolineaModule {}
