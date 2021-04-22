import React from 'react';
import styled from 'styled-components';

/*

  We're using two ways to style for this project, styled-components and tailwind css

  Tailwind is kind of like boot strap in that it's a css library that we use by adding class names to our components 
  and they will inherit the style from them. It's responsive, flexible, and has many out of the box options without being too overwhelming. Here's a cheat sheet of classes: https://nerdcave.com/tailwind-cheat-sheet

  Though tailwind can be used for most of our styling, we will need to write more fine-grained CSS from time to time. 
  Styled components are a great way to do this. It's done by wrapping a component in a styled version using their library. 
  Write the component, write a style wrapper, then use it as you would the component.
  https://styled-components.com/docs/basics

*/

// a basic div styled by styled-components
// nested css inside, only applies to this component
const StyledDiv = styled.div`
  background-color: red;

  h3 {
    color: green;
  }

  p {
    color: blue;
  }
`;

// an example wrapper component
// note: className prop is necessary!
const BasicContainer = ({className, children}) => <div className={className}>{children}</div>

// styling our own component works the same way as the div
const StyledBasicContainer = styled(BasicContainer)`
  background-color: blue;

  h3 {
    color: red;
  }

  p {
    color: green;
  }
`;

// basic span wrapped in a component
const Span = ({className, children}) => <span className={className}>{children}</span>;

// same span but with red text
// you could also make red a prop and make the styled span apply css according to the prop 
// more in the getting started link above
const RedSpan = styled(Span)`
  color: red;
`;

// div with width and height, styled below with tailwind
const BigDiv = styled.div`
  width: 200px;
  height: 200px;
`;

const StyleSamples = (props) => {
  return (
    <>
      <StyledDiv>
        <h3>Styled Div</h3>
        <p>using built in styled components div</p>
      </StyledDiv>
      <StyledBasicContainer>
        <h3>Styled BasicContainer</h3>
        <p>using our custom component</p>
      </StyledBasicContainer>
      <Span>normal span</Span>{' '}
      <RedSpan>red span</RedSpan>

      {/* a bunch of random classes to show off tailwind */}
      {/* a two pixel black border, large margin, and medium gray background */}
      <BigDiv className="border-2 border-black m-10 bg-gray-500" />
    </>
  );
};

export default StyleSamples;