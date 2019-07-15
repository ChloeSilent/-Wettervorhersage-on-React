import React from "react"; // подключаем React
import Info from "./components/info"; // покдлючаем компонент info
import Form from "./components/form";
import Weather from "./components/weather";

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
    if (city) {

      const api_url = await
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();
      console.log(data);
      const temp = Math.floor(data.main.temp);

      const sunrise = data.sys.sunrise;
      let sunriseDate = new Date();
      sunriseDate.setTime(sunrise);
      let sunrise_time = sunriseDate.getHours() + ":" + sunriseDate.getMinutes() + ":" + sunriseDate.getSeconds();


      const sunset = data.sys.sunset;
      let sunsetDate = new Date();
      sunsetDate.setTime(sunset);
      let sunset_time = sunsetDate.getHours() + ":" + sunsetDate.getMinutes() + ":" + sunsetDate.getSeconds();
      let icon = `https://openweathermap.org/img/wn/${data.weather["0"].icon}@2x.png`
      this.setState({
        temp: temp,
        city: data.name,
        country: data.sys.country,
        sunrise: sunrise_time,
        sunset: sunset_time,
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

  render() { //отрисовка 
    return ( // все что в return будет отрисовано, но оно должно быть 1м элементом(обертка, в которой все лежит)
      <div>
        <Info />
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
    )
  }
}

// передача свойств происходит в return в теге компонента, этому свойству нужно дать имя и аргумент,
// например weatherMethod - это переменная, которую мы передадим в компонет, а переменная для нее это this.gettingWeather, те у этого компонента метод gettingWeather
// точно также мы передали данные о погоде в компонент weather
//подключаем наши компонеты, включая их в return() и указываем их как теги и именно там подключится наш компонент Info
export default App // экспорт класса App, который указан выше, иначе импорт App в index.js не сработаеты