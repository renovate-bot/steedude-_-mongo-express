const users = [
  {
    _id: 1,
    username: 'admin',
    password: '$2b$10$Km/z54B8hEgDVy0uy3j6qucBLYFa3PFNHo6l/U1rub4RPyD89qaMi',
  }, // '1234' encrypted by bcryce
  {
    _id: 2,
    username: 'user',
    password: '$2b$10$.DSsxhvpOi8nPwajJFCKTuT663yAtwMVLagYdTLWmAP.LGxPOEB2C',
  }, // '5678' encrypted by bcryce
]

const table = { 1: users[0], 2: users[1] }
const tablename = { admin: users[0], user: users[1] }

const findById = (id) => {
  table[id] ? Promise.resolve(table[id]) : Promise.reject(null)
}

const findOne = (name) => {
  tablename[name] ? Promise.resolve(tablename[name]) : Promise.reject(null)
}

module.exports = {
  findById,
  findOne,
}
