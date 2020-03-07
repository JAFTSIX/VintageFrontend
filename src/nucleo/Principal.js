import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import './principal.css'
import '../index.css'

const Principal = () => {

    return(
        <div className="fullHeight">
        <div className="menuFondo">
            <Menu />
        </div>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">

                <img class="d-block w-100" src="https://cdn2.cocinadelirante.com/sites/default/files/images/2016/05/pasteldechocolate.jpg" alt="First slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>PASTEL DE CHOCOLATE</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/garlic-spaghetti-horizontal-1539203011.jpg" alt="Second slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>PASTEL DE FRESE</h5>
                        <p>...</p>
                    </div>
                </div>
                <div class="carousel-item">
                <img class="d-block w-100" src="https://sifu.unileversolutions.com/image/es-ES/recipe-topvisual/2/1260-709/pastel-de-chocolate-y-cayena-con-corazon-cremoso-de-cereza-50290598.jpg" alt="Third slide"/>
                    <div class="carousel-caption d-none d-md-block">
                        <h5>PASTEL DE CARAMELO</h5>
                        <p>...</p>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
        </div>
        
    );
}

export default Principal;