import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom'; //troca página sem reload(Single Page Aplication) 
import { api, ibgeApi } from '../../services/api'

import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import Dropzone from '../../Components/Dropzone';

interface Items { //ao criar o estado de um array ou objeto é preciso declarar o tipo das props
    id: number,
    title: string,
    image_url: string
}

interface UfIbge {
    sigla: string
}

interface CityIbge {
    nome: string
}


const CreatePoint = () => {
    const [items, setItems] = useState<Items[]>([]); //<Items[]> para relacionar tipagem acima
    const [uf, setUf] = useState<string[]>([]);
    const [city, setCity] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState<string>('0');
    const [selectedCity, setSelectedCity] = useState<string>('0');
    const [selectedAddress, setselectedAddress] = useState<[number, number]>([0, 0]);
    const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
    const [selectedItem, setSelectedItem] = useState<number[]>([]);
    const [formData, setFormData] = useState({
        name: '', email: '', whatsapp: ''
    });
    const [selectedFile, setSelectedFile] = useState<File>();
    const history = useHistory();

    useEffect(() => { //executa no carregamento da pagina quando não informado o 2° param
        api.get('items').then(res => {
            setItems(res.data);
        })
    }, []);

    useEffect(() => {
        ibgeApi.get<UfIbge[]>('').then(res => {
            const ufIbge = res.data.map(e => e.sigla);
            setUf(ufIbge);
        })
    }, []);

    useEffect(() => {
        ibgeApi.get<CityIbge[]>(`${selectedUf}/municipios`).then(res => {
            const cityIbge = res.data.map(e => e.nome);
            setCity(cityIbge);
        })
    }, [selectedUf]); //executa a função no 1° param sempre que o estado do 2° param é alterado. 

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
        })
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData(
            { ...formData, [id]: value }// ...formData copia o objeto anterior para atualizar apenas a prop editada
        );
    }

    const handleSelectedUf = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedUf(event.target.value)
    }

    const handleSelectedCity = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCity(event.target.value)
    }

    const handleMapClick = (event: LeafletMouseEvent) => {
        setselectedAddress(
            [event.latlng.lat, event.latlng.lng]
        )
    }

    const handleItemClick = (id: number) => {
        const alreadyExists = selectedItem.findIndex(e => e === id);
        if (alreadyExists >= 0) {
            const filteredItems = selectedItem.filter(e => e !== id);
            setSelectedItem(filteredItems)
        } else {
            setSelectedItem([...selectedItem, id])
        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();// evita recarregar a página ao enviar o form

        const { name, email, whatsapp } = formData;
        const [latitude, longitude] = selectedAddress;
        const uf = selectedUf;
        const city = selectedCity;
        const items = selectedItem;
        const data = new FormData(); // Multipart form substitui JSON quando necessário enviar arquivos

        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(',')); // array para string separado por ,
        if (selectedFile) data.append('image', selectedFile);

        await api.post('points', data);

        alert('Ponto de coleta criado!');

        history.push('/');
    }

    return (
        <div id="page-create-point">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                    <Link to="/">
                        <FiArrowLeft />
                    Home
                </Link>
                </header>
                <form onSubmit={handleSubmit}>
                    <h1>Cadastro do Ponto de Coleta</h1>
                    <Dropzone onSetFile={setSelectedFile} />
                    <fieldset>
                        <legend>
                            <h2>Dados</h2>
                        </legend>
                        <div className="field">
                            <label htmlFor="name">Nome da Entidade</label>
                            <input type="text" name="name" id="name" onChange={handleInputChange} />
                        </div>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input type="email" name="email" id="email" onChange={handleInputChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="whatsapp">Whatsapp</label>
                                <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereço</h2>
                            <span>Selecione o endereço no mapa</span>
                        </legend>
                        <Map center={userLocation} zoom={10} onclick={handleMapClick}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={selectedAddress} />
                        </Map>
                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado(UF)</label>
                                <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                    <option value="0">Selecione uma UF</option>
                                    {uf.map(e => (<option key={e} value={e}>{e}</option>))}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                    <option value="0">Selecione uma Cidade</option>
                                    {city.map(e => (<option key={e} value={e}>{e}</option>))}
                                </select>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Ítens de Coleta</h2>
                            <span>Selecione um ou mais ítens abaixo </span>
                        </legend>
                        <ul className="items-grid">
                            {items.map(e => ( //() = return
                                <li key={e.id}
                                    onClick={() => handleItemClick(e.id)}
                                    className={selectedItem.includes(e.id) ? 'selected' : ''}> {/* quando func passar param usar =>  */}
                                    <img src={e.image_url} alt={e.title} />
                                    <span>{e.title}</span>
                                </li>
                            ))}
                        </ul>
                    </fieldset>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePoint;