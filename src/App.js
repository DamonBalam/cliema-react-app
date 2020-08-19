import React, { Fragment, useState, useEffect } from 'react';
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {
    const [busqueda, setBusqueda] = useState({
        ciudad: '',
        pais: '',
    });

    const [consultar, setConsultar] = useState(false);
    const [resultado, setResultado] = useState({});
    const [error, setError] = useState(false);

    const { ciudad, pais } = busqueda;

    useEffect(() => {
        const consultarAPI = async () => {
            if (consultar) {
                const appId = '7e59178ea0d50e102365cac8085a6b18';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

                const respuesta = await fetch(url);

                const res = await respuesta.json();

                setResultado(res);
                setConsultar(false);

                if (resultado.cod === '404') {
                    setError(true);
                } else {
                    setError(false);
                }
            }
        };

        consultarAPI();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [consultar]);

    let componente;
    if (error) {
        componente = <Error mensaje='No hay resultados' />;
    } else {
        componente = <Clima resultado={resultado} />;
    }

    return (
        <Fragment>
            <Header titulo='Clima React App' />
            <div className='contenedor-form'>
                <div className='container'>
                    <div className='row'>
                        <div className='col m6 s12'>
                            <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultar={setConsultar} />
                        </div>
                        <div className='col m6 s12'>{componente}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
