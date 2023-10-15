import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/entity/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly actorRepository: Repository<Staff>,
  ) {}

  // create method find staff by email
  async findByEmail(email: string): Promise<Staff> {
    return await this.actorRepository.findOneBy({ email: email });
  }

  // create method create staff
    async create(staff: Staff): Promise<Staff> {
        return await this.actorRepository.save(staff);
    }


}
