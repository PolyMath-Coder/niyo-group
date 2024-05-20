import { ObjectId, Timestamp } from "mongodb";
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity('task')
export class TaskEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: string

    @Column()
    priority: string

    @Column({default: null})
    attachment: string

    @CreateDateColumn()
    createdAt: Timestamp

    @Column()
    dueDate: Date

    @Column({default: null})
    actualTimeCompleted: Date

    @Column()
    category: string

    @Column()
    creator: ObjectId
}

