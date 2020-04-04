import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import { render } from 'react-dom';
import './App.css';
import Scroll from '../components/Scrool'
import {connect} from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending : state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatcherToProps = (dispatcher) => {
    return {
        onSearchChange : (e) => dispatcher(setSearchField(e.target.value)),
        OnRequestRobots: () => dispatcher(requestRobots())
    }
}

class App extends Component {

    componentDidMount() {
        console.log(this.props);
        this.props.OnRequestRobots();
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props;
        const filterRobots = robots.filter( robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase())
        });

        return isPending ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <CardList robots={filterRobots} />
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);