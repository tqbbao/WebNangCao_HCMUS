import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Language } from "./language.entity";

@Entity({name: 'film'})
export class Film{
    @Column({primary: true, generated: true, name: 'film_id', type: 'smallint', unsigned: true, nullable: false})
    film_id: number;
    @Column({name: 'title', type: 'varchar', length: 255, nullable: false})
    title: string;
    @Column({name: 'description', type: 'text', nullable: true, default: null})
    description: string;
    @Column({name: 'release_year', type: 'year', nullable: true, default: null})
    release_year: number;
    // @Column({name: 'language_id', type: 'tinyint', unsigned: true, nullable: false})
    // language_id: number;
    // @Column({name: 'original_language_id', type: 'tinyint', unsigned: true, nullable: true, default: null})
    // original_language_id: number;
    @Column({name: 'rental_duration', type: 'tinyint', unsigned: true, nullable: false, default: 3})
    rental_duration: number;
    @Column({name: 'rental_rate', type: 'decimal', precision: 4, scale: 2, nullable: false, default: 4.99})
    rental_rate: number;
    @Column({name: 'length', type: 'smallint', unsigned: true, nullable: true, default: null})
    length: number;
    @Column({name: 'replacement_cost', type: 'decimal', precision: 5, scale: 2, nullable: false, default: 19.99})
    replacement_cost: number;
    @Column({name: 'rating', type: 'enum', enum: ['G','PG','PG-13','R','NC-17'], nullable: true, default: null})
    rating: string;
    @Column({name: 'special_features', type: 'set', enum: ['Trailers','Commentaries','Deleted Scenes','Behind the Scenes'], nullable: true, default: null})
    special_features: string;
    @Column({name: 'last_update', type: 'timestamp', default: 'CURRENT_TIMESTAMP'})
    last_update: Date;

    @OneToOne(() => Language)
    @JoinColumn({name: 'language_id'})
    language_id: Language;
    
    @OneToOne(() => Language)
    @JoinColumn({name: 'original_language_id'})
    original_language_id: Language;

    

}