import { ObjectId, Timestamp } from "mongodb";
import { UserEntity } from "src/shared/entities.ts/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, ObjectIdColumn } from "typeorm";

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

    @Column({default: false})
    isDeleted: boolean

    @Column()
    creator: ObjectId

    // @ManyToOne(() => UserEntity, (user) => user.tasks)
    // user: UserEntity;
}

