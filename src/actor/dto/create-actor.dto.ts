import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
export class CreateActorDTO {
  // @ApiProperty({ description: 'User name' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45, { message: 'Firstname must be between 1 and 45 characters.' })
  @Matches(/^[A-Za-z][^\W_]+$/, {
    message:
      'First name contains only letters (upper and lower case) and no numbers, special characters',
  })
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45, { message: 'Firstname must be between 1 and 45 characters.' })
  @Matches(/^[A-Za-z][^\W_]+$/, {
    message:
      'Last name contains only letters (upper and lower case) and no numbers, special characters',
  })
  lastName: string;


}
