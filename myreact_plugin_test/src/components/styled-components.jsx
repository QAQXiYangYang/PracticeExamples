import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: palevioletred;
  font-size: 1.5em;
  text-align: center;
`;
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
const Button = styled.button`
  /* Adapt the colours based on primary prop */
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;


class App extends Component {
  render() {
    return (
      <div>
      <Wrapper>
         <Title>
        Hello Mr.Yang, 
        this is  first styled component!
        </Title>

        <hr/>

        <Input placeholder="@mxstbr" type="text" />
        <Input value="@geelen" type="text" />

        <hr/>
        <Button>Normal</Button>
        <Button primary>Primary</Button>
        <hr/>

      </Wrapper>
      </div>
    );
  }
}

export default App;
