const {
    ObjectId,
    ReturnDocument
} = require("mongodb");

class StaffService {

    constructor(client) {
        this.Staff = client.db().collection("staffs");
    }

    extractContactData(payload) {
        const staff = {
            hotennv: payload.hotennv,
            msnv: payload.msnv,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai,
            chucvu: payload.chucvu,
            password: payload.password,
        };

        Object.keys(staff).forEach(
            (key) => staff[key] === undefined && delete staff[key]
        );
        return staff;
    }

    async login(payload) {
        const filter = {
            msnv:payload.msnv,
            password:payload.password,
        };
        return await this.Staff.findOne(filter);
    }

    async create(payload) {
        const staff = this.extractContactData(payload);
        const result = await this.Staff.findOneAndUpdate(
            staff, {
                $set: staff                 
            }, {
                returnDocument: "after",
                upsert: true
            }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Staff.find(filter);
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
        return await this.Staff.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const update = this.extractContactData(payload);
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const result = await this.Staff.findOneAndUpdate(
            filter, {
                $set: update
            }, {
                returnDocument: "after"
            }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Staff.findOneAndDelete({
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
        const result = await this.Staff.deleteMany({});
        return result.deletedCount;
    }

}

module.exports = StaffService;