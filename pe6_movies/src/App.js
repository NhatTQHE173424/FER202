import React from 'react';
import { Container, Col, Row, Form, Card, Button, Table } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Movie  from './components/Movie';
import Star from './components/Star';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id/add-star" element={<Star />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
