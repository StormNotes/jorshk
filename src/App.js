import React, {
  Component
} from 'react';
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
const data = [

];

class App extends React.Component {
  
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      trabajador: "",
      horario_entrada: "",
      horario_salida: "",
    },
  };
  
  componentDidMount() {
    axios.get("http://localhost:3001/getEmpleados").then((response) => {
      console.log(response);
      this.state.data = response.data
    })
  }

  agregarTrabajador = () =>{
    axios.post('http://localhost:3001/create',{
      id: this.state.data.length,
      name: this.state.form.trabajador,
      entrada: this.state.form.horario_entrada,
      salida: this.state.form.horario_salida,
    }).then(()=>{
      console.log('se enviaron los datos a la BD')
    })
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
 
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].trabajador = dato.trabajador;
        arreglo[contador].horario_entrada = dato.horario_entrada;
        arreglo[contador].horario_salida = dato.horario_salida;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = () => {
    var valorNuevo = {
      ...this.state.form
    };
    valorNuevo.id = this.state.data.length + 1;
    var lista = this.state.data;
    if (valorNuevo.trabajador === '') {
      this.setState({
        modalInsertar: false
      });
      alert('El campo trabajador debe no debe estar vacio.')
      this.state.form.trabajador = '';
    } else {
      lista.unshift(valorNuevo);
      this.agregarTrabajador();
      this.state.form.trabajador = '';
      this.setState({
        modalInsertar: false,
        data: lista
      });
    }
  }

  handleChange = (e) => {
 
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Empleado</th>
                <th>Horario de entrada</th>
                <th>Horario de salida</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.trabajador}</td>
                  <td>{dato.horario_entrada}</td>
                  <td>{dato.horario_salida}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                trabajador: 
              </label>
              <input
                className="form-control"
                name="trabajador"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.trabajador}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                horario entrada: 
              </label>
              <input
                className="form-control"
                name="horario_entrada"
                type="time"
                onChange={this.handleChange}
                value={this.state.form.horario_entrada}
              />
            </FormGroup>
            <FormGroup>
              <label>
                horario salida: 
              </label>
              <input
                className="form-control"
                name="horario_salida"
                type="time"
                onChange={this.handleChange}
                value={this.state.form.horario_salida}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar trabajador</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                trabajador: 
              </label>
              <input
                className="form-control"
                name="trabajador"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Horario entrada: 
              </label>
              <input
                className="form-control"
                name="horario_entrada"
                type="time"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Horario salida: 
              </label>
              <input
                className="form-control"
                name="horario_salida"
                type="time"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;