import React, { Component } from 'react';
import './principal.css';
import '../index.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Footer = () => {
    return(
        // {/* footer  */}
        <div class="bg-dark footerMarginTop ">
        <div class="container">
            <div class="row paddingT5 footerCss">       
                <div class="col-lg-6 col-md-6 col-sm-12 text-center footerHeightSocialMedia">
                    <h4 class="font-weight-bold text-light mb-lg-5 mb-md-2">Redes Sociales</h4>
                    <a href="https://www.facebook.com/ChefSeleniaLive/" target="_blank">
                    <img src="https://i.pinimg.com/originals/41/28/2b/41282b58cf85ddaf5d28df96ed91de98.png"
                        height="100" width="74" class="paddingB5"/>
                    </a>
                    <a href="https://www.instagram.com/chefselenia/?hl=es-la" target="_blank">
                    <img src="https://www.pngkey.com/png/full/283-2831746_insta-icon-instagram.png"
                        height="86" width="59" class="paddingB5"/>
                    </a>
                    <a href="https://www.youtube.com/channel/UCz_K9qRmcSbFKY_IwdO-d5g/videos" target="_blank">
                    <img src="https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png"
                        height="93" width="87" class="paddingB5"/>
                    </a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12 text-center">  
                    <h4 class="font-weight-bold text-light mb-lg-5 mb-md-2">Contactenos</h4>
                    <p class="text-light">Email: pasteleriarealezas@hotmail.com</p>
                </div>    
            </div>
            <div class="row">   
                <div class="col-lg-12 text-center">
                   <hr/>
                   <p class="text-light">©2020 Cocina Vintage. Todos los derechos reservados.</p>
                </div>  
            </div>
        </div>
        </div>
    );
}

export default Footer;
