import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
export class CreateActorDTO {
  // @ApiProperty({ description: 'User name' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45, { message: 'Firstname must be between 1 and 45 characters.' })
  
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45, { message: 'Firstname must be between 1 and 45 characters.' })

  lastName: string;


}
