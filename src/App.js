import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      petName: '',
      age: '',
      gender: '',
      appointmentDate: '',
      ownerName: '',
      errors: {
        petName: '',
        age: '',
        gender: '',
        appointmentDate: '',
        ownerName: '',
      },
      appointments: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { petName, age, gender, appointmentDate, ownerName } = this.state;
    const errors = {
      petName: '',
      age: '',
      gender: '',
      appointmentDate: '',
      ownerName: '',
    };

    let hasErrors = false;

    if (!petName.trim()) {
      errors.petName = 'El nombre de la mascota es requerido';
      hasErrors = true;
    }

    if (!age.trim() || isNaN(age)) {
      errors.age = 'La edad debe ser un número válido';
      hasErrors = true;
    }

    if (!gender.trim()) {
      errors.gender = 'El género es requerido';
      hasErrors = true;
    }

    if (!appointmentDate.trim()) {
      errors.appointmentDate = 'La fecha de la cita es requerida';
      hasErrors = true;
    }

    if (!ownerName.trim()) {
      errors.ownerName = 'El nombre del dueño es requerido';
      hasErrors = true;
    }

    this.setState({ errors });
    return !hasErrors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) {
      const { petName, age, gender, appointmentDate, ownerName, appointments } = this.state;
      const newAppointment = {
        petName,
        age,
        gender,
        appointmentDate,
        ownerName,
      };
      this.setState({
        appointments: [...appointments, newAppointment],
        petName: '',
        age: '',
        gender: '',
        appointmentDate: '',
        ownerName: '',
        errors: {
          petName: '',
          age: '',
          gender: '',
          appointmentDate: '',
          ownerName: '',
        },
      });
    }
  };

  render() {
    const { petName, age, gender, appointmentDate, ownerName, errors, appointments } = this.state;

    return (
      <div className="container">
        <h1>Formulario de Cita de Mascotas</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Nombre Mascota</label>
            <input
              type="text"
              name="petName"
              value={petName}
              onChange={this.handleInputChange}
            />
            <p className="error">{errors.petName}</p>
          </div>
          <div>
            <label>Edad</label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={this.handleInputChange}
            />
            <p className="error">{errors.age}</p>
          </div>
          <div>
            <label>Género</label>
            <input
              type="text"
              name="gender"
              value={gender}
              onChange={this.handleInputChange}
            />
            <p className="error">{errors.gender}</p>
          </div>
          <div>
            <label>Día de la cita</label>
            <input
              type="text"
              name="appointmentDate"
              value={appointmentDate}
              onChange={this.handleInputChange}
            />
            <p className="error">{errors.appointmentDate}</p>
          </div>
          <div>
            <label>Nombre del dueño</label>
            <input
              type="text"
              name="ownerName"
              value={ownerName}
              onChange={this.handleInputChange}
            />
            <p className="error">{errors.ownerName}</p>
          </div>
          <button type="submit">Agendar Cita</button>
        </form>
        <div className="appointments-list">
          <h2>Citas Agendadas</h2>
          {appointments.map((appointment, index) => (
            <div key={index} className="appointment-card">
              <p><strong>Mascota:</strong> {appointment.petName}</p>
              <p><strong>Edad:</strong> {appointment.age}</p>
              <p><strong>Género:</strong> {appointment.gender}</p>
              <p><strong>Fecha de Cita:</strong> {appointment.appointmentDate}</p>
              <p><strong>Dueño:</strong> {appointment.ownerName}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
