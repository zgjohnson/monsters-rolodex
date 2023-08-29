// import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      search: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    const search = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {
        search,
      };
    });
  };

  render() {
    const { monsters, search } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLocaleLowerCase().includes(search)
    );

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters"
          className="search-box"
        />

        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
