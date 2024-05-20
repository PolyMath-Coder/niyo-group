import { ObjectId } from "mongodb";
import { TaskEntity } from "src/tasks/entities/task.entity";
import { Column, Entity, ObjectIdColumn, OneToMany } from "typeorm";


@Entity('user')
export class UserEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string

    @Column()
    password: string

    // @OneToMany(() => TaskEntity, (task) => task.user)
    // tasks: TaskEntity[];
}