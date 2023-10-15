import {
    Column,
    Entity,
    Index,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Index("idx_actor_last_name", ["lastName"], {})
  @Entity("actor", { schema: "temp_sakila" })
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
  
  }
  