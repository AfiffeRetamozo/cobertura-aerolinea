/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { AeropuertoAerolineaService } from './aeropuerto-aerolinea.service';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AeropuertoAerolineaService', () => {
  let service: AeropuertoAerolineaService;
  let aerolineaRepository: Repository<AerolineaEntity>;
  let aeropuertoRepository: Repository<AeropuertoEntity>;
  let aerolinea: AerolineaEntity;
  let aeropuertoList : AeropuertoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoAerolineaService],
    }).compile();

    service = module.get<AeropuertoAerolineaService>(
      AeropuertoAerolineaService,
    );
    aeropuertoRepository = module.get<Repository<AeropuertoEntity>>(
      getRepositoryToken(AeropuertoEntity),
    );
    aerolineaRepository = module.get<Repository<AerolineaEntity>>(
      getRepositoryToken(AerolineaEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    aerolineaRepository.clear();
    aeropuertoRepository.clear();

    aeropuertoList = [];
    for(let i = 0; i < 5; i++){
        const aeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
          nombre: faker.person.firstName(),
          codigo: faker.airline.recordLocator(),
          pais: faker.location.country(),
          ciudad: faker.location.city()
        })
        aeropuertoList.push(aeropuerto);
    }
    aerolinea = await aerolineaRepository.save({
      nombre: faker.airline.recordLocator(), 
      descripcion: faker.lorem.sentence(), 
      fechaDeFundacion: faker.date.anytime(), 
      paginaWeb: faker.internet.url(), 
      aeropuerto: aeropuertoList
    })
  }
  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

 

  it('addAirportToAirline should throw an exception for an invalid aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.person.firstName(), 
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
    });

    await expect(() => service.addAirportToAirline("0", newAeropuerto.id)).rejects.toHaveProperty("message", "The aerolinea with the given id was not found");
  });


  it('findAirportFromAirline should throw an exception for an invalid aerolinea', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0]; 
    await expect(()=> service.findAirportFromAirline("0", aeropuerto.id)).rejects.toHaveProperty("message", "The aerolinea with the given id was not found"); 
  });

  it('findAirportFromAirline should throw an exception for an artwork not associated to the aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.person.firstName(), 
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
    });

    await expect(()=> service.findAirportFromAirline(aerolinea.id, newAeropuerto.id)).rejects.toHaveProperty("message", "The aeropuerto with the given id is not associated to the aerolinea"); 
  });


  it('findAirportsFromAirline should throw an exception for an invalid aerolinea', async () => {
    await expect(()=> service.findAirportsFromAirline("0")).rejects.toHaveProperty("message", "The aerolinea with the given id was not found"); 
  });

  it('updateAirportsFromAirline should update artworks list for a aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.person.firstName(), 
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
    });

    const updatedAerolinea: AerolineaEntity = await service.updateAirportsFromAirline(aerolinea.id, [newAeropuerto]);
    expect(updatedAerolinea.aeropuertos.length).toBe(1);

    expect(updatedAerolinea.aeropuertos[0].nombre).toBe(newAeropuerto.nombre);
    expect(updatedAerolinea.aeropuertos[0].codigo).toBe(newAeropuerto.codigo);
    expect(updatedAerolinea.aeropuertos[0].pais).toBe(newAeropuerto.pais);
    expect(updatedAerolinea.aeropuertos[0].ciudad).toBe(newAeropuerto.ciudad);
  });

  it('updateAirportsFromAirline should throw an exception for an invalid aerolinea', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.person.firstName(), 
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
    });

    await expect(()=> service.updateAirportsFromAirline("0", [newAeropuerto])).rejects.toHaveProperty("message", "The aerolinea with the given id was not found"); 
  });

  it('updateAirportsFromAirline should throw an exception for an invalid aeropuerto', async () => {
    const newAeropuerto: AeropuertoEntity = aeropuertoList[0];
    newAeropuerto.id = "0";

    await expect(()=> service.updateAirportsFromAirline(aerolinea.id, [newAeropuerto])).rejects.toHaveProperty("message", "The aeropuerto with the given id was not found"); 
  });

  it('deleteAirportFromAirline should thrown an exception for an invalid aeropuerto', async () => {
    await expect(()=> service.deleteAirportFromAirline(aerolinea.id, "0")).rejects.toHaveProperty("message", "The aeropuerto with the given id was not found"); 
  });

  it('deleteAirportFromAirline should thrown an exception for an invalid aerolinea', async () => {
    const aeropuerto: AeropuertoEntity = aeropuertoList[0];
    await expect(()=> service.deleteAirportFromAirline("0", aeropuerto.id)).rejects.toHaveProperty("message", "The aerolinea with the given id was not found"); 
  });

  it('deleteAirportFromAirline should thrown an exception for an non asocciated aeropuerto', async () => {
    const newAeropuerto: AeropuertoEntity = await aeropuertoRepository.save({
      nombre: faker.person.firstName(), 
      codigo: "123",
      pais: faker.location.country(),
      ciudad: faker.location.city(),
    });

    await expect(()=> service.deleteAirportFromAirline(aerolinea.id, newAeropuerto.id)).rejects.toHaveProperty("message", "The aeropuerto with the given id is not associated to the aerolinea"); 
  }); 


});
