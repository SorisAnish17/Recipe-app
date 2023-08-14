import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import imageOne from "../Assets/error-404.png";
import { Form, Row, InputGroup, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link, useParams } from "react-router-dom";
import { database } from "../Config/firebase";
import { ref, onValue, update } from "firebase/database";
import { auth } from "../Config/firebase";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserUniqueId } from "../Context/Context";
import FileBase64 from "react-file-base64";
const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("Error");
  const [show, setShow] = useState(false);
  const { uuid, setUuid } = UserUniqueId();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userId } = useParams();
  const navigate = useNavigate();
  const [getUserData, setGetUserData] = useState({});

  const fetchRecipes = () => {
    setUuid(userId);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.meals);
      })
      .catch((error) => console.log("error"));
  };

  useEffect(() => {
    fetchRecipes();
    const profile = async () => {
      try {
        const starCountRef = ref(database, "users/" + userId);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setGetUserData(data);
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        console.log("error");
      }
    };
    profile();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      fetchRecipes();
    } else if (searchQuery) {
      const filteredRecipes = recipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecipes(filteredRecipes);
    }
  }, [searchQuery]);
  const handleSave = async () => {
    let updatedData = {
      firstName: firstName !== "" ? firstName : getUserData.firstName,
      secondName: secondName !== "" ? secondName : getUserData.secondName,
      address: address !== "" ? address : getUserData.address,
      city: city !== "" ? city : getUserData.city,
      state: state !== "" ? state : getUserData.state,
      phoneNumber: phoneNumber !== "" ? phoneNumber : getUserData.phoneNumber,
      fileUpload: fileUpload !== "" ? fileUpload : getUserData.fileUpload,
    };
    if (window.confirm("Are you sure to update Your Data?")) {
      await update(ref(database, "users/" + userId), updatedData);
      alert("Successfully updated");
    }
  };

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure want to delete your account")) {
        let deletedData = {
          firstName: null,
          secondName: null,
          email: null,
          address: null,
          city: null,
          state: null,
          phoneNumber: null,
          password: null,
          fileUpload: null,
        };
        await update(ref(database, "users/" + userId), deletedData);
        await EmailDelete();
        window.location.reload();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const EmailDelete = async () => {
    const user = auth.currentUser;

    await deleteUser(user)
      .then(() => {
        // User deleted.
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
  };
  const handleFile = ({ base64 }) => {
    setFileUpload(base64);
  };
  // Input Field States
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  let [fileUpload, setFileUpload] = useState("");
  return (
    <>
      <div className="hero">
        <div className="d-flex justify-content-end me-5 pt-3 gap-5">
          <Link
            to="/Login"
            className="mt-2 text-decoration-none"
            style={{ textShadow: "2px 2px 2px" }}
          >
            LogOut
          </Link>
          <div onClick={handleShow} id="profile">
            <img
              src={getUserData.fileUpload}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                Profile{" "}
                <img
                  src={getUserData.fileUpload}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "khaki" }}>
              <Form className="p-5">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={getUserData.firstName}
                      placeholder="First name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      defaultValue={getUserData.secondName}
                      placeholder="Last name"
                      onChange={(e) => setSecondName(e.target.value)}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="email"
                        defaultValue={getUserData.email}
                        aria-describedby="inputGroupPrepend"
                        readOnly={true}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationCustomAddress"
                  >
                    <Form.Label>Address</Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        defaultValue={getUserData.address}
                        aria-describedby="inputGroupPrepend"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please choose a username.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Select City</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      defaultValue={getUserData.city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option>Select your City</option>
                      <option value="Kanyakumari">Kanyakumari</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Thirunelveli">Thirunelveli</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Goa">Thensaki</option>
                      <option value="Kerala">Tuticorin</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      defaultValue={getUserData.state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid state.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="6" controlId="validationCustom05">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="Number"
                      placeholder="Phone Number"
                      defaultValue={getUserData.phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom06">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      defaultValue={getUserData.password}
                      readOnly={true}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid Phone Number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} md="12" controlId="validationCustom06">
                    <Form.Label className="pt-3">
                      Upload to Change Your Profile Picture
                    </Form.Label>
                    <FileBase64
                      type="file"
                      placeholder="Enter Your Profile Picture here."
                      defaultValue={getUserData.fileUpload}
                      onDone={handleFile}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      please Upload Your File
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete Account
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <h1
          style={{
            paddingTop: "155px",
            textShadow: "2px 12px black",
            fontSize: "155px",
            color: "orange",
          }}
          id="hero-title"
        >
          Fresh Recipes
        </h1>
      </div>
      <div className="mt-2">
        <h2>Our Recipes</h2>
        <form className="m-3">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            style={{
              width: "450px",
              height: "36px",
              boxShadow: "2px  2px 2px",
            }}
            placeholder="Search recipes..."
            id="search"
          />
          <button className="btn m-2" style={{ backgroundColor: "khaki" }}>
            Search
          </button>
        </form>
        <div
          className="d-flex flex-wrap justify-content-center gap-5"
          id="cards-menu"
        >
          {recipes.length > 0 ? (
            recipes.map(({ idMeal, strMeal, strCategory, strMealThumb }) => (
              <div key={idMeal}>
                <RecipeCard
                  idMeal={idMeal}
                  strMeal={strMeal}
                  strCategory={strCategory}
                  strMealThumb={strMealThumb}
                />
              </div>
            ))
          ) : (
            <div>
              <p>Recipe not found.</p>
              <img src={imageOne} style={{ width: "150px", height: "150px" }} />
            </div>
          )}
        </div>
      </div>
      <Row className="text-center bg-warning p-2 mt-5">
        <div className="footer-content">
          <p>© 2023 Fresh Recipes. All rights reserved.</p>
        </div>
      </Row>
    </>
  );
};

export default Home;
