import React, { Component } from "react";
import {Addcontact,updated,RemoveItemFromList} from "./Componenet/actions/ContactInfoAction";
import {Col,Button, Container,Row,Form,Modal,Table,} from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import { connect } from "react-redux";
import uuid from "uuid";


const validnameregex = /^[a-zA-Z ]*$/;
const validageregex=/^[0-9]+$/;
const validphonenumberregex = /^[0]?[789]\d{9}$/;
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      phonenumber: "",
      age:"",
      address:"",
      gender:"",
      editid: "",
      errors: { name: "", date: "", phonenumber: "", age: "",address:"",gender:""},
      Addcontactmodal: false,
      editcontactmodal: false,
      Deletetaskmodal: false,
      Deletetaskid: null,
    };

    this.submithandler = this.submithandler.bind(this);
    this.Edithandler = this.Edithandler.bind(this);
    this.AddInfoHandler = this.AddInfoHandler.bind(this);
    this.DeleteModalhandler = this.DeleteModalhandler.bind(this);
    this.DeleteTaskhandler = this.DeleteTaskhandler.bind(this);
  }

  AddInfoHandler = () => {
    this.setState({
      Addcontactmodal: !this.state.Addcontactmodal,
    });
  };

  modalClosehandle = (event) => {
    this.setState({
      Addcontactmodal: false,
      editcontactmodal: false,
      Deletetaskmodal:false
    });
  };

  // for add Contact handler//
  changehandler = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch(name) {
        case 'name': 
        errors.name = validnameregex.test(value)? '' : 'Only Accept Characters !';
        break;
        case 'phonenumber':
        errors.phonenumber = validphonenumberregex.test(value)? '' : 'Phone Number is not valid!';
        break;
        case 'age': 
        errors.age =validageregex.test(value) ? '' : 'Please only enter numeric characters only for your Age! (Allowed input:0-9)';
        break;
        case 'gender': 
        errors.gender = value.length < 0 ? 'Enter Gender' : '';
        break;
        case 'address': 
        errors.address = value.length < 0 ? 'Enter Address Name' : '';
        break;
        default:
        break;
    }
    
    this.setState({
      errors,[name]:value,
    });

  };


  // for submit Student Info//
  submithandler = (event) => {
    event.preventDefault();
      this.setState({
        Addcontactmodal:!this.state.Addcontactmodal,
      });

    if(validateForm(this.state.errors)) {
            if (this.state !== "") {
              var data = {};
              data.name = this.state.name; 
              data.date = this.state.date; 
              data.age = this.state.age;
              data.gender = this.state.gender;
              data.address = this.state.address;
              data.phonenumber = this.state.phonenumber;
              data.id = uuid.v4();
              this.props.dispatch(Addcontact(data));
              this.setState({ name: "",date: "",phonenumber: "",age:"",gender:"",address:""});
             }
          } 
     else {
          alert("Please Fill All Information");
            this.setState({
                Addcontactmodal:true
            })
       }
  };

  Edithandler = (event) => {
    var edit_id = event.target.id;
    const data = this.props.Listdata.find((item) => item.id === edit_id);
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
      editid: edit_id,
      name: data.name, 
      date: data.date,
      phonenumber: data.phonenumber,
      age: data.age,
      address: data.address,
      gender: data.gender
    });
  };

  updated_submithandler = (event) => {
    event.preventDefault();
    this.setState({
      editcontactmodal: !this.state.editcontactmodal,
    });
    if (this.state!== "") {
      var newdata = {};
      newdata.id = this.state.editid; 
      newdata.name = this.state.name;
      newdata.date = this.state.date; 
      newdata.age = this.state.age;
      newdata.address = this.state.address;
      newdata.gender = this.state.gender;
      newdata.phonenumber = this.state.phonenumber;
      this.props.dispatch(updated(newdata));
    }
  };
  

  DeleteModalhandler = (event) => {
    this.setState({
      Deletetaskmodal: true,
      Deletetaskid: event.target.id,
    });
  };

  DeleteTaskhandler = () => {
    this.props.dispatch(RemoveItemFromList(this.state.Deletetaskid));
    this.setState({
      Deletetaskmodal: false,
    });
  };


  render() {
    const {errors} = this.state;
    var AvailableData = this.props.Listdata;
    if (AvailableData !== null) {
      var AllTaskList = AvailableData.map((item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.gender}</td>
            <td>{item.age}</td>
            <td>{item.address}</td>
            <td>{item.phonenumber}</td>
            <td><Button variant="primary mr-2 "> <i className="fa fa-pencil" aria-hidden="true" id={item.id} onClick={this.Edithandler} ></i></Button> <Button variant="danger"> <i className="fa fa-trash" aria-hidden="true" id={item.id} onClick={this.DeleteModalhandler} ></i></Button> </td>
        </tr>
      ));
    }
    return (
      <div>
        <Container fluid={true}>
            <Row className="startrow">
              <Col sm={12} xs={12}  className="view" className="text-right">
                <Button variant="success" className="themesflat-button "  onClick={this.AddInfoHandler}><i className="fa fa-plus" aria-hidden="true"></i> Add Student </Button>
              </Col>
            </Row>
            <Row>
             <Col xs={12} sm={12}>
                <div className="TaskList">
                        <Table bordered responsive>
                          <thead>
                            <tr className="thead">
                              <th>Full Name</th>
                              <th>DOB</th>
                              <th>Gender</th>
                              <th>Age</th>
                              <th>Address</th>
                              <th>Phone Number</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                           <tbody style={{textAlign:'center'}}>{AllTaskList}</tbody>
                       </Table>
               </div>

      {/*  FOR CERATE Student */}
          <Modal show={this.state.Addcontactmodal} onHide={this.modalClosehandle}>
              <Modal.Header closeButton  >
                  <Modal.Title>Create Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.submithandler}>
                    <Row>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="name"  required />
                             {errors.name.length > 0 && <span className="text-danger">{errors.name}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> DOB</Form.Label>
                          <Form.Control type="date" onChange={this.changehandler} name="date" required />
                             {errors.date.length > 0 && <span className="text-danger">{errors.date}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12} >
                        <Form.Group >
                          <Form.Label>Gender</Form.Label>
                              <Form.Control
                                as="select"
                                onChange={this.changehandler}
                                name="gender">
                                <option >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="transgender">Transgender</option>
                              </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Age </Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="age" required />
                             {errors.age.length > 0 && <span className="text-danger">{errors.age}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Adress </Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="address" required />
                             {errors.address.length > 0 && <span className="text-danger">{errors.address}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Phone Number</Form.Label>
                          <Form.Control type="text" onChange={this.changehandler} name="phonenumber" required />
                             {errors.phonenumber.length > 0 && <span className="text-danger">{errors.phonenumber}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button variant="success" type="submit"  className="themesflat-button blue mr-2">  Save Changes </Button>
                          <Button variant="secondary" type="submit"  className="themesflat-button blue "  onClick={this.modalClosehandle}> Cancel </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>

          {/*  FOR EDIT Student */}
            <Modal show={this.state.editcontactmodal}  onHide={this.modalClosehandle}>
              <Modal.Header closeButton  >
                <Modal.Title>Edit Student </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={this.updated_submithandler}>
                    <Row>
                      <Col sm={12}>
                        <Form.Control type="hidden"name="id" value={this.state.edit_id}/>
                        <Form.Group >
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control type="text"  onChange={this.changehandler} name="name"  value={this.state.name}  required />
                                  {errors.name.length > 0 && <span className="text-danger">{errors.name}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> DOB</Form.Label>
                          <Form.Control type="date"  onChange={this.changehandler}  name="date"  value={this.state.date}  required />
                                {errors.date.length > 0 && <span className="text-danger">{errors.date}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12} >
                        <Form.Group >
                          <Form.Label>Gender</Form.Label>
                              <Form.Control
                                as="select"
                                onChange={this.changehandler}
                                name="gender"  value={this.state.gender}>
                                <option >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="transgender">Transgender</option>
                              </Form.Control>
                          </Form.Group>
                        </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Age</Form.Label>
                          <Form.Control  type="text" onChange={this.changehandler}  name="age"  value={this.state.age}  required />
                            {errors.age.length > 0 && <span className="text-danger">{errors.age}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Address</Form.Label>
                          <Form.Control  type="text" onChange={this.changehandler}  name="address"  value={this.state.address}  required />
                            {errors.address.length > 0 && <span className="text-danger">{errors.address}</span>}
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group >
                          <Form.Label> Phone Number</Form.Label>
                          <Form.Control  type="text" onChange={this.changehandler}  name="phonenumber"  value={this.state.phonenumber}  required />
                          {errors.phonenumber.length > 0 && <span className="text-danger">{errors.phonenumber}</span>} 
                        </Form.Group>
                      </Col>
                      <Col sm={12}>
                        <Form.Group className="text-right">
                          <Button variant="success" type="submit"  className="themesflat-button blue mr-2">  Save Changes </Button>
                          <Button variant="secondary" type="submit"  className="themesflat-button blue "  onClick={this.modalClosehandle}> Cancel </Button>
                        </Form.Group>
                      </Col>
                    </Row>
                </Form>
              </Modal.Body>
            </Modal>

           {/*  FOR DELETE Student */}
            <Modal show={this.state.Deletetaskmodal} onHide={this.modalClosehandle}>
              <Modal.Header onClick={this.modalClosehandle}
                closeButton 
              ></Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={12}>
                    <div className="DeleteModal">
                      <h4 className="mb-5"> Do you want to Delete this Record? </h4>
                      <Button
                        variant="secondary"
                        type="submit"
                        className="themesflat-button blue mr-2"
                        onClick={this.modalClosehandle}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="success"
                        type="submit"
                        variant="danger"
                        id={this.state.Deletetaskid}
                        onClick={this.DeleteTaskhandler}
                      >
                        Delete
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>

          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Listdata: state.ContactInfo,
  };
};
export default connect(mapStateToProps)(App);
