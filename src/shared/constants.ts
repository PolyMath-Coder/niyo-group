export enum AuthRoute {
    AUTH = 'auth',
    REGISTER = 'register',
    LOGIN = 'login'
}

export enum TaskRoute {
    TASKS = 'tasks',
    CREATE = 'create',
    SINGLE_TASK = ':taskId'
}

export enum GlobalRoute {
    PREFIX = 'api'
}

export enum TaskProrityEnum {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low',
    URGENT = 'urgent'
}

export enum TaskStatusEnum {
    TODO = 'to-do',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
    ON_HOLD = 'on-hold'
}