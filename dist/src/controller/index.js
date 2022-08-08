"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const model_1 = require("../model");
class CatsController {
    async createCat(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const record = await model_1.CatsInstance.create({ ...req.body, id });
            return res.json({ record, msg: "Successfully added Cat details" });
        }
        catch (e) {
            return res.json({ msg: " failed to add cat details to record", status: 500, route: '/cats' });
        }
    }
    ;
    async updateCat(req, res) {
        const { id } = req.params;
        try {
            const record = await model_1.CatsInstance.findOne({ where: { id } });
            if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" });
            const updatedRecord = await record.update({
                name: record.getDataValue('name'),
                age: record.getDataValue('age'),
                breed: record.getDataValue('breed')
            });
            return res.json({ record: updatedRecord, msg: "Successfully updated cat" });
        }
        catch (e) {
            return res.json({ msg: " failed to update cat details to record", status: 500, route: '/cats/:id' });
        }
    }
    ;
    async deleteCat(req, res) {
        const { id } = req.params;
        try {
            const record = await model_1.CatsInstance.findOne({ where: { id } });
            if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" });
            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord, msg: "Successfully deleted cat" });
        }
        catch (e) {
            return res.json({ msg: " failed to delete cat details to record", status: 500, route: '/cats/:id' });
        }
    }
    async getCats(req, res) {
        let { age_lte, age_gte } = req.query;
        try {
            const records = await model_1.CatsInstance.findAll({ where: {} });
            //'/cats/?age_lte=20&age_gte=10'
            const filteredRecords = records.filter((cats) => {
                if (cats.getDataValue('age') >= Number(age_gte) && cats.getDataValue('age') <= Number(age_lte)) {
                    return cats;
                }
            });
            if (age_lte === undefined && age_gte === undefined) {
                return res.json({ records, msg: "Successfully read Cat details" });
            }
            else
                return res.json({ filteredRecords, msg: "Successfully read filtered Cat details" });
        }
        catch (e) {
            return res.json({ msg: " failed to read from cats database", status: 500, route: '/cats' });
        }
    }
    async getCat(req, res) {
        const { id } = req.params;
        try {
            const record = await model_1.CatsInstance.findOne({ where: { id } });
            if (!record)
                return res.json({ record, msg: "cat not found in database or database empty" });
            else
                return res.json({ record, msg: "Successfully read Cat details" });
        }
        catch (e) {
            return res.json({ msg: " failed to read from cats database", status: 500, route: '/cats/:id' });
        }
    }
}
exports.default = new CatsController();
