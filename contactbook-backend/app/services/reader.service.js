const {
    ObjectId,
    ReturnDocument
} = require("mongodb");

class ReaderService {

    constructor(client) {
        this.Reader = client.db().collection("readers");
    }

    extractContactData(payload) {
        const reader = {
            madocgia: payload.madocgia,
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
        };

        Object.keys(reader).forEach(
            (key) => reader[key] === undefined && delete reader[key]
        );
        return reader;
    }

    async create(payload) {
        const reader = this.extractContactData(payload);
        const result = await this.Reader.findOneAndUpdate(
            reader, {
                $set: reader                 
            }, {
                returnDocument: "after",
                upsert: true
            }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Reader.find(filter);
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
        return await this.Reader.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const update = this.extractContactData(payload);
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Reader.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Reader.findOneAndDelete({
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
        const result = await this.Reader.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = ReaderService;