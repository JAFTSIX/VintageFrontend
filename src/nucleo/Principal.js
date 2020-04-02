import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Menu from './Menu';
import './principal.css';
import '../index.css';
import banner1 from "../image/banner1.png";
import banner2 from "../image/banner2.png";
import banner3 from "../image/banner3.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from 'react-router-dom';
import Footer from './Footer';
import logo from '../image/logo.png'





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
                        <div className="overlay"></div> 
                        <div className="imgCarrousel1"></div> 
                            <img class="d-block w-100" src={banner1} alt="First slide"/>
                                <div class="carousel-caption  d-md-block">
                                    <h1 className="sizeB">COCINA VINTAGE</h1>
                                    <h3>Chef Selenia Mendez</h3>
                                </div>
                    </div>
                    <div class="carousel-item">
                    <div className="overlay"></div>   
                    <div className="imgCarrousel2"></div> 
                    
                    <img class="d-block w-100" src={banner2} alt="Second slide"/>
                        <div class="carousel-caption  d-md-block">
                            <h1 className="sizeB">MEJORES RECETAS</h1>
                        </div>
                    </div>
                    <div class="carousel-item">
                    <div className="overlay"></div>
                    <div className="imgCarrousel3"></div>
                    <img class="d-block w-100" src={banner3} alt="Third slide"/>
                        <div class="carousel-caption d-md-block">
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
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">QUIENES SOMOS</h1>   
                    </div>
                </div>
                <div class="row">   
                    <div class="col-lg-3 col-md-12 d-flex justify-content-center">
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/72604741_3187892487904376_6452110419937984512_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=qlM8uhSv6EYAX_Xf7tE&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=064ddb8f6afda28b9e8f301f2db23e8f&oe=5EA4C342" className="fotoPerfil"/>
                    </div>
                    <div class="col-lg-8 col-md-12 ml-1 mb-10 pb-5 text-justify">
                        <p>Recetas y consejos de cocina</p>
                        <p>El canal Cristiano Enlace TBN ha sido
                            un punto de partida para esta chef donde muy a menudo hace sus presentaciones además transmite sus recetas a través de la radio).
                            De mí, puedo decir que soy una apasionada de la cocina, desde niña me encantaba ver a mi tía preparar dulces típicos de mi país y hacer tamales con mi abuelo, luego tuve la oportunidad de estudiar gastronomía en el Instituto Nacional de Aprendizaje, esto vino a enriquecer mi participación en el Programa Para TI Mujer Internacional, transmitido semanalmente por la cadena Enlace TBN, durante 14 años me propuse llevar muy buen sabor a cada hogar latinoamericano y me complace mucho abrir espacios con nuestras recetas dentro del exquisito y exigente mundo del buen comer, pero no solo eso, me he atrevido a soñar que cada señora que tenga acceso a mis recetas las pueda hacer, son siempre fáciles, prácticas y pensadas para el disfrute de grandes y chicos.


                            Para mi cocinar es crear, es una característica dada por Dios al ser humano, siempre se lo recuerdo a mis mujeres, crear trasciende una simple labor, crear es como amar, como sentir, es un placer que Dios disfrutó a plenitud desde el principio, el creo, y vio que era bueno, sintió regocijo al ver su majestuosa palabra convertida en seres vivientes, la inspiración fue tal, que decidió usar sus manos formando seres humanos con cualidades impensables, a los que decidió llamarles hijos, crear da identidad y descubre habilidades que no se ven en nosotros, pero que siempre han estado allí, estoy convencida que nada es igual cuando nos damos la oportunidad de mostrar lo que somos, somos la creación de Dios, y la creación de Él es la imagen de un Dios invisible, que se vuelve visible, cuando nos permitimos crear.
                            </p>
                    </div>
                </div>
            
                {/* NUESTRA HISTORIA */}
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">NUESTRA HISTORIA</h1>   
                    </div>
                </div>
                <div class="row">   
                    <div class="col-lg-3 col-md-12 d-flex justify-content-center">
                        <img src="https://scontent.fsyq2-1.fna.fbcdn.net/v/t31.0-8/28947429_2203744862985815_1109443335455721953_o.jpg?_nc_cat=100&_nc_sid=74df0b&_nc_ohc=OMrPYfEbGy0AX9cLHng&_nc_ht=scontent.fsyq2-1.fna&oh=13855ac172b4f67f3c5e29fcd81bc9c0&oe=5EA3AFDE" className="fotoPerfil"/>
                    </div>
                    <div class="col-lg-8 col-md-12 ml-1 mb-10 pb-5 text-justify">
                        <p>Para mi cocinar es crear, es una característica dada por Dios al ser humano, siempre se lo recuerdo a quienes siguen mi trabajo, crear trasciende una simple labor, crear es como amar, como sentir, es un placer que Dios disfrutó a plenitud desde el principio, el creo, y vio que era bueno, sintió regocijo al ver su majestuosa palabra convertida en seres vivientes, la inspiración fue tal, que decidió usar sus manos formando seres humanos con cualidades impensables, a los que decidió llamarles hijos, crear da identidad y descubre habilidades que no se ven en nosotros, pero que siempre han estado allí, estoy convencida que nada es igual cuando nos damos la oportunidad de mostrar lo que somos, somos la creación de Dios, y la creación de Él es la imagen de un Dios invisible, que se vuelve visible, cuando nos permitimos crear.</p>
                    </div>
                </div>

                {/* servicios  */}
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">¿QUE OFRECEMOS?</h1> 
                        <h5 class="text-center">Las mejores recetas gourmet</h5> 
                    </div>
                </div>
                {/* carrousel recetas  */}
                <div class="row text-center ">
                <Link to={`/Receta`} className="d-flex flex-row responsiveCarrouselReceta">   
                    <div class="cardP ">
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/86430885_3490555110971444_7543001747703201792_o.jpg?_nc_cat=101&_nc_sid=110474&_nc_ohc=4YJxr_JhAg4AX_S0gS8&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=e707255d52fb60c4ffc569647438c18f&oe=5EA4F3F0" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/86190947_3483495768344045_3401118317472120832_n.jpg?_nc_cat=106&_nc_sid=e007fa&_nc_ohc=pTadG410YdoAX_Ru-jt&_nc_ht=scontent.fsyq3-1.fna&oh=38709da0354b1bad5ae88e63d1e91e2b&oe=5EA68BEA" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/77319628_3297281733632117_2827781213278699520_o.jpg?_nc_cat=111&_nc_sid=2d5d41&_nc_ohc=rqxenLJPxzEAX8fLPtl&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=b25be86370a9a36bea33581f24b76e03&oe=5EA6EFE8" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/72652584_3245406335486324_8756627306459430912_o.jpg?_nc_cat=108&_nc_sid=110474&_nc_ohc=Z4hMWyZKfV8AX8DctGp&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=226c89c846dca006958627ac05a88f70&oe=5EA437F4" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/86290375_3483495005010788_608858081459175424_n.jpg?_nc_cat=105&_nc_sid=e007fa&_nc_ohc=RWJjTZpC_P0AX-13GeQ&_nc_ht=scontent.fsyq3-1.fna&oh=49222f5638cac82945d1644a6d3e7c97&oe=5EA57BF8" className="fotoPerfil"/>
                    </div>  
                </Link>
                </div>

                <div class="row">   
                    <div class="col-lg-11 marginBot">
                        <Link to={`/Receta`} className="textDecorationone">
                            <button type="button" class="btn btn-outline-primary btn-lg btn-block">Ver mas recetas</button>
                        </Link>
                    </div>
                    
                </div>

                {/* carrousel producto  */}
                <div class="row">
                    <div class="col-lg-12 colorR">
                        <h5 class="text-center mb-5">Los mejores productos culinarios</h5> 
                    </div>
                </div>
                {/* carrousel recetas  */}
                <div class="row text-center"> 
                <Link to={`/Producto`} className="d-flex flex-row responsiveCarrouselReceta">    
                    <div class="cardP ">
                        <img src="https://cdn.shopify.com/s/files/1/0979/9666/products/cuchara-postre-modbaguette_large.jpg?v=1531355541" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://admin.capris.cr/media/catalog/product/5/7/574297_1.png" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://ferreteriavidri.com/images/items/large/76139.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://www.lecreuset.es/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/o/l/olla-con-tapa-aluminio-antiadherente-le-creuset.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://megashoptv.vteximg.com.br/arquivos/ids/157458-900-900/Ollas6.jpg?v=636846320784900000" className="fotoPerfil"/>
                    </div>  
                </Link>
                </div>

                <div class="row">   
                    <div class="col-lg-11 marginBot">
                    <Link to={`/Producto`} className="textDecorationone">
                        <button type="button" class="btn btn-outline-primary btn-lg btn-block">
                            Ver mas productos   
                        </button>
                    </Link> 
                    </div>  
                </div>


            </div> 
            {/* div del cointainer  */}

            <Footer />
                
</div>       
    );
}

export default Principal;