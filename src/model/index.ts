import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";


interface CatsAttributes{
    id : string
    name : string
    age : number
    breed : string
}

export class CatsInstance extends Model<CatsAttributes> {}

CatsInstance.init(
    {
        id: {
            type: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: 'cats',
    }
);