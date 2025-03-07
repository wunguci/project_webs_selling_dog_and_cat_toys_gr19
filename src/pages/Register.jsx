import MainLayout from "../layout/mainLayout";
import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";

const Register = () => {
  const links = [{ label: "Home", link: "/" }, { label: "Register" }];

  return (
    <MainLayout>
      <div className="container">
        <Breadcrumb items={links} />
      </div>
    </MainLayout>
  );
};

export default Register;
