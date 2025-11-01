import { useState } from "react";
import Hamburger from "hamburger-react";
import CategoriList from "../pages/Categories";
import "./HamburgerMenu.css"

function HamburgerComponent(){

const[open,setOpen]=useState(false);

    return(

<div>
   
   <Hamburger
    size={18}
    toggled={open}
    toggle={setOpen}
            />      
    {open &&
        <div className="dropdown-absolute">
          <CategoriList />
        </div>         
        }
</div>
       

    );

}


export default HamburgerComponent; 