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
                </div>
            </div>

            <div class="container">
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">QUIENES SOMOS</h1>   
                    </div>
                </div>
                <div class="row">   
                    <div class="col-lg-3 col-md-12 d-flex justify-content-center">
                        <img src="https://i.imgur.com/GJTyd2v.jpg" className="fotoPerfil"/>
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
                        <img src="https://i.imgur.com/ctis5Af.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="col-lg-8 col-md-12 ml-1 mb-10 pb-5 text-justify">
                        <p>Para mi cocinar es crear, es una característica dada por Dios al ser humano, siempre se lo recuerdo a quienes siguen mi trabajo, crear trasciende una simple labor, crear es como amar, como sentir, es un placer que Dios disfrutó a plenitud desde el principio, el creo, y vio que era bueno, sintió regocijo al ver su majestuosa palabra convertida en seres vivientes, la inspiración fue tal, que decidió usar sus manos formando seres humanos con cualidades impensables, a los que decidió llamarles hijos, crear da identidad y descubre habilidades que no se ven en nosotros, pero que siempre han estado allí, estoy convencida que nada es igual cuando nos damos la oportunidad de mostrar lo que somos, somos la creación de Dios, y la creación de Él es la imagen de un Dios invisible, que se vuelve visible, cuando nos permitimos crear.</p>
                    </div>
                </div>

                {/* servicios  */}
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">¿QUE OFRECEMOS?</h1> 
                        <h5 class="text-center">Deliciosas recetas</h5> 
                    </div>
                </div>
                {/* carrousel recetas  */}
                <div class="row text-center ">
                <Link to={`/Receta`} className="d-flex flex-row responsiveCarrouselReceta">   
                    <div class="cardP ">
                        <img src="https://i.imgur.com/xkz93xf.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP"> 
                        <img src="https://i.imgur.com/jQ93wPR.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://i.imgur.com/UoQF1bE.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://i.imgur.com/kNMf9mk.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://i.imgur.com/05G0X1X.jpg" className="fotoPerfil"/>
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
                {/* <div class="row">
                    <div class="col-lg-12 colorR">
                        <h5 class="text-center mb-5">Los mejores productos culinarios</h5> 
                    </div>
                </div> */}
                {/* carrousel recetas  */}
                {/* <div class="row text-center"> 
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
                </div> */}


            </div> 
            {/* div del cointainer  */}

            <Footer />
                
</div>       
    );
}

export default Principal;