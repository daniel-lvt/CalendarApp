const { request, response } = require("express");
const { generarJWT } = require("../helpers");
const fs = require('fs');


const changeTimeSesion = async (req = request, res = response) => {

    const { expireIn } = req.body;


    const { uid, name } = req;
    const data = { uid, name };
    const token = await generarJWT(data, expireIn);
    res.json({
        ok: true,
        msg: 'El tiempo de sesion ha sido actualizado',
        uid,
        name,
        token,
    });

}


const getDataLogs = async (req = request, res = response) => {

    try {

        const data = fs.readFileSync(__dirname + '/../log/access.log', 'utf-8', (err, data) => {
            if (err) {
                console.log('error: ', err);
            }
        })

        const infoOut = data.split('\n');
        const separando = infoOut.map(element => {
            const data = element.split(',');
            if (data[0]) {
                return {
                    user: data[0].split('[')[1].split(']')[0],
                    date: data[1].split('[')[1].split(']')[0],
                    method: data[2].split('[')[1].split(']')[0],
                    url: data[3].split('[')[1].split(']')[0],
                    status: data[4].split('[')[1].split(']')[0],
                    time: data[5].split('[')[1].split(']')[0],
                    ip: data[6].split('[')[1].split(']')[0],
                }
            } else {
                return {
                }
            }
        });

        res.json({
            ok: true,
            msg: 'Informacion Log',
            data: separando.reverse()
        })

    } catch (error) {
        console.log(error);
        res.json()
    }

}


module.exports = {
    changeTimeSesion,
    getDataLogs
}