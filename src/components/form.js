import React from "react"; // обязательно прописать - подключаем React 


class Form extends React.Component {// обязательно прописать - компонент  

    render() { // то, что будет отрисовываться
        return (
            <form  onSubmit={this.props.weatherMethod}>
                <input type="text" name="city" placeholder="Suche nach Stadt"/>
                <button>Los</button>
            </form>
        );
    }
}
// обращение к this и его свойствам props  и в них именно к weatherMethod
export default Form ;