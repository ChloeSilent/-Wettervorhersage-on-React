import React from "react"; // обязательно прописать - подключаем React


const Weather = (props) => {
    return (
        <div className="infoWeath">
            {props.city &&
                <div>
                    <p>Ihr Wetter für heute in  {props.city}, {props.country}.</p>
                    <p> Die Temperatur liegt bei {props.temp}</p>
                    <img src={props.icon} alt={props.city} width="50" height="50" />
                    <p>Der Sonnenaufgang ist um {props.sunrise}.</p>
                    <p>Der Sonnenuntergang ist um {props.sunset}.</p>
                </div>
            }
            <p className="Error">{props.error}</p>
        </div>
    )
}

export default Weather

