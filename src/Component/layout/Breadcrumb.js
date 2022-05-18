import React from "react";
import { Link } from "react-router-dom";
export const Breadcrumb = () => {
  return (
    <section className="breadcrumb__area">
            <ul>
                <li><Link to={""}>Getting Started</Link></li>
                <li><Link to={""}>Welcome </Link></li>
                <li className="current"> Setup your Primary Data </li>
            </ul>
        </section>
  )
}