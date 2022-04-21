import { Model } from "objection";

export default class LinkModel extends Model {
    static tableName = "links";
    static idColumn = 'linkId';

    linkId!: number;
    from!: string;
    to!: string;
}