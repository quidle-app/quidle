import {Outlet} from "react-router";
import {Link} from "react-router-dom";
import "./style/global.css";
import styled from "styled-components";
import React, {useContext} from "react";
import {userStore} from "./user";
import {Show} from "./Elems/generics";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
    const user = useContext(userStore);

    return (
        <Wrapper>
            <div className="header">
                <nav>
                    <h1 className="logo">
                        <Link to="/">Quidle</Link>
                    </h1>
                    <ul>
                        <Show when={user.loggedIn}>
                            <li>
                                <Link to="/profile">Profil</Link>
                            </li>
                            <li>
                                <Link to="/logout">Wyloguj</Link>
                            </li>
                        </Show>
                        <Show when={!user.loggedIn}>
                            <li>
                                <Link to="/login">Logowanie</Link>
                            </li>
                            <li>
                                <Link to="/register">Rejestracja</Link>
                            </li>
                        </Show>
                    </ul>
                </nav>
            </div>
            <div className="container">
                <Outlet/>
            </div>
            <ToastContainer theme="colored"/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 92px;
    background-color: #f3f3f3;
    border-bottom: 1px solid #d5d5d5;

    nav {
      margin: auto;
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .logo > a {
        color: var(--accent-color);
        font-size: 2rem;
      }

      ul {
        list-style-type: none;
        display: flex;
      }

      li {
        margin: auto 20px auto auto;
      }

      a {
        color: black;
        text-decoration: none;
      }

      a:hover {
        color: var(--accent-color);
      }
    }
  }

  .container {
    margin-top: 100px;
    width: 80%;
    height: 100%;
    padding: 20px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
`;

export default Layout;
