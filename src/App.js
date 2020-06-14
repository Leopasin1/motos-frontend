import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ marca, setMarca ] = useState('');
    const [ modelo, setModelo ] = useState('');
    const [ anofabri, setAnofabri ] = useState('');
    const [ id, setId ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
    
  
    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaMotos(){
         api.get('/motos').then((response) => {
            const itens = response.data;
            setLista(itens);
              setMarca('');
                setModelo('');
                setAnofabri('');
                setId('');
        });
    }

    useEffect(() => {
        listaMotos();
    }, []);
    
    function addMoto(){
        const marc = marca;
        const model = modelo;
        const year = anofabri;

        api.post('/motos', {marca:marc, modelo:model, anofabri:year}).then((response) => {
            setMarca('');
            setModelo('');
            setAnofabri('');
            setOpen(false);
            listaMotos();
        });
    }

    function deleteMoto(id){
        api.delete(`/motos/${id}`).then((response) => {
            listaMotos();
        });
    }
  

    function openEditar(id,marca,modelo,anofabri){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setMarca(marca);
        setModelo(modelo);
        setAnofabri(anofabri);
        setId(id);
    }

    function editarmoto(){
        api.put(`/motos/${id}`,{marca:marca,modelo:modelo,anofabri:anofabri}).then((response) => {
            setOpen(false);
            setMarca('');
            setModelo('');
            setAnofabri('');
            setId('');
            listaMotos();
        });
    }
    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>Marca</TableCell>
                        <TableCell>Modelo</TableCell>
                        <TableCell>Ano Fabricação</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.marca}</TableCell>
                        <TableCell>{itens.modelo}</TableCell>
                        <TableCell>{itens.anofabri}</TableCell>

                        <TableCell>
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.marca,itens.modelo,itens.anofabri)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteMoto(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Moto Vendida</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Moto</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    DIgite os dados da Moto
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="marca"
                    label="Marca Moto"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={marca}
                    onChange={e => setMarca(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="modelo"
                    label="Modelo Moto"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={modelo}
                    onChange={e => setModelo(e.target.value)}

                />
                <TextField
                    margin="dense"
                    id="anofabri"
                    label="Ano Fabricação"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={anofabri}
                    onChange={e => setAnofabri(e.target.value)}

                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editarmoto : addMoto }>
                    Salvar Moto
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;