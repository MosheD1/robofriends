import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { render } from 'react-dom';
import './App.css';
import Scroll from '../components/Scrool'

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(r => {
                return r.json();
            }).then(users => {
                this.setState({ robots: users});
            });
    }

    onSearchChange = (e) => {
        this.setState({ searchfield: e.target.value });
    }

    render() {
        const { robots, searchfield } = this.state;
        const filterRobots = this.state.robots.filter( robot => {
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase())
        });

        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filterRobots} />
                    </Scroll>
                </div>
            );
    }
}

export default App;