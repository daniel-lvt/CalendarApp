const { response } = require('express');
const Event = require('../models/Event');

const getEventos = async (req, res = response) => {

    const events = await Event.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        events
    })
}

const crearEvento = async (req, res = response) => {

    try {
    
        const evento = new Event(req.body);

        evento.user = req.uid;
        const eventoDB = await evento.save()

        res.status(201).json({
            ok: true,
            evento: eventoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

}

const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Event.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "evento no existente por el id"
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Event.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {

        const evento = await Event.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "evento no existente por el id"
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene privilegios para eliminar este evento'
            })
        }

        const eventoActualizado = await Event.findByIdAndRemove(eventoId);

        res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}