import {useEffect, useState} from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useParams, NavLink, useHistory } from "react-router-dom";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const Details = () => {

  const [userData, setUserData] = useState([]);
  console.log(userData);

  const {id} = useParams("");
  console.log(id)

  const history = useHistory();


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
      setUserData(data);
      console.log("receiving data!");
    }
  };

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const deleteProduct = async (id) => {
    const res2 = await fetch(`/deleteproduct/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const deleteData = await res2.json();
    console.log(deleteData);

    if(res2.status === 422 || !deleteData){
      console.log("Erro!");
      
    }else {
      console.log("Produto deletado com sucesso!");
      history.push("/");	
    }
  } 

  return (
    <div className="container mt-3">
      <NavLink to="/"><ArrowCircleLeftIcon style={{ fontSize: "50px"}}/></NavLink>
      <h1 style={{ fontWeight: "bold" }}>Descrição do Produto</h1>
      <Card sx={{ maxWidth: 675 }}>
        <CardContent>
          <div className="add_btn">
            <NavLink to={`/edit/${userData._id}`}><button className="btn btn-primary mx-2">
              <EditIcon />
            </button></NavLink>
            <button className="btn btn-danger" onClick={()=> deleteProduct(userData._id)}>
              <DeleteIcon />
            </button>
          </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src="https://imagens.portobello.com.br/unsafe/240x240/https://www.portobello.com.br/data/products/zoom/37534.jpg?ts=1611794604"
                style={{ width: "200px" }}
                alt="thumbnaill"
              />
              <h3 className="mt-3">
                Descrição: <span style={{ fontWeight: "400" }}>{userData.description}</span>
              </h3>
              <h3 className="mt-3">
                Marca: <span style={{ fontWeight: "400" }}>{userData.brand}</span>
              </h3>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Details;
