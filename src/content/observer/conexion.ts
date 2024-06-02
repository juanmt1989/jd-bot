import * as distpacher from './../distpacher/contentservice'
import {Conexion}  from '../../models/eventaction'

export async function EntabishConexion() {

    distpacher.Sender(Conexion.Start)
    
    setInterval( () => {

    }, 4000);
};