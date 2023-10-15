import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("staff", { schema: "temp_sakila" })
export class Staff {
  @PrimaryGeneratedColumn({ type: "tinyint", name: "staff_id", unsigned: true })
  staffId: number;

  @Column("varchar", { name: "first_name", length: 45 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 45 })
  lastName: string;

  @Column("smallint", { name: "address_id", unsigned: true })
  addressId: number;

  @Column("blob", { name: "picture", nullable: true })
  picture: Buffer | null;

  @Column("varchar", { name: "email", nullable: true, length: 50 })
  email: string | null;

  @Column("tinyint", { name: "store_id", unsigned: true })
  storeId: number;

  @Column("tinyint", { name: "active", width: 1, default: () => "'1'" })
  active: boolean;

  @Column("varchar", { name: "username", length: 16 })
  username: string;

  @Column("varchar", { name: "password", nullable: true, length: 40 })
  password: string | null;

  @Column("timestamp", {
    name: "last_update",
    default: () => "CURRENT_TIMESTAMP",
  })
  lastUpdate: Date;

}
