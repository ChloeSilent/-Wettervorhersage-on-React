import React from "react"; // обязательно прописать - подключаем React


class Info extends React.Component {// обязательно прописать - компонент

    render() { // то, что будет отрисовываться
        return (
            <div>
                <h2>Wettervorhersage</h2>
                <p>Aktuelles Weather und Weathervorhersage!</p>
            </div>
        );
    }
}

export default Info // экспорт класса Info