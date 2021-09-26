const { request, response } = require("express")

const usersLockeds = async (req = request, res = response) => {

    return res.json({
        ok: true,
        msg: 'information'
    })
}


module.exports = {
    usersLockeds
}