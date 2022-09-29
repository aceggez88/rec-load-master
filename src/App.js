import React, { useCallback, useMemo, useState, useRef } from "react";
import cors from "cors";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Button,
  Form,
  Table,
  InputGroup,
  Dropdown,
  DropdownButton,
  Tab,
  Tabs,
  ListGroup,
} from "react-bootstrap";

// excel zone --------------------------//
import icon_excel from "./icon_excel.png";
import Excel from "exceljs";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";
const workSheetName = "Worksheet-1";
const workBookName = "MyWorkBook";
const myInputId = "myInput";

//----------------------------------------//
function App() {
  const [scan_qr, setScan_QR] = useState("");
  const [NO, setNO] = useState("");
  const [side, setSide] = useState("");
  var [product_code, setProduct_code] = useState("");
  var [date_code, setDate_code] = useState("");
  const [pattern, setPattern] = useState("");
  const [QTY, setQTY] = useState("");
  const [sum_of_date_code, setSum_of_date_code] = useState("");
  const inputRef = useRef(null);

  const [add_no, setAdd_no] = useState([]);
  const [add_product, setAdd_product] = useState([]);
  const [add_product2, setAdd_product2] = useState([]);
  const [add_datecode, setAdd_datecode] = useState([]);
  const [add_pattern, setAdd_pattern] = useState([]);
  const [add_QTY, setAdd_QTY] = useState([]);
  const [add_sum, setAdd_sum] = useState([]);
  //----------------------------------------------------------//
  const [result_number, setResult_number] = useState([]);
  const [result_product_code, setResult_product_code] = useState([]);
  const [result_date_code, setResult_date_code] = useState([]);
  const [result_pattern, setResult_pattern] = useState([]);
  const [result_qty, setResult_qty] = useState([]);
  const [result_sum, setResult_sum] = useState([]);
  //---------------set summary -------------------------------------//
  const [load_date, setLoad_date] = useState([]);
  const [buyer, setBuyer] = useState([]);
  const [order_no, setOrder_no] = useState([]);
  const [brand, setBrand] = useState([]);
  const [agent, setAgent] = useState([]);
  const [seal_no, setSeal_no] = useState([]);
  const [ctrn_no, setCtrn] = useState([]);

  const [car_no, setCar_no] = useState([]);
  const [check_in, setCheck_in] = useState([]);
  const [check_out, setCheck_out] = useState([]);

  const [t_tail, setT_tail] = useState([]);
  const [t_side, setT_side] = useState([]);
  const [t_top, setT_top] = useState([]);
  const [t_head, setT_head] = useState([]);
  const [t_buttom, setT_buttom] = useState([]);

  const [t_clean, setT_clean] = useState([]);
  const [t_leak, setT_leak] = useState([]);
  const [t_break, setT_break] = useState([]);
  const [t_smell, setT_smell] = useState([]);
  const [t_water, setT_water] = useState([]);
  const [t_net, setT_net] = useState([]);
  const [t_safe, setT_safe] = useState([]);
  const [t_pin, setT_pin] = useState([]);

  const [blank, setBlank] = useState([]);
  const [inner, setInner] = useState([]);
  const [label, setLabel] = useState([]);
  const [real_load, setReal_load] = useState([]);
  const [short_shipped, setShort_shipped] = useState([]);

  const [filename_excel, setFilename_excel] = useState([]);
  //img zone//
  const img_qr = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="currentColor"
      class="bi bi-qr-code"
      viewBox="0 0 16 16"
    >
      <path d="M2 2h2v2H2V2Z" />
      <path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" />
      <path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" />
      <path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z" />
      <path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" />
    </svg>
  );
  const img_load_icon = (
    <a class="text-decoration-none" style={{ color: "#FFF" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        class="bi bi-truck"
        viewBox="0 0 16 16"
      >
        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
      </svg>
    </a>
  );
  const icon_copy = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-clipboard-check"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
      />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>
  );
  const icon_submit = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-box-arrow-down"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
      />
      <path
        fill-rule="evenodd"
        d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
      />
    </svg>
  );
  const summary_list = (
    <a>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        class="bi bi-file-earmark-text"
        viewBox="0 0 16 16"
      >
        <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
        <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
      </svg>{" "}
      Sumary{" "}
    </a>
  );
  // end img zone//
  //csv zone//
  const headers_csv = [
    "No",
    "SIDE",
    "Product Code",
    "DATE Code",
    "Pattern",
    "QTY",
    "SUM of Date Code",
  ];
  const data_csv = [add_product];
  const csvReport = {
    data: data_csv,
    headers: headers_csv,
    filename: filename_excel + ".csv",
  };
  //--------//

  function sliptext(e) {
    e.preventDefault();
    var myarry = scan_qr.split("|");
    setProduct_code(myarry[0]);
    setDate_code(myarry[1]);

    console.log("test fn.");
    inputRef.current.value = "";
  }
  function submit_form(e) {
    e.preventDefault();
    var item =
      '"' +
      NO +
      '",' +
      '"' +
      side +
      '",' +
      '"' +
      product_code +
      '",' +
      '"' +
      date_code +
      '",' +
      '"' +
      pattern +
      '",' +
      '"' +
      QTY +
      '",' +
      '"' +
      sum_of_date_code +
      '",' +
      "\n";

    setAdd_product([...add_product, item]);

    var item2 =
      "[NO: " +
      NO +
      "(" +
      side +
      ")] " +
      "[PRODUCT CODE: " +
      product_code +
      "] " +
      "[DATE CODE: " +
      date_code +
      "] " +
      "[PATTERN: " +
      pattern +
      "] " +
      "[QTY: " +
      QTY +
      "] " +
      "[SUM: " +
      sum_of_date_code +
      "] ";

    inputRef.current.value = "";
    setAdd_product2([...add_product2, item2]);
    //'"'+ NO + '"'+", product_code: "+'"' + product_code + '"'+" ,\n"
  }

  const removeTodo = (index) => {

    let todo = [...add_product2]

    todo.splice(index, 1)
    setAdd_product2(todo)

  }
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          {img_load_icon}
          <Navbar.Brand href="index.js">Load Recorder</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link disable>i-Tail Co.</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container fluid d-flex>
        <Row>
          <Col className="m-5 p-2">
            <Card className="p-3">
              <Form className="text-center ">
                <Row>
                  <Tabs
                    defaultActiveKey="loading-details"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                  >
                    <Tab eventKey="loading-details" title="Loading Details">
                      <Col>
                        <Card className="m-3 p-3">
                          {" "}
                          <InputGroup className="mb-3">
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                LOADING DATE :
                              </InputGroup.Text>
                              <Form.Control
                                type="date"
                                onChange={(e) => setLoad_date(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                BUYER :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setBuyer(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                ORDER NO. :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setOrder_no(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                BRAND :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setBrand(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                QUANTITY :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setQTY(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                AGENT :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setAgent(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                SEAL NO. :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setSeal_no(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                CTNR NO. :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setCtrn(e.target.value)}
                              />
                            </InputGroup>
                          </InputGroup>
                          <div></div>
                          <center>
                            <Button
                              variant="dark"
                              type="submit"
                              className="text-center m-2 "
                              style={{ width: "5rem" }}
                              disabled
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-plus-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                            </Button>
                          </center>
                        </Card>
                      </Col>
                    </Tab>
                    <Tab eventKey="car_details" title="Truck Details">
                      <Col>
                        <Card className="m-3 p-3">
                          {" "}
                          <InputGroup className="mb-3">
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                ทะเบียนรถ/หัวลาก :
                              </InputGroup.Text>
                              <Form.Control
                                type="text"
                                onChange={(e) => setCar_no(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <InputGroup.Text id="basic-addon2">
                                เวลาเข้า :
                              </InputGroup.Text>
                              <Form.Control
                                type="time"
                                onChange={(e) => setCheck_in(e.target.value)}
                              />
                              <InputGroup.Text id="basic-addon2">
                                เวลาออก :
                              </InputGroup.Text>
                              <Form.Control
                                type="time"
                                onChange={(e) => setCheck_out(e.target.value)}
                              />
                            </InputGroup>
                            <InputGroup className="mt-3 ">
                              <Card className="m-2">
                                <InputGroup.Text id="basic-addon2">
                                  สภาพตู้ภายนอก :
                                </InputGroup.Text>

                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ท้ายตู้"
                                  className="m-2"
                                  value="checked"
                                  onChange={setT_tail}
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ด้านข้าง 2ด้าน"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ด้านบน"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ด้านหน้า"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ด้านล่าง"
                                  className="m-2"
                                />
                              </Card>
                              <Card className="m-2">
                                <InputGroup.Text id="basic-addon2">
                                  สภาพตู้ภายใน :
                                </InputGroup.Text>

                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ความสะอาด"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ไม่มีรู้รั่ว"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ไม่มีรอยแตก"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ไม่มีกลิ่นผิดปกติ"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ไม่มีน้ำขังในตู้"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="หูตุู้สามารถร้อยตะข่ายชั้นบนสุดได้"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ด้านความปลอดภัย"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="หมุนล้อรถ"
                                  className="m-2"
                                />
                              </Card>
                              <Card className="m-2">
                                <InputGroup.Text id="basic-addon2">
                                  การตรวจสภาพหลังบรรจุ :
                                </InputGroup.Text>
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="สภาพก่อนปล่อยตู้ ด้านข้างทั้ง 4 ด้าน"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ประตู"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="ตัวล็อก"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="สภาพ Seal"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="การกั้นท้ายตู้กระดาษ"
                                  className="m-2"
                                />
                                <Form.Check
                                  type="switch"
                                  id="custom-switch"
                                  label="(เทปกาวไม่ติดกล่องสินค้า) ตาข่าย "
                                  className="m-2"
                                />{" "}
                                <InputGroup
                                  className="m-2 "
                                  style={{ width: "20rem" }}
                                >
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    style={{ width: "10rem" }}
                                  >
                                    กล่องเปล่าเข้าตู้ :
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="number"
                                    onChange={(e) => setBlank(e.target.value)}
                                  />{" "}
                                  <InputGroup.Text id="basic-addon2">
                                    ใบ
                                  </InputGroup.Text>
                                </InputGroup>
                                <InputGroup
                                  className="m-2 "
                                  style={{ width: "20rem" }}
                                >
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    style={{ width: "10rem" }}
                                  >
                                    Inner เปล่าเข้าตู้ :
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="number"
                                    onChange={(e) => setInner(e.target.value)}
                                  />{" "}
                                  <InputGroup.Text id="basic-addon2">
                                    ใบ
                                  </InputGroup.Text>
                                </InputGroup>
                                <InputGroup
                                  className="m-2 "
                                  style={{ width: "20rem" }}
                                >
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    style={{ width: "10rem" }}
                                  >
                                    ฉลากเข้าตู้ :
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="number"
                                    onChange={(e) => setLabel(e.target.value)}
                                  />{" "}
                                  <InputGroup.Text id="basic-addon2">
                                    ใบ
                                  </InputGroup.Text>
                                </InputGroup>
                                <InputGroup
                                  className="m-2 "
                                  style={{ width: "20rem" }}
                                >
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    style={{ width: "10rem" }}
                                  >
                                    จำนวนที่ส่งมอบจริง :
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="number"
                                    onChange={(e) =>
                                      setReal_load(e.target.value)
                                    }
                                  />{" "}
                                  <InputGroup.Text id="basic-addon2">
                                    กล่อง
                                  </InputGroup.Text>
                                </InputGroup>
                                <InputGroup
                                  className="m-2 "
                                  style={{ width: "20rem" }}
                                >
                                  <InputGroup.Text
                                    id="basic-addon2"
                                    style={{ width: "10rem" }}
                                  >
                                    SHORT SHIPPED :
                                  </InputGroup.Text>
                                  <Form.Control
                                    type="number"
                                    onChange={(e) =>
                                      setShort_shipped(e.target.value)
                                    }
                                  />{" "}
                                  <InputGroup.Text id="basic-addon2">
                                    กล่อง
                                  </InputGroup.Text>
                                </InputGroup>
                              </Card>
                            </InputGroup>
                          </InputGroup>
                          <div></div>
                          <center>
                            <Button
                              variant="dark"
                              type="submit"
                              className="text-center m-2 "
                              style={{ width: "5rem" }}
                              disabled
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                class="bi bi-plus-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                            </Button>
                          </center>
                        </Card>
                      </Col>
                    </Tab>
                    <Tab eventKey="add-pallet" title="Add Pallet">
                      <Col className="m-5 p-2">
                        <Card className="p-4 ">
                          <Form className="text-center ">
                            <div className="mr-1"></div>

                            <InputGroup className="mt-3 ">
                              {img_qr}
                              <Form.Control
                                type="text"
                                placeholder="Scan-QR"
                                onChange={(e) => setScan_QR(e.target.value)}
                                id="scan_qr"
                                ref={inputRef}
                                required
                              />{" "}
                              <Button
                                variant="dark"
                                type="submit"
                                className="text-center "
                                onClick={sliptext}
                              >
                                {icon_copy}
                              </Button>
                            </InputGroup>
                            <Card className="p-4 mt-4">
                              <Form className="text-center ">
                                <InputGroup className="mb-3">
                                  <InputGroup className="mt-3 ">
                                    <div style={{ width: "5rem" }}>
                                      <Form.Select
                                        required
                                        onChange={(e) => setNO(e.target.value)}
                                      >
                                        <option value="0">No</option>
                                        <option value="1">1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                        <option value={11}>11</option>
                                        <option value={12}>12</option>
                                        <option value={13}>13</option>
                                        <option value={14}>14</option>
                                        <option value={15}>15</option>
                                        <option value={16}>16</option>
                                        <option value={17}>17</option>
                                        <option value={18}>18</option>
                                        <option value={19}>19</option>
                                        <option value={20}>20</option>
                                        <option value={21}>21</option>
                                        <option value={22}>22</option>
                                        <option value={23}>23</option>
                                        <option value={24}>24</option>
                                        <option value={25}>25</option>
                                        <option value={26}>26</option>
                                        <option value={27}>27</option>
                                        <option value={28}>28</option>
                                        <option value={29}>29</option>
                                        <option value={30}>30</option>
                                        <option value={31}>31</option>
                                        <option value={32}>32</option>
                                        <option value={33}>33</option>
                                        <option value={34}>34</option>
                                        <option value={35}>35</option>
                                        <option value={36}>36</option>
                                        <option value={37}>37</option>
                                        <option value={38}>38</option>
                                        <option value={39}>39</option>
                                        <option value={40}>40</option>
                                        <option value={41}>41</option>
                                        <option value={42}>42</option>
                                        <option value={43}>43</option>
                                        <option value={44}>44</option>
                                      </Form.Select>
                                    </div>
                                    <div style={{ width: "8rem" }}>
                                      <Form.Select
                                        onChange={(e) =>
                                          setSide(e.target.value)
                                        }
                                      >
                                        <option value="-">-</option>
                                        <option value="UP">UP</option>
                                        <option value="DOWN">DOWN</option>
                                      </Form.Select>
                                    </div>
                                    <Form.Control
                                      type="text"
                                      placeholder="PRODUCT CODE:"
                                      value={product_code}
                                      disabled
                                    />
                                    <Form.Control
                                      type="text"
                                      placeholder="DATE CODE"
                                      value={date_code}
                                      disabled
                                    />
                                  </InputGroup>
                                </InputGroup>

                                <InputGroup className="mb-3">
                                  <Form.Control
                                    type="text"
                                    placeholder="PATTERN"
                                    className=" p-2"
                                    onChange={(e) => setPattern(e.target.value)}
                                  />
                                  <Form.Control
                                    type="text"
                                    placeholder="QTY(CTNS)"
                                    className=" p-2"
                                    onChange={(e) => setQTY(e.target.value)}
                                  />
                                  <Form.Control
                                    type="text"
                                    placeholder="SUM OF DATE CODE(CTNS)"
                                    className=" p-2"
                                    onChange={(e) =>
                                      setSum_of_date_code(e.target.value)
                                    }
                                  />
                                </InputGroup>

                                <Button
                                  variant="dark"
                                  type="submit"
                                  className="text-center "
                                  onClick={submit_form}
                                >
                                  {icon_submit}
                                </Button>
                              </Form>
                            </Card>
                          </Form>
                        </Card>
                      </Col>
                      <Row>
                        <Col className="m-5 p-2">
                          <Card className=" p-5">
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th>Loaded.</th>
                                </tr>
                              </thead>
                              <tbody>
                                {add_product2.map((item,index) => (
                                  <tr>
                                    <td key={index}>{item} <Button  onClick={() => removeTodo(index)} >Remove </Button>  </td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Card>
                        </Col>
                      </Row>
                    </Tab>
                    <Tab eventKey="content-form" title={summary_list}>
                      <Col>
                        <Card className="m-2 p-2 mt-4">
                          <Row>
                            <div className=" p-3">
                              <InputGroup className="mt-3">
                                <InputGroup.Text id="basic-addon2">
                                  File name :
                                </InputGroup.Text>
                                <Form.Control
                                  type="text"
                                  onChange={(e) =>
                                    setFilename_excel(e.target.value)
                                  }
                                />

                                <Card
                                  style={{ width: "8rem" }}
                                  className="pt-1"
                                >
                                  {" "}
                                  <CSVLink {...csvReport}>
                                    {" "}
                                    <img
                                      src={icon_excel}
                                      alt="Logo"
                                      width={20}
                                    />
                                  </CSVLink>{" "}
                                </Card>
                              </InputGroup>
                            </div>

                            <div style={{ width: "20rem" }} className="m-2">
                              <p>
                                {" "}
                                <h5> - Loading Details </h5>
                              </p>

                              <ListGroup>
                                <ListGroup.Item>
                                  {" "}
                                  LOADING DATE : {load_date}
                                </ListGroup.Item>
                                <ListGroup.Item>BUYER : {buyer}</ListGroup.Item>
                                <ListGroup.Item>
                                  ORDER NO : {order_no}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  {" "}
                                  BRAND : {brand}
                                </ListGroup.Item>
                                <ListGroup.Item>AGENT : {agent}</ListGroup.Item>
                                <ListGroup.Item>
                                  SEAL NO : {seal_no}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                  CTNR NO : {ctrn_no}
                                </ListGroup.Item>
                              </ListGroup>
                            </div>
                            <div style={{ width: "30rem" }} className="m-2">
                              <p>
                                {" "}
                                <h5> - Truck Details </h5>
                              </p>
                              <Card.Text>
                                <ListGroup>
                                  <ListGroup.Item>
                                    ทะเบียนหัวรถลาก: {car_no}
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    เวลาเข้า : {check_in}
                                  </ListGroup.Item>
                                  <ListGroup.Item>
                                    เวลาออก : {check_out}
                                  </ListGroup.Item>
                                </ListGroup>
                              </Card.Text>
                              <Card className="">
                                <InputGroup.Text id="basic-addon2">
                                  การตรวจสภาพหลังบรรจุ :
                                </InputGroup.Text>
                                <div className="m-3 ">
                                  <center>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        กล่องเปล่าเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={blank}
                                      />{" "}
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "4rem" }}
                                      >
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        Inner เปล่าเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={inner}
                                      />{" "}
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "4rem" }}
                                      >
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        ฉลากเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={label}
                                      />{" "}
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "4rem" }}
                                      >
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        จำนวนที่ส่งมอบจริง :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={real_load}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        กล่อง
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        SHORT SHIPPED :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={short_shipped}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        กล่อง
                                      </InputGroup.Text>
                                    </InputGroup>
                                  </center>
                                </div>
                              </Card>
                            </div>
                            <div className="m-2">
                              <Col>
                                <InputGroup className="mt-3 ">
                                  {/* <Card className="m-2">
                                    <InputGroup.Text id="basic-addon2">
                                      สภาพตู้ภายนอก :
                                    </InputGroup.Text>

                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ท้ายตู้"
                                      className="m-2"
                                      value={t_tail}
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ด้านข้าง 2ด้าน"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ด้านบน"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ด้านหน้า"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ด้านล่าง"
                                      className="m-2"
                                      checked
                                    />
                                  </Card> */}
                                  {/* <Card className="m-2">
                                    <InputGroup.Text id="basic-addon2">
                                      สภาพตู้ภายใน :
                                    </InputGroup.Text>

                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ความสะอาด"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ไม่มีรู้รั่ว"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ไม่มีรอยแตก"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ไม่มีกลิ่นผิดปกติ"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ไม่มีน้ำขังในตู้"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="หูตุู้สามารถร้อยตะข่ายชั้นบนสุดได้"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ด้านความปลอดภัย"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="หมุนล้อรถ"
                                      className="m-2"
                                      checked
                                    />
                                  </Card> */}
                                  {/* <Card className="m-2">
                                    <InputGroup.Text id="basic-addon2">
                                      การตรวจสภาพหลังบรรจุ :
                                    </InputGroup.Text>
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="สภาพก่อนปล่อยตู้ ด้านข้างทั้ง 4 ด้าน"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ประตู"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="ตัวล็อก"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="สภาพ Seal"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="การกั้นท้ายตู้กระดาษ"
                                      className="m-2"
                                      checked
                                    />
                                    <Form.Check
                                      type="switch"
                                      id="custom-switch"
                                      label="(เทปกาวไม่ติดกล่องสินค้า) ตาข่าย "
                                      className="m-2"
                                      checked
                                    />{" "}
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        กล่องเปล่าเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={blank}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        Inner เปล่าเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={inner}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        ฉลากเข้าตู้ :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={label}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        ใบ
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        จำนวนที่ส่งมอบจริง :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={real_load}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        กล่อง
                                      </InputGroup.Text>
                                    </InputGroup>
                                    <InputGroup
                                      className="m-2 "
                                      style={{ width: "20rem" }}
                                    >
                                      <InputGroup.Text
                                        id="basic-addon2"
                                        style={{ width: "10rem" }}
                                      >
                                        SHORT SHIPPED :
                                      </InputGroup.Text>
                                      <Form.Control
                                        type="number"
                                        value={short_shipped}
                                      />{" "}
                                      <InputGroup.Text id="basic-addon2">
                                        กล่อง
                                      </InputGroup.Text>
                                    </InputGroup>
                                  </Card> */}
                                </InputGroup>

                                <div></div>
                              </Col>
                            </div>
                          </Row>
                        </Card>

                        <Card className="m-2 p-2 mt-4">
                          Pallet Loaded
                          <Col className="m-5 p-2">
                            <Table responsive>
                              <thead>
                                <tr>
                                  <th>Loaded.</th>
                                </tr>
                              </thead>
                              <tbody>
                                {add_product.map((item) => (
                                  <tr>
                                    <td key={item}>{item}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Card>
                      </Col>
                    </Tab>
                  </Tabs>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
