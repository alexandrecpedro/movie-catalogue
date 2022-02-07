import './styles.css';

import { useCallback, useContext, useEffect, useState } from 'react';

import { Button, Col, Container, Form, Modal, Row, Tab, Tabs } from 'react-bootstrap';
import CustomCard from '../../components/CustomCard';
import api from '../../services/api';
import { FavoritesContext } from '../../providers/favorites';

export default function Home() {

    const { favorites } = useContext(FavoritesContext);
    const [movies, setMovies] = useState([]);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [idControl, setIdControl] = useState('');
    const [imageField, setImageField] = useState('');
    const [titleField, setTitleField] = useState('');
    const [descriptionField, setDescriptionField] = useState('');
    const [modalEdit, setModalEdit] = useState(false);

    // READ
    const getFilms = useCallback(() => {
        api.get('/filme')
            .then(response => {
                setMovies(response.data);
            })
            .catch(error => {

            });
    }, []);

    function handleClose() {
        setModalVisibility(!modalVisibility);
    }

    useEffect(() => {
        getFilms()
    }, [getFilms])

    const requestFinish = () => {
        getFilms();
        handleClose();
    }

    const setDataModal = (value) => {
        setIdControl(value.id);
        setImageField(value.urlImg);
        setTitleField(value.titulo);
        setDescriptionField(value.descricao);
    }

    const saveMovie = () => {
        let film = {
            urlImg: imageField,
            titulo: titleField,
            descricao: descriptionField
        }

        if (!modalEdit) {
            // CREATE
            api.post('/filme', film)
                .then(response => requestFinish())
                .catch(error => { })
        } else {
            film.id = idControl;
            // UPDATE
            api.put('/filme', film)
                .then(response => requestFinish())
                .catch(error => { })
        }

    }

    // DELETE
    const deleteMovie = () => {
        api.delete(`/filme/${idControl}`)
            .then(response => requestFinish())
            .catch(error => { })
    }

    return <>

        <Button variant="success">
            {/* fab = float-action-button */}
            <span className="material-icons-outlined fab" onClick={() => {
                handleClose();
                setModalEdit(false);
            }}>
                add_circle
            </span>
        </Button>

        {/* Modal should be inserted before / after the components */}
        <Modal show={modalVisibility} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalEdit ? 'Editar' : 'Cadastrar'} Filme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formUrl">
                        <Form.Label>Imagem</Form.Label>
                        <Form.Control type="text" value={imageField} placeholder="Adicione uma URL" onChange={change => setImageField(change.target.value)} />
                        <Form.Text className="text-muted">
                            Essa imagem será exibida no Card do filme
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control type="text" value={titleField} placeholder="Título do Filme" onChange={change => setTitleField(change.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control as="textarea" value={descriptionField} rows={3} placeholder="Breve descrição sobre o Filme" onChange={change => setDescriptionField(change.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                {
                    modalEdit &&
                    <Button variant="danger" onClick={() => deleteMovie(idControl)} >
                        Deletar
                    </Button>
                }
                <Button variant="success" onClick={() => saveMovie()}>
                    Salvar
                </Button>
            </Modal.Footer>
        </Modal>

        <header className='main-header'>
            <img src="http://www.digitalhouse.com/logo-DH.png" alt="Logo da Digital House" />
        </header>
        <main className='main-content'>
            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3 tabs">
                <Tab eventKey="all" title="Todos">
                    <Container>
                        <Row>
                            {/* JavaScript code */}
                            {movies.map(movie => {
                                return <Col lg="4" key={movie.id}>
                                    <CustomCard
                                        movie={movie}
                                        favorited={favorites.find(item => item.id === movie.id)}
                                        openDetails={(movieReturned) => {
                                            setDataModal(movieReturned);
                                            handleClose();
                                            setModalEdit(true);
                                        }}
                                    />
                                </Col>
                            })}
                        </Row>
                    </Container>
                </Tab>
                <Tab eventKey="favorites" title={`Favoritos ${favorites.length}`}>
                    <Container>
                        <Row>

                            {/* JavaScript code */}
                            {favorites.map(movie => {
                                return <Col lg="4" key={movie.id}>
                                    <CustomCard
                                        movie={movie}
                                        favorited={true}
                                        openDetails={(movieReturned) => {
                                            setDataModal(movieReturned);
                                            handleClose();
                                            setModalEdit(true);
                                        }}
                                    />
                                </Col>
                            })}
                        </Row>
                    </Container>
                </Tab>
            </Tabs>
        </main>
    </>
}