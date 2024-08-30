"use client";

import React from "react";
import { Activity, Flash, Server, Model } from "./icons.tsx";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@nextui-org/react";


const CraftNavbar: React.FC = () => {
  const icons = {
    activity: <Activity className="text-secondary" fill="currentColor" size={30} />,
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    model: <Model className="text-danger" fill="currentColor" size={30} />,
  };
  return (
    <Navbar isBordered className="navbar-dark">
      <NavbarBrand as={Link} href="/">
        <p className="font-bold text-inherit">Data Craft</p>
      </NavbarBrand>
      <NavbarContent className="flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem isActive>
            <DropdownTrigger>
              <Button
                disableRipple
                radius="sm"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="DataCraft features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem
              key="data-cleaning"
              description="Data Craft offers a faster data cleaning process, such as handling missing values, removing duplicate records, etc."
              startContent={icons.flash}
            >
              Data Cleaning
            </DropdownItem>
            <DropdownItem
              key="dashboard"
              description="Data Craft offers informative data visualizations in a dashboard based on data types."
              startContent={icons.activity}
            >
              Visualizations
            </DropdownItem>
            <DropdownItem
              key="analytics"
              description="Data is displayed in a table, with options for selecting columns and chart types to generate customized visualizations."
              startContent={icons.server}
            >
              Data Analytics
            </DropdownItem>
            <DropdownItem
              key="ml_model"
              description="A machine learning model to support further data analysis (Future Inclusion)."
              startContent={icons.model}
            >
              Machine Learning Models
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem isActive>
          <Link color="foreground" href="/dashboard">
            Dashboards
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/analytics">
            Analytics
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default CraftNavbar;
