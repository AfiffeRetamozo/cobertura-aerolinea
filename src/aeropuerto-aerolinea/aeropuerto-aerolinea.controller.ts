/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
import { plainToInstance } from 'class-transformer';
import { AeropuertoDto } from '../aeropuerto/aeropuerto.dto';

@Controller('aeropuerto-aerolineas')
@UseInterceptors(BusinessErrorsInterceptor)
export class AeropuertoAerolineaController {

constructor(private readonly aeropuertoAerolineaService: AeropuertoAerolineaService){}

@Post(':aerolineaId/aeropuertos/:aeropuertoId')
   async addAirportToAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
       return await this.aeropuertoAerolineaService.addAirportToAirline(aerolineaId, aeropuertoId);
}


@Get(':aerolineaId/aeropuertos')
   async findAirportsFromAirline(@Param('aerolineaId') aerolineaId: string){
       return await this.aeropuertoAerolineaService.findAirportsFromAirline(aerolineaId);
}

@Get(':aerolineaId/aeropuertos/:aeropuertoId')
   async findAirportFromAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
       return await this.aeropuertoAerolineaService.findAirportFromAirline(aerolineaId, aeropuertoId);
}

@Put(':aerolineaId/aeropuertos')
   async updateAirportsFromAirline(@Body() aeropuertoDto: AeropuertoDto[], @Param('aerolineaId') aerolineaId: string){
       const aeropuertos = plainToInstance(AeropuertoEntity, aeropuertoDto)
       return await this.aeropuertoAerolineaService.updateAirportsFromAirline(aerolineaId, aeropuertos);
}

@Delete(':aerolineaId/aeropuertos/:aeropuertoId')
@HttpCode(204)
   async deleteAirportFromAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string){
       return await this.aeropuertoAerolineaService.deleteAirportFromAirline(aerolineaId, aeropuertoId);
   }

}
