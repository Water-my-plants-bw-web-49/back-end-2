const db = require('../../data/dbConfig')

function find() {
    return db('users').select('user_id', 'username')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(newUser) {
    const [user] = await db('users').insert(newUser, ['user_id', 'username'])
    return user
}

function findById(user_id) {
    return db('users')
        .where({ user_id }).first()
}

module.exports = {
    find,
    findBy,
    add,
    findById,
}