import React from "react"; // подключаем React
import Info from "./components/info"; // покдлючаем компонент info
import Form from "./components/form";
import Weather from "./components/weather";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';



const API_KEY = "8f01406605b9e63fee0a5e9653c9e938";
// это главный  App.js, здесь подключаются и объединяются все компоненты
class App extends React.Component {// создание компонента идет через  class [клас-компонент] extends React.Component{// наследует все от react component
    // создаем объект state
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }
    gettingWeather = async (evt) => {

        evt.preventDefault();
        const city = evt.target.elements.city.value;
        const api_url = await
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`);
        const data = await api_url.json();
        console.log(data);
        try {
            if (city) {


                const temp = Math.floor(data.main.temp);

                const setTimeSun = function (time) {
                    let sunDate = new Date();
                    sunDate.setTime(time * 1000);

                    let timeToHuman = (sunDate.getHours() < 10 ? '0' : '') + sunDate.getHours() + ":"
                        + (sunDate.getMinutes() < 10 ? '0' : '') + sunDate.getMinutes() + ":"
                        + (sunDate.getSeconds() < 10 ? '0' : '') + sunDate.getMinutes();
                    return timeToHuman;
                }

                let icon = `https://openweathermap.org/img/wn/${data.weather["0"].icon}@2x.png`
                this.setState({
                    temp: temp,
                    city: data.name,
                    country: data.sys.country,
                    sunrise: setTimeSun(data.sys.sunrise),
                    sunset: setTimeSun(data.sys.sunset),
                    icon: icon,
                    error: undefined
                });

            } else {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    icon: undefined,
                    error: "Geben Sie bitte die Stadt ein!"
                });
            }
        }
        catch (e) {
            if (data.cod === '404') {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    sunrise: undefined,
                    sunset: undefined,
                    icon: undefined,
                    error: "die Stadt ist nicht erkannt!"
                });
            }
        }

    }

    render() { //отрисовка
        return ( // все что в return будет отрисовано, но оно должно быть 1м элементом(обертка, в которой все лежит)
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4 info">
                                <Info />
                            </div>
                            <div className="col-sm-8 form">
                                <Form weatherMethod={this.gettingWeather} />
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    sunrise={this.state.sunrise}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                    icon={this.state.icon}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// передача свойств происходит в return в теге компонента, этому свойству нужно дать имя и аргумент,
// например weatherMethod - это переменная, которую мы передадим в компонет, а переменная для нее это this.gettingWeather, те у этого компонента метод gettingWeather
// точно также мы передали данные о погоде в компонент weather
//подключаем наши компонеты, включая их в return() и указываем их как теги и именно там подключится наш компонент Info
export default App // экспорт класса App, который указан выше, иначе импорт App в index.js не сработаеты