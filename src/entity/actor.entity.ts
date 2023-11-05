import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('actor', { schema: 'test-sakila' })
export class Actor {
  @PrimaryGeneratedColumn({
    type: "smallint",
    name: "actor_id",
    unsigned: true,
  })
  actorId: number;

  @Column("varchar", { name: "first_name", length: 45 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 45 })
  lastName: string;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

}
