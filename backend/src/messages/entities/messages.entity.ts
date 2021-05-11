import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({
    name: 'messages',
})
export class Messages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: number;

    @Column()
    to: number;

    @Column()
    payload: string;

    @CreateDateColumn()
    date: Date;
}
