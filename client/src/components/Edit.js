import { useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Edit = () => {
  // const [userData, setUserData] = useState([]);
  // console.log(userData);

  const history = useHistory("");

  const [inputVal, setInputVal] = useState({
    image: "",
    description: "",
    brand: "",
    active: true,
    date: "",
  });

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setInputVal((preval) => {
      return {
        ...preval,
        [name]: checked,
      };
    });
  }

  const setData = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getData = async () => {
    const res = await fetch(`/getproduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("Por favor, preencher todos os campos!");
    } else {
      setInputVal(data);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const { image, description, brand, active, date } = inputVal;

    const res2 = await fetch(`/updateproduct/${id}`, {
      method: "PATCH",
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

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert("Por favor, preencher todos os campos!");
    } else {
      alert("Informações atualizadas com sucesso!");
      history.push("/");
    }
  };


  return (
    <div className="container">
      <NavLink to="/"><ArrowCircleLeftIcon style={{ fontSize: "50px"}}/></NavLink>
      <form className="mt-5">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Imagem
            </label>
            <input
              type="email"
              onChange={setData}
              value={inputVal.image}
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
              onChange={setData}
              name="description"
              value={inputVal.description}
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
              onChange={setData}
              name="brand"
              value={inputVal.brand}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          {/* <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Ativo
            </label>
            <input
              type="text"
              onChange={setData}
              name="active"
              value={inputVal.active}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div> */}

          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <input onChange={handleChangeCheckbox} className="form-check-input" name="active" type="checkbox" checked={inputVal.active} id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Ativo
            </label>
          </div>


          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Data inativado
            </label>
            <input
              readOnly={inputVal.active}
              type="text"
              onChange={setData}
              name="date"
              value={inputVal.date}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            onClick={updateProduct}
            className="btn btn-primary"
          >
            Atualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
