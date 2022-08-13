import React from "react";
import { Link } from "react-router-dom";
// import Login from "../page/Login";



export const Header = () => {
	return (
		<>
			<h1>Header</h1>
			<Link to="/login">ログイン</Link>
			<Link to="/signup">登録</Link>
		</>
	);
};

export default Header;
