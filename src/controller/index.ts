import { v4 as uuidv4 } from 'uuid';
import { CatsInstance } from '../model';
import { Request, Response } from 'express';
import CatsValidator from '../validator'
import Middleware from '../middleware';

class CatsController {
    
    async createCat(req: Request, res: Response){
    const id = uuidv4();
    try {
        const record = await CatsInstance.create({ ...req.body, id })
        return res.json({ record, msg: "Successfully added Cat details" })
    }
    catch(e) {
        return res.json({msg: " failed to add cat details to record" , status: 500, route: '/cats'})
    }
    };

    async updateCat(req: Request, res: Response){
    const { id } = req.params
    try {
        const record = await CatsInstance.findOne({ where: { id } })
        if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" })

        const updatedRecord = await record.update({
            name: record.getDataValue('name'),
            age: record.getDataValue('age'),
            breed: record.getDataValue('breed')
        })

        return res.json({ record: updatedRecord, msg: "Successfully updated cat" });
    }
    catch(e) {
        return res.json({msg: " failed to update cat details to record" , status: 500, route: '/cats/:id'})
    }
    };

    async deleteCat(req: Request, res: Response){
    const { id } = req.params
    try {
        const record = await CatsInstance.findOne({ where: { id } })
        if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" })

        const deletedRecord = await record.destroy();

        return res.json({ record: deletedRecord , msg: "Successfully deleted cat"});
    }
    catch(e) {
        return res.json({msg: " failed to delete cat details to record" , status: 500, route: '/cats/:id'})
    }
    }

    async getCats(req: Request, res: Response){
        let { age_lte, age_gte } = req.query;
        try {
            const records = await CatsInstance.findAll({ where: {} })
            //'/cats/?age_lte=20&age_gte=10'
            const filteredRecords = records.filter((cats) => {
                if(cats.getDataValue('age') >= Number(age_gte) && cats.getDataValue('age') <= Number(age_lte)) {
                    return cats
                }
            })
            if (age_lte === undefined && age_gte === undefined) {
                return res.json({ records, msg: "Successfully read Cat details" })
            }
            else return res.json({ filteredRecords, msg: "Successfully read filtered Cat details" }) 
        }
        catch(e){
            return res.json({msg: " failed to read from cats database" , status: 500, route: '/cats'})
        }
    }

    async getCat(req: Request, res: Response){
        const { id } = req.params
        try {
            const record = await CatsInstance.findOne({ where: { id } })
            if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" })
            else 
                return res.json({ record, msg: "Successfully read Cat details" })
        }
        catch(e){
            return res.json({msg: " failed to read from cats database" , status: 500, route: '/cats/:id'})
        }
    }

}

export default new CatsController();