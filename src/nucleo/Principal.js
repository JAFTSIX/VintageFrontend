import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import './principal.css';
import '../index.css';
import banner1 from "../image/banner1.png";
import banner2 from "../image/banner2.png";
import banner3 from "../image/banner3.png";
import logo from "../image/logo.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";





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
                        <h5 class="text-center">Las mejores recetas gourmet</h5> 
                    </div>
                </div>
                {/* carrousel recetas  */}
                <div class="row text-center">   
                    <div class="card ">
                        <img src="https://okdiario.com/img/recetas/2016/12/29/desayunos-alrededor-del-mundo-2.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="card">  
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTj4uFKMmJ1sec1f4k1p68ZZLlfSKrupev4BFK6MqKVoa-wB8Qy" className="fotoPerfil"/>
                    </div>
                    <div class="card">
                        <img src="https://vamosacomerrico.com/wp-content/uploads/2018/02/1300-x-700-23-1-770x540.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="card">
                        <img src="https://gourmetdemexico.com.mx/wp-content/uploads/2018/06/platillo-salmon-Gravlax.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="card">  
                        <img src="https://gastronomiaycia.republica.com/wp-content/photos/postre_turron_chischoco1.jpg" className="fotoPerfil"/>
                    </div>  
                </div>

                <div class="row">   
                    <div class="col-lg-11 marginBot">
                        <button type="button" class="btn btn-outline-primary btn-lg btn-block">Ver mas recetas</button>
                    </div>
                </div>

                {/* carrousel producto  */}
                <div class="row">
                    <div className="col-lg-12 colorR">
                        <h5 class="text-center mb-5">Los mejores productos culinarios</h5> 
                    </div>
                </div>
                {/* carrousel recetas  */}
                <div class="row text-center">   
                    <div class="card ">
                        <img src="https://cdn.shopify.com/s/files/1/0979/9666/products/cuchara-postre-modbaguette_large.jpg?v=1531355541" className="fotoPerfil"/>
                    </div>
                    <div class="card">  
                        <img src="https://admin.capris.cr/media/catalog/product/5/7/574297_1.png" className="fotoPerfil"/>
                    </div>
                    <div class="card">
                        <img src="https://lh3.googleusercontent.com/proxy/8A3-NNtIzeOPlB3RfTDCxBwHOS8u8y-hSmxq9OxC-uH4cYSzwtMGu6q3kiv-IT6Q3vm-q3lItQgrs6Ef_rwbOmn1f_vOiBKTTY3VR9vtlhoJRCqSuXkQOIjXhniPKmSC1s7aV-uXfxF1vPszn3KWpWEiXGBJQD_2bXKqvUwQthnu4QJMr_aLUHlytE37H1YzyzKajlFjZWautzJTnAtb88bq1KUTAXCh-Vuxw1DyG9AwIYEpUEt9KVwXhLOPHZOuBnBkA5itfuQQNtrgHMO5gd4W81OImeB7bnC1mm1yh0im0OC4iLsbETJONB3gBAEkI45qId27rct1eTy3ov9OGmskAooOYPJBqwjsOHwJrGpo67ygWOvQnwamTVHINxNfj-s-qPU5F4onC2G0MNfvjNejvgJlGwyt5bqRuSEJ" className="fotoPerfil"/>
                    </div>
                    <div class="card">
                        <img src="https://www.lecreuset.es/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/l/olla-con-tapa-aluminio-antiadherente-le-creuset.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="card">  
                        <img src="https://megashoptv.vteximg.com.br/arquivos/ids/157458-900-900/Ollas6.jpg?v=636846320784900000" className="fotoPerfil"/>
                    </div>  
                </div>

                <div class="row">   
                    <div className="col-lg-11 marginBot">
                        <button type="button" class="btn btn-outline-primary btn-lg btn-block">Ver mas productos</button>
                    </div>
                </div>

                <div class="row">   
                    <div className="col-lg-3 text-center">
                        <img src={logo}  />

                    </div>
                </div>

            </div> 
            {/* div del cointainer  */}
                
</div>
        
        
        
    );
}

export default Principal;