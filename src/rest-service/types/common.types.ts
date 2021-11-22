export type Id = string;

export interface TransactionInstance {
    commit(): Promise<void>;
    rollback(): Promise<void>;
}

export interface IncludeTransaction {
    t: TransactionInstance;
}

export interface Table<Instance, Params> {
    findByPk(id: Id): Promise<Instance | null>;
    create(instance: Instance, obj?: object): Promise<Instance>;
    update(
        params: Params,
        updateOptions: object,
    ): Promise<[number, Instance[]]>;

    findAll(args?: object): Promise<Instance[]>;
}
