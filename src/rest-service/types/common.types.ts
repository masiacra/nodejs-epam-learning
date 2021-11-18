export type Id = string;

export interface Table<Instance, Params> {
    findOne(options?: object): Promise<Instance | null>;
    create(instance: Instance): Promise<Instance>;
    update(
        params: Params,
        updateOptions: object,
    ): Promise<[number, Instance[]]>;

    findAll(args?: object): Promise<Instance[]>;
}
