const { ObjectId } = require("mongodb");
class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts"); // declare new Contact = collection contacts
  }
  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite,
    }; // create this to use for update one or more
    // Remove undefined fields
    Object.keys(contact).forEach((key) => contact[key] === undefined && delete contact[key]);
    // loop every contact's key and check condition after it
    // if value[key] in contact === undefined => delete it
    return contact;
  }
  //todo: create
  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      contact,
      {
        $set: { favorite: contact.favorite === true }, // options
      },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }
  //todo: find
  async find(filter) {
    const cursor = await this.Contact.find(filter); // callback
    return await cursor.toArray();
  }
  async findFavorite() {
    return await this.find({ favorite: true });
  }

  //todo: find by name
  async findByName(name) {
    return await this.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
  }
  //todo: find by id
  async findById(id) {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }
  async delete(id) {
    const result = await this.Contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }
  async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount;
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
}
module.exports = ContactService;
