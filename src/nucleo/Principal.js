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
import { Link } from 'react-router-dom';





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
                                    <h3>Chef Selenia Mendez</h3>
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
                <div class="row">
                    <div class="titlo col-lg-12 colorR">
                        <h1 class="text-center">QUIENES SOMOS</h1>   
                    </div>
                </div>
                <div class="row">   
                    <div class="col-lg-3">
                        <img src="https://scontent.fsyq3-1.fna.fbcdn.net/v/t1.0-9/s960x960/72604741_3187892487904376_6452110419937984512_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=qlM8uhSv6EYAX_Xf7tE&_nc_ht=scontent.fsyq3-1.fna&_nc_tp=7&oh=064ddb8f6afda28b9e8f301f2db23e8f&oe=5EA4C342" className="fotoPerfil"/>
                    </div>
                    <div class="col-lg-8 ml-1 mb-10 pb-5">
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
                    <div class="col-lg-3">
                        <img src="https://scontent.fsyq2-1.fna.fbcdn.net/v/t31.0-8/28947429_2203744862985815_1109443335455721953_o.jpg?_nc_cat=100&_nc_sid=74df0b&_nc_ohc=OMrPYfEbGy0AX9cLHng&_nc_ht=scontent.fsyq2-1.fna&oh=13855ac172b4f67f3c5e29fcd81bc9c0&oe=5EA3AFDE" className="fotoPerfil"/>
                    </div>
                    <div class="col-lg-8 ml-1 mb-10 pb-5">
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
                <div class="row text-center">
                <Link to={`/Receta`} className="d-flex flex-row">   
                    <div class="cardP ">
                        <img src="https://okdiario.com/img/recetas/2016/12/29/desayunos-alrededor-del-mundo-2.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTj4uFKMmJ1sec1f4k1p68ZZLlfSKrupev4BFK6MqKVoa-wB8Qy" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://vamosacomerrico.com/wp-content/uploads/2018/02/1300-x-700-23-1-770x540.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">
                        <img src="https://gourmetdemexico.com.mx/wp-content/uploads/2018/06/platillo-salmon-Gravlax.jpg" className="fotoPerfil"/>
                    </div>
                    <div class="cardP">  
                        <img src="https://gastronomiaycia.republica.com/wp-content/photos/postre_turron_chischoco1.jpg" className="fotoPerfil"/>
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
                <Link to={`/Producto`} className="d-flex flex-row">    
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

            {/* footer  */}
            <div class="bg-dark">
            <div class="container">
                <div class="row paddingT5">       
                    <div class="col-lg-6 text-center">
                        <h4 class="font-weight-bold text-light mb-5">Redes Sociales</h4>
                        <img src="https://i.pinimg.com/originals/41/28/2b/41282b58cf85ddaf5d28df96ed91de98.png"
                            height="100" width="74" class="paddingB5"/>
                        <img src="https://www.pngkey.com/png/full/283-2831746_insta-icon-instagram.png"
                            height="86" width="59" class="paddingB5"/>
                        <img src="https://i.pinimg.com/originals/19/7b/36/197b365922d1ea3aa1a932ff9bbda4a6.png"
                            height="93" width="87" class="paddingB5"/>
                    </div>
                    <div class="col-lg-6 text-center">  
                        <h4 class="font-weight-bold text-light mb-5">Contactenos</h4>
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
                
</div>
        
        
        
    );
}

export default Principal;