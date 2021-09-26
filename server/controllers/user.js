const { request, response } = require("express");
const User = require('../models/User');

const usersLockeds = async (req = request, res = response) => {

    const [total, users] = await Promise.all([
        User.countDocuments({ state: false }),
        User.find({ state: false })
    ])

    return res.json({
        ok: true,
        total,
        users
    });
}

const updateLockedUser = async (req = request, res = response) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, { state: true, ipLocked: '', dateLocked: '' })
    res.json({
        ok: true,
        msg: 'Usuario Desbloqueado'
    })
}


module.exports = {
    usersLockeds,
    updateLockedUser
}