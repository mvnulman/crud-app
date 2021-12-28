import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Register = () => {
  const history = useHistory();



  // initial input state and function to update it
  const [formValues, setFormValues] = useState({
    image: "",
    description: "",
    brand: "",
    active: true,
    date: "",
  });


  //capture the input values and assimilate them to the state
  const handleChangeInputs = (e) => {
    const { name, value } = e.target;
    console.log({
      typeInput: e.target.type,
      checked: e.target.checked
    });
    setFormValues((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };


  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setFormValues((preval) => {
      return {
        ...preval,
        [name]: checked,
      };
    });
  }

  // submit the form
  const addinpdata = async (e) => {
    e.preventDefault();

    const { image, description, brand, active, date } = formValues;

    // send the data to the server to be saved in the database with POST method
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image,
        description,
        brand,
        active,
        date,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert("Erro! Alguma coisa deu errado!");
      // console.log("Por favor, preencher todos os campos!");
    } else {
      alert("Produto cadastrado com sucesso!");
      history.push("/");
      console.log("Produto cadastrado com sucesso!");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">
        <ArrowCircleLeftIcon style={{ fontSize: "50px" }} />
      </NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Imagem
            </label>
            <input
              type="text"
              onChange={handleChangeInputs}
              value={formValues.image}
              name="image"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Descrição
            </label>
            <input
              type="text"
              onChange={handleChangeInputs}
              name="description"
              value={formValues.description}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Marca
            </label>
            <input
              type="text"
              onChange={handleChangeInputs}
              name="brand"
              value={formValues.brand}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input onChange={handleChangeCheckbox} className="form-check-input" name="active" type="checkbox" checked={formValues.active} id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Ativo
            </label>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Data Inativação
            </label>
            <input
              readOnly={formValues.active}
              type="text"
              onChange={handleChangeInputs}
              name="date"
              value={formValues.date}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            onClick={addinpdata}
            className="btn btn-primary"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
