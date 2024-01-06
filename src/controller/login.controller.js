const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarToken');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
async function login(req = request, res = response) {
    const { user, password } = req.body;
    try {
        const usuario = await User.findOne({ user }).populate('rol', 'rol').populate('state', 'name');
        if (!usuario) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            })
        }

        if (usuario.state.name == 'inactivo') {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos o Usuario inactivo"
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Correo o contraseña incorrectos"
            })
        }

        const token = await generarJWT(usuario.id);
        res.cookie('xToken', token);
        res.set("Access-Control-Allow-Credentials", "true");
        res.status(200).json({
            msg: "usuarios logueado",
            token,
            usuario: usuario.user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Hable con el administrador" })
    }
}

async function verificarToken(req = request, res = response) {

    try {
        const { jwToken } = req.body;
        if (!jwToken) return res.status(401).json({ msg: "No Autorizado, no se ingreso un Token!!" });
        jwt.verify(jwToken, process.env.SECRETORPRIVATEKEY, async (err, user) => {

            if (err) return res.status(401).json({ msg: "No Autorizado!!" });
            const usuario_encontrado = await buscarId(user.uid);
            if (!usuario_encontrado) return res.status(401).json({ msg: "No Autorizado, usuario no encontrado!!" });

            return res.json({
                id: usuario_encontrado._id,
                nombre: usuario_encontrado.nombre,
                email: usuario_encontrado.email,
                rol: usuario_encontrado.rol,
                estado: usuario_encontrado.estado
            })
        })
    } catch (error) {
        return res.status(404).json({ msg: "ERROR!!", e: error })
    }


}
module.exports = {
    login,
    verificarToken,
}