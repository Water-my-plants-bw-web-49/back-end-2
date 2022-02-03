const db = require('../../data/dbConfig')

function find() {
    return db('users').select('user_id', 'username')
}

function findBy(filter) {
    return db('users').where(filter)
}

async function add(user) {
    const [ user_id ] = await db('users').insert(user)
    return findById(user_id)
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