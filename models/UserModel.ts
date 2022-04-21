import { Model } from "objection";

export default class UserModel extends Model {
    static tableName = "users";
    static idColumn = 'userId';

    userId!: number;
    username!: string;
    password!: string;
    uuid!: string;
}