const {
    ObjectId,
    ReturnDocument
} = require("mongodb");

class RentService {

    constructor(client) {
        this.Rent = client.db().collection("rents");
    }

    extractContactData(payload) {
        const rent = {
            madocgia: payload.madocgia,
            masach: payload.masach,
            msnv: payload.msnv,
            ngaymuon: payload.ngaymuon,
            ngaytra: payload.ngaytra,
        };

        Object.keys(rent).forEach(
            (key) => rent[key] === undefined && delete rent[key]
        );
        return rent;
    }

    async create(payload) {
        const rent = this.extractContactData(payload);
        const result = await this.Rent.findOneAndUpdate(
            rent, {
                $set: rent                 
            }, {
                returnDocument: "after",
                upsert: true
            }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Rent.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: {
                $regex: new RegExp(name),
                $options: "i"
            },
        });
    }

    async findById(id) {
        return await this.Rent.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const update = this.extractContactData(payload);
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Rent.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Rent.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async findFavorite() {
        return await this.find({
            favorite: true
        });
    }

    async deleteAll() {
        const result = await this.Rent.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = RentService;