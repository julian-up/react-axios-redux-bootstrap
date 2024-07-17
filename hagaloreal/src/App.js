import { Button, Form, FormGroup } from "react-bootstrap";
import "./App.css";
import iAx from "./configAxios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoreItem, setLeyenda, setSkin } from "./reducers";

function App() {
  // estamos tomando el estado actual de los objetos que tenemos dentro del store
  const usChampion = useSelector((state) => state.holaAPP.champion);
  const usCoreItem = useSelector((state) => state.holaAPP.coreItem);
  const usSkin = useSelector((state) => state.holaAPP.skin);
  // me comunico con el store
  const disp = useDispatch();
  // cambio el estado con use state
  const [ver, setVer] = useState(false);

  const validarForma = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity === false) {
      console.log("error, ingese campeon");
    } else {
      const data = {
        champion: form.elements.champion.value,
        coreitem: form.elements.coreItem.value,
        skin: form.elements.skin.value,
      };
      console.log("data" + JSON.stringify(data));
      // al dispatch le digo que tome como state valor que recibe de data, que es el objeto que recibe de los datos de la funcion asincrona que se encuentra configurada en el axios, como funciona el fetch.
      disp(setLeyenda(data.champion));
      disp(setCoreItem(data.coreitem));
      disp(setSkin(data.skin));

      setCampeon(JSON.stringify(data));
    }

    setVer(true);
  };
  // funcion asincrona
  function async() {
    console.log("comienza funcion async");
    setTimeout(() => {
      for (let x = 0; x < 11; x++) {
        console.log("colombia campeon" + x);
      }
    }, 5000);
    console.log("fin funcion async");
  }

  // function sncrona
  function funsync() {
    console.log("inico funcion sync");
    for (let i = 0; i < 11; i++) {
      console.log("hola" + i);
    }
    console.log("fin funcion sync");
  }

  function prueba() {
    console.log(111);
    // funsync();
    async();
    console.log(222);
  }
  // me quedo esperando ahi, pero continuo con las otars operaciones que dependan de esa promesa
  async function setCampeon(data) {
    try {
      // manejo de promesas
      const rta = await iAx.post("/setCampeon", data);
      console.log("data:" + JSON.stringify(rta));
      console.log("estado:" + rta.status);
      console.log("ch:" + rta.config.headers);
    } catch (error) {
      console.error();
    }
  }

  const verStore = () => {
    console.log("Estado en el Store");
    console.log("Campeon: " + usChampion);
    console.log("coreItem: " + usCoreItem);
    console.log("skin: " + usSkin);
  };

  return (
    <>
      {/* formulario */}
      <Form noValidate onSubmit={validarForma} validated={ver}>
        <FormGroup controlId="champion">
          <Form.Label>CHAMPION</Form.Label>
          <Form.Control
            type="text"
            name="champion"
            placeholder="champion"
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="coreItem">
          <Form.Label>ITEM</Form.Label>
          <Form.Control
            type="text"
            name="coreItem"
            placeholder="coreItem"
            required
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="skin">
          <Form.Label>Skin</Form.Label>
          <Form.Control
            type="text"
            name="skin"
            placeholder="skin"
            required
          ></Form.Control>
        </FormGroup>
        <Button type="submit" variant="success">
          Save
        </Button>
        <Button type="button" variant="primary" onClick={prueba}>
          syncAsync
        </Button>
        <Button type="button" variant="warning" onClick={verStore}>
          store
        </Button>
      </Form>
    </>
  );
}

export default App;
