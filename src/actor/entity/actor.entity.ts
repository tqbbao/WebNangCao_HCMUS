import { timeStamp } from "console";
import { Column, DeleteDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity({name: 'actor'})
export class Actor{
    @Column({primary: true, generated: true, name: 'actor_id', type: 'smallint', unsigned: true})
    actor_id: number;

    @Column({name: 'first_name', type: 'varchar', length: 45, nullable: false})
    first_name: string;

    @Column({name: 'last_name', type: 'varchar', length: 45, nullable: false})
    last_name: string;

    @Column({type: 'timestamp',default: () => 'CURRENT_TIMESTAMP' })
    last_update: Date;

    @DeleteDateColumn({type: 'timestamp', default: null, nullable: true})
    deleted_at: Date;
}