/* eslint-disable prettier/prettier */
import {IsNotEmpty, IsString} from 'class-validator';
export class AerolineaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
    
    @IsNotEmpty()
    readonly fechaDeFundacion: Date;
    
    @IsString()
    @IsNotEmpty()
    readonly paginaWeb: string;

}
