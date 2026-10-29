import { NavLink } from "react-router-dom";
import "../App.css";

function Navbar(props) {
  return (
    <main className="navbar">
      <h1 className="logo">meesho</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search beauty products"
        value={props.searchTerm}
        onChange={(e) => props.setSearchTerm(e.target.value)}
      />
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/skincare">Skincare</NavLink>
        <NavLink to="/makeup">Makeup</NavLink>
        <NavLink to="/haircare">Haircare</NavLink>
        <NavLink to="/fragrance">Fragrance</NavLink>
        <NavLink to="/cart">Cart ({props.cartCount})</NavLink>
      </nav>
    </main>
  );
}
export default Navbar;
