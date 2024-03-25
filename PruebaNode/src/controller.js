
const axios = require('axios');

const { DateTime } = require('luxon');

const daysTrans = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

const transformTitle = (title) => {
    return title.toUpperCase();
};

const transformDate = (date) => {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy');
}

const transformTime = (time) => {
    return DateTime.fromISO(time).toFormat('HH:mm');
}

const transformPrice = (price) => {
    return parseInt(price.toFixed(0));
}

const transformDays = (days) => {
    return days.split('').map((day, index) => daysTrans[parseInt(day)]).join('-');
}


const infoTransformer = async() => {

    const response = await axios.get('https://brokertest.1777.com.gt/DMZCAD/api/Icad/GetMenu?empresa=CAMPGUA&id=POLLO');

    const data = response.data;

    const { mensaje, ...rest } = data;

    let res = {
        ...rest
    }

    const { productos, ...restMsg } = mensaje[0];

    let resMsg = {
        ...restMsg,
        productos: []
    }

    for (const product of productos) {
        const {titulo, validoDel, validoAl, horaDesde, horaHasta, precio, diasDisponible} = product;

        const newTitle = transformTitle(titulo);
        const newValidoDel = transformDate(validoDel);
        const newValidoAl = transformDate(validoAl);
        const newHoraDesde = transformTime(horaDesde);
        const newHoraHasta = transformTime(horaHasta);
        const newPrecio = transformPrice(precio);
        const newDiasDisponible = transformDays(diasDisponible);

        const newProduct = {
            ...product,
            titulo: newTitle,
            validoDel: newValidoDel,
            validoAl: newValidoAl,
            horaDesde: newHoraDesde,
            horaHasta: newHoraHasta,
            precio: newPrecio,
            diasDisponible: newDiasDisponible
        }

        resMsg.productos.push(newProduct);
        
    }

    res.mensaje = [resMsg];

    return res;
};

module.exports = {
    infoTransformer
};