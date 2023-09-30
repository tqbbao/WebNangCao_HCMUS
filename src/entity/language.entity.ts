import { Column, Entity } from "typeorm";

@Entity({ name: 'language' })
export class Language{
    @Column({primary: true, generated: true, name: 'language_id', type: 'tinyint', unsigned: true, nullable: false})
    language_id: number;
    @Column({name: 'name', type: 'char', length: 20, nullable: false})
    name: string;
    @Column({name: 'last_update', type: 'timestamp', default: 'CURRENT_TIMESTAMP'})
    last_update: Date;
}