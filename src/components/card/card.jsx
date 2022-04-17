import styled from 'styled-components';

const StyledCard = styled('div')`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
`;

const PosterContainer = styled('div')`
  background-color: #eeeeee;
`;

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: auto;
`;

const Title = styled('h3')`
  margin: 0;
  font-size: 20px;
`

function Card({movie}) {
  return (
        <StyledCard>
          <PosterContainer>
            <img src={movie.Poster} alt={movie.Title} width={'100%'}/>
          </PosterContainer>
          <Content>
            <Title className="card-title">{movie.Title}</Title>
          </Content>
        </StyledCard>        
  );
}

export default Card;
