import React from 'react';
import Card from './Card';

const CardList = ({robots}) => {
    return (
        robots.map((user, id) => {
            return <Card key={id} id={id} name={user.name} email={user.email} />;
        })
    );
}

export default CardList;