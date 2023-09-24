import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateActorDTO{
    @IsNotEmpty()
    @IsString()
    @Length(1, 45, { message: 'Firstname must be between 1 and 45 characters.' })
    first_name: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(1, 45, { message: 'Lastname must be between 3 and 45 characters.' })
    last_name: string;
}