import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import './principal.css';
import '../index.css';
import banner1 from "../image/banner1.png";
import banner2 from "../image/banner2.png";
import banner3 from "../image/banner3.png";




const Principal = () => {

    return(
        <div className="fullHeight">
            {/* menu  */}
            <div className="menuFondo">
            <Menu />
            </div>
            {/* carrousel  */}
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">    
                    <div class="carousel-item active">  
                            <img class="d-block w-100" src={banner1} alt="First slide"/>
                                <div class="carousel-caption d-none d-md-block">
                                    <h1 className="sizeB">COCINA VINTAGE</h1>
                                    <h3>Selenia Mendez</h3>
                                </div>
                    </div>
                    <div class="carousel-item">    
                    <img class="d-block w-100" src={banner2} alt="Second slide"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h1 className="sizeB">MEJORES RECETAS</h1>
                        </div>
                    </div>
                    <div class="carousel-item">
                    <img class="d-block w-100" src={banner3} alt="Third slide"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h1 className="sizeB">MEJORES SABORES</h1>
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

            <div class="container">
            
                {/* quienes somos  */}
                <div class="row">
                    <div className="titlo col-lg-12 colorR">
                        <h1 class="text-center">¿QUIENES SOMOS?</h1>   
                    </div>
                </div>
                <div class="row">   
                    <div className="col-lg-3">
                        <img src="https://image.flaticon.com/icons/png/512/16/16363.png" className="fotoPerfil"/>
                    </div>
                    <div className="col-lg-8 ml-1 mb-10 pb-5">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                </div>

                {/* servicios  */}
                <div class="row">
                    <div className="titlo col-lg-12 colorR">
                        <h1 class="text-center">¿QUE OFRECEMOS?</h1> 

                    </div>
                </div>

            </div>
        </div>
        
        
    );
}

export default Principal;