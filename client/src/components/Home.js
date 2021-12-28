import React, { useState, useEffect } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { NavLink } from "react-router-dom";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';


const Home = () => {
  const [userData, setUserData] = useState([]);
  console.log(userData);

  const getdata = async (e) => {
    const res = await fetch("/getdata", {
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
      setUserData(data);
      // console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const deleteProduct = async (id) => {
    const res2 = await fetch(`/deleteproduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if (res2.status === 422 || !deleteData) {
      console.log("Erro!");
    } else {
      console.log("Produto deletado com sucesso!");
      getdata();
    }
  };

  return (
    <>

      <div className="mt-5">
        <div className="container">
          <div className="add_btn mt-2 mb-3">
            <NavLink to="/register" className="btn btn-primary">
              Adicionar Produto
            </NavLink>
          </div>
          <table className="table table-hover ">
            <thead>
              <tr className="table-dark ">
                <th scope="col">ID</th>
                <th scope="col">Imagem</th>
                <th scope="col">Descrição</th>
                <th scope="col">Marca</th>
                <th scope="col">Ativo</th>
                <th scope="col">Data Inativo</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((element, id) => {
                return (
                  <React.Fragment key={id}>
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>
                        <img 
                          src="https://imagens.portobello.com.br/unsafe/240x240/https://www.portobello.com.br/data/products/zoom/37534.jpg?ts=1611794604"
                          alt="previa-foto"
                          width="70px"
                          height="70px"
                          border-radius="50x"
                        />
                      </td>
                      <td>{element.description}</td>
                      <td>{element.brand}</td>
                      <td>{element.active ? <DoneIcon style={{fill: "green"}}/> : <CloseIcon style={{fill: "red"}}/>}</td>
                      <td>{element.date}</td>
                      <td className="mb-5">
                        <NavLink to={`view/${element._id}`}>
                          {" "}
                          <button className="btn btn-secondary">
                            <PreviewIcon />
                          </button>
                        </NavLink>
                        <NavLink to={`edit/${element._id}`}>
                          <button className="btn btn-primary ">
                            <EditIcon />
                          </button>
                        </NavLink>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduct(element._id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
