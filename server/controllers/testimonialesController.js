const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales = async (req, res) => {
    const testimoniales = await Testimonial.findAll()
    res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
    });
}

exports.agregarTestimonial = async (req, res) => {
    // validar que los campos esten completos
    let {nombre, correo, mensaje} = req.body;

    let errores = [];
    if(!nombre) {
        errores.push({'mensaje': 'Agrega tu Nombre'})
    }
    if(!correo) {
        errores.push({'mensaje': 'Agrega tu Correo'})
    }
    if(!mensaje) {
        errores.push({'mensaje': 'Agrega tu Mensaje'})
    }

    // revisar por errores
    if(errores.length > 0) {
        // muestra la vista con errores
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            errores,
            nombre,
            correo,
            mensaje,
            pagina: 'Testimoniales',
            testimoniales
        })
    } else {
        // almacenar en la BD
        /*
        Testimonial.create({
            nombre,
            correo,
            mensaje
        })
        .then(testimonial => res.redirect('/testimoniales'))
        .catch(error => console.log(error))
        */

        const testimonial = await Testimonial.create({ nombre, correo, mensaje })
        //console.log(testimonial)
        res.redirect('/testimoniales')
    }
}